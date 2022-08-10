import json from "@rollup/plugin-json";
import ts from "rollup-plugin-ts";
import { base64 } from "rollup-plugin-base64";
import commonjs from "@rollup/plugin-commonjs";

const plugins = [
  ts(),
  json({ compact: true }),
  commonjs(),
  base64({ include: "**/*.pbf" }),
];

const onwarn = (warning, warn) => {
  if (/warning-treating-module-as-external-dependency/.test(warning.url))
    return;
  warn(warning);
};

export default [
  {
    plugins,
    input: ["src/index.ts"],
    output: {
      dir: "dist/cjs",
      format: "cjs",
    },
    preserveModules: true,
    onwarn,
  },
  {
    plugins,
    input: ["src/index.ts"],
    output: {
      dir: "dist/esm",
      format: "esm",
    },
    preserveModules: true,
    onwarn,
  },
];
