//  Library
import { AwesomeMap } from './map'
import { describe, expect, test } from 'vitest'

//  TODO: Add more tests

describe('AwesomeMap', () => {

    const map = new AwesomeMap<string, number>()
    const obj = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5
    }

    test('fromEntries', () => {
        map.fromEntries(Object.entries(obj))
        expect(map.get('one')).toBe(1)
        expect(map.get('two')).toBe(2)
        expect(map.get('three')).toBe(3)
        expect(map.get('four')).toBe(4)
        expect(map.get('five')).toBe(5)
        expect(map.get('six')).toBe(undefined)
    })

    test('constructor', () => {
        const squareMap = new AwesomeMap(Object.entries({
            one: 1,
            two: 4,
            three: 9
        }))
        expect(squareMap.get('one')).toBe(1)
        expect(squareMap.get('two')).toBe(4)
        expect(squareMap.get('three')).toBe(9)
        expect(squareMap.get('four')).toBe(undefined)
    })

    test('filter', () => {
        const filteredMap = map.filter((v) => v % 2 !== 0)
        expect(filteredMap.size).toBe(3)
        expect(filteredMap.get('one')).toBe(1)
        expect(filteredMap.get('three')).toBe(3)
        expect(filteredMap.get('five')).toBe(5)
    })

    test('map', () => {
        const starMap = map.map(v => '*'.repeat(v * 2))
        expect(starMap.get('one')).toBe('**')
        expect(starMap.get('two')).toBe('****')
        expect(starMap.get('three')).toBe('******')
        expect(starMap.get('six')).toBe(undefined)
    })

    test('transform', () => {
        const newMap = map.transform((key, value) => [key.toUpperCase(), value ** 2])
        expect(newMap.get('ONE')).toBe(1)
        expect(newMap.get('TWO')).toBe(4)
        expect(newMap.get('THREE')).toBe(9)
        expect(newMap.get('SIX')).toBe(undefined)
    })

    test('mirror', () => {
        const mirroredMap = map.mirror()
        expect(mirroredMap.get(1)).toBe('one')
        expect(mirroredMap.get(3)).toBe('three')
        expect(mirroredMap.get(5)).toBe('five')
        expect(mirroredMap.get(7)).toBe(undefined)
    })

    test('reduce', () => {
        const sum = map.reduce((accumulator, current) => accumulator + current, 0)
        expect(sum).toBe(15)
        const product = map.reduce((accumulator, current) => accumulator * current)
        expect(product).toBe(120)
    })

    test('find', () => {
        const [key, value] = map.find((v => v !== 2 && v % 2 === 0))!
        expect(key).toBe('four')
        expect(value).toBe(4)
        const notFound = map.find(v => typeof v === 'string')
        expect(notFound).toBeFalsy()
    })

    test('every', () => {
        expect(map.every(v => v > 0)).toBeTruthy()
    })

    test('some', () => {
        expect(map.some(v => v % 2 === 0 && v % 3 === 0)).toBeFalsy()
    })

    test('toObject', () => {
        expect(map.toObject()).toStrictEqual(obj)
    })

})
