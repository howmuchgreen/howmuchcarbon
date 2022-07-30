import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "example-minimal.js",
    output: {
      file: "dist/example-minimal.js",
      format: "cjs",
    },
    plugins: [resolve({ jsnext: true, main: true }), commonjs()],
  },
  {
    input: "example-things.js",
    output: {
      file: "dist/example-things.js",
      format: "cjs",
    },
    plugins: [resolve({ jsnext: true, main: true }), commonjs()],
  },
  {
    input: "example-all.js",
    output: {
      file: "dist/example-all.js",
      format: "cjs",
    },
    plugins: [resolve({ jsnext: true, main: true }), commonjs()],
  },
];
