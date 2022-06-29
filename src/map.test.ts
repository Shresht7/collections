//  Library
import { AwesomeMap } from './map'
import { afterAll, beforeEach, describe, expect, test } from 'vitest'


const obj = {
    one: 1,
    two: 2,
    three: 3,
}

const map = new AwesomeMap<string, number>(Object.entries(obj))


describe('AwesomeMap', () => {

    describe('fromEntries', () => {

        const testMap = new AwesomeMap()

        test('should generate an AwesomeMap using Object.entries', () => {
            //  Generate an AwesomeMap using Object.entries
            testMap.fromEntries(Object.entries(obj))
            expect(testMap.get('one')).toBe(1)
            expect(testMap.get('two')).toBe(2)
            expect(testMap.get('three')).toBe(3)
            expect(testMap.get('four')).toBe(undefined)
        })

        test('should not clear existing entries if the second argument is false', () => {
            testMap.fromEntries(Object.entries({ four: 4 }), false)
            expect(testMap.get('four')).toBe(4)
            expect(testMap.size).toBe(4)
        })

        test('should accept an iterator like arrays', () => {
            testMap.fromEntries([['a', 1], ['b', 2]])
            expect(testMap.get('a')).toBe(1)
            expect(testMap.size).toBe(2)
            expect(testMap.get('one')).toBe(undefined)
        })

    })

    describe('constructor', () => {

        test('should generate an AwesomeMap directly from the constructor call', () => {
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

    })

    describe('at', () => {

        test('should return the entry at the given position', () => {
            expect(map.at(0)).toStrictEqual(['one', 1])
            expect(map.at(1)).toStrictEqual(['two', 2])
        })

        test('should wrap around if the position is greater than the map.size', () => {
            expect(map.at(3)).toStrictEqual(['one', 1])
            expect(map.at(5)).toStrictEqual(['three', 3])
        })

        test('should wrap around if the position is smaller than 0', () => {
            expect(map.at(-1)).toStrictEqual(['three', 3])
            expect(map.at(-3)).toStrictEqual(['one', 1])
        })

    })

    describe('filter', () => {

        test('should filter out odd values from the map', () => {
            const filteredMap = map.filter((v) => v % 2 !== 0)
            expect(filteredMap.size).toBe(2)
            expect(filteredMap.get('one')).toBe(1)
            expect(filteredMap.get('two')).toBe(undefined)
            expect(filteredMap.get('three')).toBe(3)
        })

    })

    describe('map', () => {

        test('should map values to a string with double the amount of *s', () => {
            const starMap = map.map(v => '*'.repeat(v * 2))
            expect(starMap.get('one')).toBe('**')
            expect(starMap.get('two')).toBe('****')
            expect(starMap.get('three')).toBe('******')
            expect(starMap.get('four')).toBe(undefined)
        })

    })

    describe('transform', () => {

        test('should transform the map to have upper-case keys and the square of their values', () => {
            const newMap = map.transform((key, value) => [key.toUpperCase(), value ** 2])
            expect(newMap.get('ONE')).toBe(1)
            expect(newMap.get('TWO')).toBe(4)
            expect(newMap.get('THREE')).toBe(9)
            expect(newMap.get('FOUR')).toBe(undefined)
        })

    })

    describe('mirror', () => {

        test('should flip the map such that keys are now values and values are now keys', () => {
            const mirroredMap = map.mirror()
            expect(mirroredMap.get(1)).toBe('one')
            expect(mirroredMap.get(2)).toBe('two')
            expect(mirroredMap.get(3)).toBe('three')
            expect(mirroredMap.get(4)).toBe(undefined)
        })

    })

    describe('reduce', () => {

        test('should reduce the map to the sum of its values', () => {
            const sum = map.reduce((accumulator, current) => accumulator + current, 0)
            expect(sum).toBe(6)
        })

        test('should reduce the map to the product of its values (without an explicit initializer)', () => {
            const product = map.reduce((accumulator, current) => accumulator * current)
            expect(product).toBe(6)
        })

    })

    describe('find', () => {

        test('should find odd number other than 1', () => {
            const [key, value] = map.find((v => v !== 1 && v % 2 !== 0))!
            expect(key).toBe('three')
            expect(value).toBe(3)
        })

        test('should not find any value of type string', () => {
            const notFound = map.find(v => typeof v === 'string')
            expect(notFound).toBeFalsy()
        })

    })

    describe('keyof', () => {

        test('should return the keys of the given values', () => {
            expect(map.keyOf(1)).toBe('one')
            expect(map.keyOf(3)).toBe('three')
            expect(map.keyOf(5)).toBe(undefined)
        })

    })

    describe('every', () => {

        test('should return true if all values in the map are positive', () => {
            expect(map.every(v => v >= 0)).toBeTruthy()
        })

        test('should return false if all values are not odd', () => {
            expect(map.every(v => v % 2 !== 0)).toBeFalsy()
        })

    })

    describe('some', () => {

        test('should return true if any value is greater than 2', () => {
            expect(map.some(v => v > 2)).toBeTruthy()
        })

        test('should return false if no value is smaller than 0', () => {
            expect(map.some(v => v < 0)).toBeFalsy()
        })

    })

    describe('toObject', () => {

        test('should convert the map into an object', () => {
            const res = map.toObject()
            expect(res).toStrictEqual(obj)
            expect(res).not.toBeInstanceOf(AwesomeMap)
        })

    })

})
