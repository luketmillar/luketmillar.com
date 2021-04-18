export const duplicate = <T>(x: (i: number) => T, n: number) => Array.from(new Array(n), (_, i) => x(i))

export const replaceCharacter = (line: string, index: number, character: string) => {
    return line.slice(0, index) + character + line.slice(index + 1)
}