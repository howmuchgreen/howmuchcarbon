import json from "@rollup/plugin-json";
import ts from "rollup-plugin-ts";
import { base64 } from "rollup-plugin-base64";
import commonjs from "@rollup/plugin-commonjs";

const watch = {
  include: "src/data",
};

const plugins = [
  ts(),
  json({ compact: true }),
  commonjs(),
  base64({ include: "**/*.pbf" }),
];

export default [
  {
    plugins,
    input: "src/index.ts",
    watch,
    output: {
      file: "dist/cjs/bundle.js",
      format: "cjs",
    },
  },
  {
    plugins,
    input: "src/index.ts",
    output: {
      dir: "dist/esm",
      format: "esm",
    },
    preserveModules: true,
  },
];
