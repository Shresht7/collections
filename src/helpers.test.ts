//  Library
import { collect } from './helpers'
import { describe, test, expect } from 'vitest'

describe('collect', () => {

    //  Generate sample collections
    const arr = ['one', 'two', 'three']
    const map = new Map()
    map.set('one', 1)
    map.set('two', 2)
    map.set('three', 3)

    test('should collect array entries', () => {
        expect(collect(arr.values())).toStrictEqual(['one', 'two', 'three'])
        expect(collect(arr.keys())).toStrictEqual([0, 1, 2])
        expect(collect(arr.entries())).toStrictEqual([[0, 'one'], [1, 'two'], [2, 'three']])
    })

    // * NOTE: Objects.keys(), Object.values() and Object.entries() return an array instead of IterableIterator<T>
    // * The tests above also cover Objects as a result.

    test('should collect map entries', () => {
        expect(collect(map.values())).toStrictEqual([1, 2, 3])
        expect(collect(map.keys())).toStrictEqual(['one', 'two', 'three'])
        expect(collect(map.entries())).toStrictEqual([['one', 1], ['two', 2], ['three', 3]])
    })

})
