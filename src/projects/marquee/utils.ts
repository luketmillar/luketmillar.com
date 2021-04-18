export const duplicate = <T>(x: (i: number) => T, n: number) => Array.from(new Array(n), (_, i) => x(i))
