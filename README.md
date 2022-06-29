# collections
-------------

A library of utility functions for collections (like arrays, maps and sets).

## `AwesomeMap`

An extension of the Map class with more awesome features.

```ts
import { AwesomeMap } from 'collections'

const map = new AwesomeMap()
//  ...
map.filter(v => v % 2 !== 0)    //  Filters even values out of the map
map.reduce((sum, value) => sum + value, 0)  //  Reduces the map to the sum of its values
```

---

## 📑 License

[MIT License](./LICENSE)
