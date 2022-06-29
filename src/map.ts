//  Library
import { collect } from './helpers'

/** Extends the Map class with useful functions */
export class AwesomeMap<K, V> extends Map<K, V> {

    /**
     * Constructs a new AwesomeMap. Can optionally be instantiated using
     * an entries array. (like from Object.entries(someObject))
     * @param entries (Optional) Entries to instantiate the map from
     */
    constructor(entries?: [K, V][]) {
        super()
        if (entries && entries.length > 0) {
            this.fromEntries(entries, true)
        }
    }

    /** Get map entries as an array */
    get entriesArray(): [K, V][] {
        return collect(this.entries())
    }

    /** Get map keys as an array */
    get keysArray(): K[] {
        return collect(this.keys())
    }

    /** Get map values as an array */
    get valuesArray(): V[] {
        return collect(this.values())
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

    /** Get the entry at the given position */
    at(position: number): [K, V] {
        if (position < 0) { position = this.size + (position % this.size) }
        else if (position > this.size) { position = (position % this.size) - 1 }
        return this.entriesArray[position]
    }

    /** Returns the entry at the nth position */
    nth(position: number): [K, V] {
        return this.at(position + 1)
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
     * Map for AwesomeMaps
     * @param callback Callback function to map values
     * @returns A new AwesomeMap with the mapped values
     */
    map<T>(callback: (value: V, key: K, map: this) => T): AwesomeMap<K, T> {
        const newMap = new AwesomeMap<K, T>()
        for (const [key, value] of this.entries()) {
            newMap.set(key, callback(value, key, this))
        }
        return newMap
    }

    /**
     * Transforms one AwesomeMap to another
     * @param callback Callback function to transform keys and values. Must return entries as [key, value]
     * @returns A new transformed AwesomeMap
     */
    transform<S, T>(callback: (key: K, value: V, map: this) => [S, T]): AwesomeMap<S, T> {
        const newMap = new AwesomeMap<S, T>()
        for (const [key, value] of this.entries()) {
            const [newKey, newValue] = callback(key, value, this)
            newMap.set(newKey, newValue)
        }
        return newMap
    }

    /**
     * Returns a new AwesomeMap with its keys and values swapped
     * @returns A new AwesomeMap with its keys and values swapped
     */
    mirror(): AwesomeMap<V, K> {
        const mirroredMap = new AwesomeMap<V, K>()
        for (const [key, value] of this.entries()) {
            mirroredMap.set(value, key)
        }
        return mirroredMap
    }

    /**
     * Reduce for maps
     * @param callback Callback function to reduce the map
     * @param initializer Initial value
     * @returns Reduced value
     */
    reduce<T = V>(callback: (accumulator: T, current: V, key: K, map: this) => T, initializer?: T) {
        const iterator = this.entries()     //  Entries: [key, value] --- values are at index 1
        let result = initializer ?? iterator.next().value[1]    //  Use initializer if available, otherwise extract the value from the first entry
        //  Iterate over the rest of the entries executing the callback and accumulating the result
        for (const [key, value] of iterator) {
            result = callback(result, value, key, this)
        }
        return result
    }

    /**
     * Find for maps
     * @param callback Callback function to describe how to find the entry. Returns true if found
     * @returns The found entry
     */
    find(callback: (value: V, key: K, map: this) => boolean): [K, V] | undefined {
        for (const [key, value] of this.entries()) {
            if (callback(value, key, this)) {
                return [key, value]
            }
        }
        return undefined
    }

    /**
     * Returns true if the callback is valid for every entry in the map
     * @param callback Callback function to check condition
     * @returns Boolean indicating that the callback returned true for every entry
     */
    every(callback: (value: V, key: K, map: this) => boolean): boolean {
        let result = true
        for (const [key, value] of this.entries()) {
            if (!callback(value, key, this)) { return false }
        }
        return result
    }

    /**
     * Returns true if the callback is valid for at least some entry in the map
     * @param callback Callback function to check condition
     * @returns Boolean indicating that the callback returned true for at least one entry
     */
    some(callback: (value: V, key: K, map: this) => boolean): boolean {
        let result = false
        for (const [key, value] of this.entries()) {
            if (callback(value, key, this)) { return true }
        }
        return false
    }

    /** Converts the AwesomeMap into a regular JavaScript Object */
    toObject(): Record<string, V> {
        return Object.fromEntries(this.entries())
    }

}
