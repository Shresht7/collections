//  TODO: Improve DocStrings
export class AwesomeMap<K, V> extends Map<K, V> {

    constructor() {
        super()
    }

    /**
     * Filter for maps
     * @param callback Callback function to determine which entries are filtered
     */
    filter(callback: (value: V, key: K, map: this) => boolean) {
        const filtered = new AwesomeMap<K, V>()
        for (const [k, v] of this.entries()) {
            if (callback(v, k, this)) {
                filtered.set(k, v)
            }
        }
        return filtered
    }

    /**
     * Reduce for maps
     * @param callback Callback function to reduce the map
     * @param initializer Initial value
     * @returns Reduced value
     */
    reduce<T>(callback: (accumulator: T, current: V, key: K, map: this) => T, initializer: T) {
        let result = initializer
        for (const [k, v] of this.entries()) {
            result = callback(result, v, k, this)
        }
        return result
    }

}
