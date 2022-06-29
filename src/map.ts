//  Library
import { collect } from './helpers'

//  TODO: Improve DocStrings
export class AwesomeMap<K, V> extends Map<K, V> {

    constructor() {
        super()
    }

    /**
     * Instantiate the map using the given entries
     * @param entries Entries (in [key, value] format) to initialize map from
     * @param clearExisting Boolean flag to indicate that the map should clear any existing entries
     */
    fromEntries(entries: [K, V][], clearExisting: boolean = true) {
        if (clearExisting) { this.clear() }
        for (const [key, value] of entries) {
            this.set(key, value)
        }
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

    get entriesArray(): [K, V][] {
        return collect(this.entries())
    }

    get keysArray(): K[] {
        return collect(this.keys())
    }

    get valuesArray(): V[] {
        return collect(this.values())
    }

}
