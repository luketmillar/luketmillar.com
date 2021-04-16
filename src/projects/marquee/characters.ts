export const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890=-+_|.,;:!?\'"@#$%^&*()~ '
export const characterList = characters.split('')

export const getRandomCharacter = () => {
    const count = characterList.length
    const index = Math.floor(Math.random() * count)
    return characterList[index]
}

export const getIndex = (character: string) => characterList.indexOf(character)
