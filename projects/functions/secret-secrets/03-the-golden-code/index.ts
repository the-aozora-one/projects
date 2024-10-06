export type Settings = {
    attempts: number,
    makeGuess: (text: string, attempt: number) => string,
    validateGuess: (guess: string) => boolean,
}
export function createCodeCracker(settings: Settings) {
    return (text: string) => {
        for (let i = 0; i < settings.attempts; i++) {
            const guess: string = settings.makeGuess(text, i)
            if (settings.validateGuess(guess)) {
                return guess
            }
        }

        return undefined
    }
}