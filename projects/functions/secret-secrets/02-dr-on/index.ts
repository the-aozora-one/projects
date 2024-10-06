export type Cipher = (character: string) => string

export function createAdvancedCipher(onVowel: Cipher, onConsonant: Cipher, onPunctuation: Cipher) {
    return (text: string) => {
        const vowelPattern = /[aeiou]/i
        const consonantPattern = /[bcdfghjklmnpqrstvwxyz]/i
        let result = ``
        for (const character of text) {
            if (vowelPattern.test(character)) {
                result = `${result}${onVowel(character)}`
            } else if (consonantPattern.test(character)) {
                result = `${result}${onConsonant(character)}`
            } else {
                result = `${result}${onPunctuation(character)}`
            }
        }

        return result
    }
}