import json from "@rollup/plugin-json";
import ts from "rollup-plugin-ts";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const plugins = [
  ts(),
  json({ compact: true }),
  nodeResolve(),
  commonjs(),
];

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
