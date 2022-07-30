import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "minimal.js",
    output: {
      file: "dist/rollup/minimal.js",
      format: "cjs",
    },
    plugins: [resolve({ jsnext: true, main: true }), commonjs()],
  },
  {
    input: "things.js",
    output: {
      file: "dist/rollup/things.js",
      format: "cjs",
    },
    plugins: [resolve({ jsnext: true, main: true }), commonjs()],
  },
  {
    input: "all.js",
    output: {
      file: "dist/rollup/all.js",
      format: "cjs",
    },
    plugins: [resolve({ jsnext: true, main: true }), commonjs()],
  },
];
