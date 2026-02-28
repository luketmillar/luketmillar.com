export type FlexDate =
    | { year: number; month: number; day: number }
    | { year: number; month: number }
    | { year: number }

export type EntryType = 'movie' | 'tv' | 'sports' | 'other'

export interface Entry {
    title: string
    detail?: string
    date: FlexDate
    type: EntryType
    stars?: number
}

export interface CurrentlyWatchingItem {
    title: string
    detail?: string
    image: string
}

export interface NeedToWatchItem {
    title: string
    detail?: string
    image: string
}
