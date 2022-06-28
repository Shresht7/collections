//  Library
import { AwesomeMap } from './map'
import { describe, expect, test } from 'vitest'


describe('AwesomeMap', () => {

    const map = new AwesomeMap<string, number>()

    map.set('one', 1)
        .set('two', 2)
        .set('three', 3)
        .set('four', 4)
        .set('five', 5)

    test('filter', () => {
        const filteredMap = map.filter((v) => v % 2 !== 0)
        expect(filteredMap.size).toBe(3)
        expect(filteredMap.get('one')).toBe(1)
        expect(filteredMap.get('three')).toBe(3)
        expect(filteredMap.get('five')).toBe(5)
    })

})
