#!/usr/bin/env zx
import "zx/globals";
import size from "filesize-parser";
$.verbose = false;

// await $`npm run build`;

const minifiedSize = async (file) => {
  await $`npx babel-minify dist/${file}.js --out-file dist/${file}.min.js --mangle false`;
  const { stdout: stdout } =
    await $`npx gzip-size dist/${file}.min.js | npx pretty-bytes`.quiet();
  return stdout.replace("k", "K").trim();
};

const maxSizes = [
  ["rollup/minimal", "50KB"],
  ["rollup/things", "100KB"],
  ["rollup/all", "1MB"],
  ["webpack/main", "500KB"],
];

let errors = false;
for (const [name, maxSize] of maxSizes) {
  const bundleSize = await minifiedSize(`${name}`);
  if (size(bundleSize) > size(maxSize)) {
    errors = true;
    console.log(`${name} is too big: ${chalk.red(bundleSize)} > ${maxSize}`);
  } else {
    console.log(`${name} is OK: ${chalk.greenBright(bundleSize)} < ${maxSize}`);
  }
}

if (errors) {
  process.exit(1);
}
