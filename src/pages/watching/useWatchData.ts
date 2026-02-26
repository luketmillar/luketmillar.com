import { useEffect, useState } from 'react'
import { supabase } from 'lib/supabase'
import type { Entry, FlexDate, EntryType, CurrentlyWatchingItem, NeedToWatchItem } from './types'

interface WatchHistoryRow {
    id: number
    title: string
    detail: string | null
    date_year: number
    date_month: number | null
    date_day: number | null
    type: string
    stars: number | null
    watched_with: string[] | null
}

interface CurrentlyWatchingRow {
    id: number
    title: string
    detail: string | null
    image: string
    with: string | null
    sort_order: number
}

interface NeedToWatchRow {
    id: number
    title: string
    detail: string | null
    image: string
    sort_order: number
}

const toFlexDate = (row: WatchHistoryRow): FlexDate => {
    if (row.date_day != null && row.date_month != null) {
        return { year: row.date_year, month: row.date_month, day: row.date_day }
    }
    if (row.date_month != null) {
        return { year: row.date_year, month: row.date_month }
    }
    return { year: row.date_year }
}

const toEntry = (row: WatchHistoryRow): Entry => ({
    title: row.title,
    ...(row.detail ? { detail: row.detail } : {}),
    date: toFlexDate(row),
    type: row.type as EntryType,
    ...(row.stars ? { stars: row.stars } : {}),
    ...(row.watched_with?.length ? { watchedWith: row.watched_with } : {}),
})

const toCurrentlyWatching = (row: CurrentlyWatchingRow): CurrentlyWatchingItem => ({
    title: row.title,
    ...(row.detail ? { detail: row.detail } : {}),
    image: row.image,
    ...(row.with ? { with: row.with } : {}),
})

const toNeedToWatch = (row: NeedToWatchRow): NeedToWatchItem => ({
    title: row.title,
    ...(row.detail ? { detail: row.detail } : {}),
    image: row.image,
})

interface WatchData {
    entries: Entry[]
    currentlyWatching: CurrentlyWatchingItem[]
    needToWatch: NeedToWatchItem[]
    loading: boolean
}

export const useWatchData = (): WatchData => {
    const [entries, setEntries] = useState<Entry[]>([])
    const [currentlyWatching, setCurrentlyWatching] = useState<CurrentlyWatchingItem[]>([])
    const [needToWatch, setNeedToWatch] = useState<NeedToWatchItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAll = async () => {
            const [historyRes, currentRes, needRes] = await Promise.all([
                supabase
                    .from('watch_history')
                    .select('*')
                    .order('date_year', { ascending: false })
                    .order('date_month', { ascending: false, nullsFirst: false })
                    .order('date_day', { ascending: false, nullsFirst: false })
                    .order('id', { ascending: false }),
                supabase
                    .from('currently_watching')
                    .select('*')
                    .order('sort_order', { ascending: true }),
                supabase
                    .from('need_to_watch')
                    .select('*')
                    .order('sort_order', { ascending: true }),
            ])

            if (historyRes.data) setEntries(historyRes.data.map(toEntry))
            if (currentRes.data) setCurrentlyWatching(currentRes.data.map(toCurrentlyWatching))
            if (needRes.data) setNeedToWatch(needRes.data.map(toNeedToWatch))
            setLoading(false)
        }

        fetchAll()

        const channel = supabase
            .channel('watch-changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'watch_history' }, () => {
                supabase
                    .from('watch_history')
                    .select('*')
                    .order('date_year', { ascending: false })
                    .order('date_month', { ascending: false, nullsFirst: false })
                    .order('date_day', { ascending: false, nullsFirst: false })
                    .order('id', { ascending: false })
                    .then(({ data }) => { if (data) setEntries(data.map(toEntry)) })
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'currently_watching' }, () => {
                supabase
                    .from('currently_watching')
                    .select('*')
                    .order('sort_order', { ascending: true })
                    .then(({ data }) => { if (data) setCurrentlyWatching(data.map(toCurrentlyWatching)) })
            })
            .on('postgres_changes', { event: '*', schema: 'public', table: 'need_to_watch' }, () => {
                supabase
                    .from('need_to_watch')
                    .select('*')
                    .order('sort_order', { ascending: true })
                    .then(({ data }) => { if (data) setNeedToWatch(data.map(toNeedToWatch)) })
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return { entries, currentlyWatching, needToWatch, loading }
}
