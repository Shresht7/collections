//  Library
import { AwesomeMap } from './map'

const map = new AwesomeMap<string, number>()

map.set('one', 1)
map.set('two', 2)
map.set('three', 3)
map.set('four', 4)
map.set('five', 5)

const filteredMap = map.filter((v) => v % 2 !== 0)

console.log(filteredMap.size)
console.log(filteredMap)
