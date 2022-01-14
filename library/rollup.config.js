import json from "@rollup/plugin-json";
import ts from "rollup-plugin-ts";

const plugins = [ts(), json({ compact: true })];

export default [
  {
    plugins,
    input: "src/index.ts",
    output: {
      file: "dist/cjs/bundle.js",
      format: "cjs",
    },
  },
  {
    plugins,
    input: "src/index.ts",
    output: {
      file: "dist/esm/bundle.js",
      format: "esm",
    },
  },
];
