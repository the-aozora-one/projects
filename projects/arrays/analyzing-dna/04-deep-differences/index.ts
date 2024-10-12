export function deepDifferences(
    a: string[][],
    b: string[][],
) {
    const results = []

    for (let i = 0; i < a.length; i += 1) {
        if (a[i].length !== b[i].length) {
            results.push(undefined)
            continue
        }

        const sequence = []
        for (let j = 0; j < a[i].length; j += 1) {
            if (a[i][j] !== b[i][j]) {
                sequence.push(undefined)
            } else {
                sequence.push(a[i][j])
            }
        }
        results.push(sequence)
    }

    return results
}