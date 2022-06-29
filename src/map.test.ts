//  Library
import { AwesomeMap } from './map'
import { describe, expect, test } from 'vitest'

//  TODO: Add more tests

describe('AwesomeMap', () => {

    const map = new AwesomeMap<string, number>()

    test('fromEntries', () => {
        map.fromEntries(Object.entries({
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5
        }))
        expect(map.get('one')).toBe(1)
        expect(map.get('two')).toBe(2)
        expect(map.get('three')).toBe(3)
        expect(map.get('four')).toBe(4)
        expect(map.get('five')).toBe(5)
        expect(map.get('six')).toBe(undefined)
    })

    test('filter', () => {
        const filteredMap = map.filter((v) => v % 2 !== 0)
        expect(filteredMap.size).toBe(3)
        expect(filteredMap.get('one')).toBe(1)
        expect(filteredMap.get('three')).toBe(3)
        expect(filteredMap.get('five')).toBe(5)
    })

    test('reduce', () => {
        const sum = map.reduce((accumulator, current) => accumulator + current, 0)
        expect(sum).toBe(15)
    })

})
