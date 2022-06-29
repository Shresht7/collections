// ----------------
// HELPER FUNCTIONS
// ----------------

/**
 * Collects all entries from an IterableIterator and returns them as an array
 * @param iterable IterableIterator
 * @returns Array of entries from the IterableIterator
 */
export function collect<T>(iterable: IterableIterator<T>): T[] {
    const arr: T[] = []
    for (const element of iterable) {
        arr.push(element)
    }
    return arr
}
