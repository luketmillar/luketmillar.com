export const getLayout = (message: string, width: number, height: number): Record<string, string> => {
    const layout: Record<string, string> = {}
    const lines = splitIntoLines(message, width, height)
    const rowStart = Math.floor((height - lines.length) / 2)
    const characters = lines.map((line, i) => {
        const row = rowStart + i
        const columnStart = Math.floor((width - line.length) / 2)
        return line.split('').map((character, i) => {
            return { character, row, column: columnStart + i }
        })
    }).reduce((result, line) => ([...result, ...line]), [])
    characters.forEach(({ character, row, column }) => {
        layout[`${row}-${column}`] = character
    })
    return layout
}

const splitIntoLines = (message: string, width: number, height: number) => {
    let lines = [message]
    let lineCount = 1
    while (lines.some(line => line.length > width)) {
        lineCount++
        const splitSpaces = findSplitSpaces(message, lineCount)
        const extraLines = splitSpaces.map((splitSpaceIndex, i) => {
            return message.slice(splitSpaceIndex + 1, splitSpaces[i + 1]).trim()
        })
        lines = [message.slice(0, splitSpaces[0]), ...extraLines]
    }
    return lines

}

const findSplitSpaces = (message: string, lineCount: number) => {
    const evenSplits = []
    const distance = Math.floor(message.length / lineCount)
    for (let i = 1; i < lineCount; i++) {
        evenSplits.push(i * distance)
    }
    return evenSplits.map(index => findClosestSpace(message, index))
}

const findClosestSpace = (message: string, index: number, distance: number = 0): number => {
    const character = message[index]
    if (character === ' ') {
        return index
    }

    const leftIndex = index - distance
    const rightIndex = index + distance
    if (leftIndex < 0 && rightIndex >= message.length) {
        return -1
    }

    const leftCharacter = message[leftIndex]
    if (leftCharacter === ' ') {
        return leftIndex
    }

    const rightCharacter = message[rightIndex]
    if (rightCharacter === ' ') {
        return rightIndex
    }
    return findClosestSpace(message, index, distance + 1)
}

