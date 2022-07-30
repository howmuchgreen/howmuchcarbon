module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts", "**/__tests__/*.ts"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  transform: {
    "\\.(pbf)$": "<rootDir>/pbfTransformer.js",
  },
};
