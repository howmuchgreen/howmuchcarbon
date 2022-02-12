# @howmuchgreen/howmuchcarbon

![npm](https://img.shields.io/npm/v/@howmuchgreen/howmuchcarbon)

A library to access how much CO2Eq (equivalent in carbon dioxyde) a thing costs.

A HTTP API is also available: `https://howmuch.green/api/macbook14`

## Installation

```bash
npm i @howmuchgreen/howmuchcarbon
```

## Usage

```ts
import { howMuch } from "@howmuchgreen/howmuchcarbon";

const macbookPro14 = howMuch("macbook pro 14").bestResult;
console.log(macbookPro14.name); // 'MacBook Pro 14' 2021'
console.log(macbookPro14.co2Eq.averageInGrams); // 271000
console.log(macbookPro14.co2Eq.format()); // '271 kg'
console.log(macbookPro14.sources); // ['https://www.apple.com/environment/…']
```

More examples can be found in the [usage-test directory](https://github.com/howmuchgreen/howmuchcarbon/tree/main/usage-tests).

## Contributing

1. Fork the repository
2. Add new products in the [things.json file](https://github.com/howmuchgreen/howmuchcarbon/blob/main/library/things/things.json)
3. Be sure to include a **valid source**, and more than one if needed
4. Open a pull request

---

## Dev setup

```bash
# Install dependencies
npm install

# Run tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Build in watch mode (runs tsc -b)
npm run build -- --watch

# Bundle this as a library (esm & cjs bundles) to use this as a library
npm run rollup

# Bundle this as a library in watch mode
npm run rollup -- --watch
# -- OR --
npm run dev

```

## Publish the library

```bash
npx np --any-branch --no-2fa
```
