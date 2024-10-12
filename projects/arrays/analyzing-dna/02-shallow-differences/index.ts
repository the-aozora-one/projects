export function shallowDifferences(
    a: string[],
    b: string[]
) {
    if (a.length !== b.length) {
        return undefined
    }

    const differences = []
    for (let i = 0; i < a.length; i += 1) {
        differences.push(a[i] === b[i]
                ? a[i]
                : undefined
        )
    }

    return differences
}