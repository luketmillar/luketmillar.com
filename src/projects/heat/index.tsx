import React from 'react'
import { years } from './data'


const colors: Record<number, string> = {
    0: '#1826BC',
    5: '#2044C6',
    10: '#265DCE',
    15: '#2C75D5',
    20: "#3491DF",
    25: '#47A5D3',
    30: '#73B1A1',
    35: '#9ABC75',
    40: '#C8C840',
    45: '#F0D314',
    50: '#F3C111',
    55: '#F6B210',
    60: '#F9A30E',
    65: '#FC920C',
    70: '#F97F0B',
    75: '#E7630C',
    80: '#D5490E',
    85: '#C32A0F',
    90: '#B21111',
    95: '#9F0E0E',
    100: '#8E0D0D',
    105: '#7B0B0B',
    110: '#690909',
    115: '#560707',
    120: '#460505'
}

// const Heat2 = () => {
//     const [year, setYear] = React.useState(1980)
//     const { temps } = cleanData(years[year - 1980])
//     const gradient = getGradient(temps)
//     React.useEffect(() => {
//         const handleMouse = (e: MouseEvent) => {
//             const x = e.clientX
//             const width = window.innerWidth
//             const percent = x / width
//             const year = Math.floor(years.length * percent) + 1980
//             console.log(x, width, percent, year)
//             setYear(year)
//         }
//         window.addEventListener('mousemove', handleMouse)
//         return () => window.removeEventListener('mousemove', handleMouse)
//     }, [])
//     return <div style={{ width: '100vw', height: '100vh', transition: 'background 100ms ease-in-out', background: gradient, position: 'relative' }}>
//         <h1 style={{ position: 'absolute', fontSize: 100, color: '#000', right: 50, bottom: 30 }}>{year}</h1>
//     </div>
// }

const Heat = () => {
    const results = years.map(year => cleanData(year))

    console.log(results.map(v => v.temps.length).join('\n'))

    return <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
        {results.map(v => v.temps).map(temps => <div style={{ width: '5vw', height: '100vh', background: getGradient(temps) }} />)}
    </div>
}

const getColor = (temp: number) => {
    const roundedTemp = getNearestTempBucket(temp)
    if (roundedTemp === undefined) {
        return undefined
    }
    return colors[roundedTemp - 10]
}

const getNearestTempBucket = (temp: number) => {
    return Math.round(temp * .2) / .2
}

const cleanData = (data: string) => {
    const datesProcessed: Record<string, boolean> = {}
    const temps = data.split(';').map((data, i) => {
        // eslint-disable-next-line
        const [date, min, max] = data.split(',')
        if (datesProcessed[date]) {
            return undefined
        }
        if (max === '') {
            return undefined
        }
        datesProcessed[date] = true
        return getNumber(max)
    }).filter(x => x !== undefined) as number[]

    const groupedTemps = []
    for (let i = 0; i < temps.length; i += 7) {
        const bucket = temps.slice(i, i + 7)
        console.log(temps, bucket)
        const total = bucket.reduce((sum, v) => sum + v, 0)
        const avg = total / bucket.length
        groupedTemps.push(avg)
    }

    console.log(groupedTemps)

    return { temps: groupedTemps }
}

const getGradient = (temps: number[]) => {
    const colors = temps.map(temp => getColor(temp)).filter(x => x !== undefined) as string[]
    const stops = colors.map((color, i, colors) => {
        return `${color} ${100 * i / colors.length}%`
    }, '')
    return `linear-gradient(180deg, ${stops.join(', ')})`
}

const getNumber = (temp: string) => {
    try {
        return parseInt(temp, 10)
    } catch (e) {
        return undefined
    }
}

export default Heat