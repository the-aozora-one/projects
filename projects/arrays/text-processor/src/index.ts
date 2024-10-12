export type AlignmentOptions = {
    align?: 'left' | 'middle' | 'right',
    width: number,
}
export function alignTexts(texts: string[], options: AlignmentOptions): string[][] {
    // Create empty results
    const results: string[][] = []

    // Iterate through set of text
    for (const text of texts) {
        const lines: string[] = []

        // Split the text into separate words
        const words: string[] = text.split(' ')

        // Presume that the first word has to fit on the first line
        let line = ``
        for (let i = 0; i < words.length; i += 1) {
            if (line.length === 0) {
                line = words[i]
            } else if (line.length + 1 + words[i].length <= options.width) {
                // There is room for the word on the line
                line += ` ${words[i]}`
            } else {
                // There is no room for the word on this line.
                // Apply padding and reset
                lines.push(getPaddedLine(line, options))
                line = `${words[i]}`
            }
            
            if (i === words.length - 1) {
                // We need to add whitespace padding
                lines.push(getPaddedLine(line, options))
                line = ``
            }
        }

        results.push(lines)
    }

    return results
}

function getPaddedLine(line: string, options: AlignmentOptions) {
    let leftPadding = ''
    let rightPadding = ''
    const neededWhitespaceCount = options.width - line.length
    if (neededWhitespaceCount > 0) {
        switch (options.align) {
            case 'right':
                leftPadding = ' '.repeat(neededWhitespaceCount)
                break
            case 'middle':
                leftPadding = ' '.repeat(Math.floor((neededWhitespaceCount) / 2))
                rightPadding = ' '.repeat(Math.ceil((neededWhitespaceCount) / 2))
                break
            case 'left':
            default:
                rightPadding = ' '.repeat(neededWhitespaceCount)
                break
        }
    }
    return `${leftPadding}${line}${rightPadding}`
}