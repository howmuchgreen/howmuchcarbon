# @howmuchgreen/howmuchcarbon

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

# How to use this library
## With Node.JS (CommonJS bundle)
You can test how to use this library by looking at [the nodeJS usage-test project](../usage-tests/nodejs/README.md).

# Publish the library
```bash
npx np --any-branch --no-2fa 
```