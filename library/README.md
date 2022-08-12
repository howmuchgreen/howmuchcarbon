# @howmuchgreen/howmuchcarbon

![npm](https://img.shields.io/npm/v/@howmuchgreen/howmuchcarbon)

A library to access how much CO2Eq (equivalent in carbon dioxyde) various things, or trips emit.

The library is also available through a HTTP API:

- `https://howmuch.green/api/macbook14`
- `https://howmuch.green/api/paris+new+york`

## Installation

```bash
npm i @howmuchgreen/howmuchcarbon
```

## Usage

```ts
import {
  HowMuch,
  CITIES_ABOVE_10_000,
  ALL_THINGS,
} from "@howmuchgreen/howmuchcarbon";

const howMuch = new HowMuch({
  cities: CITIES_ABOVE_10_000,
  things: ALL_THINGS,
});

const [macbookPro14] = howMuch.searchThings("macbook pro 14");
console.log(macbookPro14.name); // 'MacBook Pro 14' 2021'
console.log(macbookPro14.co2Eq.averageInGrams); // 271000
console.log(macbookPro14.co2Eq.format()); // '271 kg'
console.log(macbookPro14.sources); // ['https://www.apple.com/environment/…']

const tripParisNewYork = howMuch.searchTrips("paris new york")[0];
console.log(tripParisNewYork.origin.name); // 'Paris'
console.log(tripParisNewYork.destination.name); // 'New York City'
console.log(tripParisNewYork.transports[0].co2Eq.averageInGrams); // 922252
console.log(tripParisNewYork.transports[0].co2Eq.format()); // '922 kg'
```

More examples can be found in the [usage-test directory](https://github.com/howmuchgreen/howmuchcarbon/tree/main/usage-tests).

## How to add products to the database?

1. Fork the repository
2. Add new products in the [things.json file](https://github.com/howmuchgreen/howmuchcarbon/blob/main/library/src/data/things/things.json)
3. Be sure to include a **valid source**, and more than one if needed
4. Open a pull request

---

## Dev setup

```bash
cd library

# Install protoc binary
brew install protobuf # MacOS. For other platforms, see protoc releases there: https://github.com/protocolbuffers/protobuf/releases

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Build in watch mode (runs tsc -b)
npm run build -- --watch

# Bundle this as a library (esm & cjs bundles) to use this as a library
npm run package

```

## Publish the library

```bash
npx np --any-branch --no-2fa
```
