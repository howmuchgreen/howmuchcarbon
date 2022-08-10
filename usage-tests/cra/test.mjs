#!/usr/bin/env zx
import "zx/globals";
import size from "filesize-parser";
import prettyBytes from "pretty-bytes";
$.verbose = false;

await $`npm run build`;

const files = (await $`find build/static/js -name '*.js'`).stdout
  .trim()
  .split("\n");

const minifiedSize = async (file) => {
  const { stdout } = await $`npx gzip-size ${file}`.quiet();
  return stdout.replace("k", "K").trim();
};

const maxMainSize = "100KB";
const maxSize = "50KB";
const maxTotalSize = "150KB";

let errors = false;
let totalSize = 0;

for (const path of files) {
  const bundleSize = await minifiedSize(path);
  const bundleSizeInt = size(bundleSize);
  totalSize += bundleSizeInt;
  if (path.includes("main.")) {
    if (bundleSizeInt > size(maxMainSize)) {
      errors = true;
      console.log(
        `Main package ${path} is too big: ${chalk.red(
          bundleSize
        )} > ${maxMainSize}`
      );
    } else {
      console.log(
        `${path} is OK: ${chalk.greenBright(bundleSize)} < ${maxMainSize}`
      );
    }
  } else if (bundleSizeInt > size(maxSize)) {
    errors = true;
    console.log(`${path} is too big: ${chalk.red(bundleSize)} > ${maxSize}`);
  } else {
    console.log(`${path} is OK: ${chalk.greenBright(bundleSize)} < ${maxSize}`);
  }
}

if (totalSize > size(maxTotalSize)) {
  errors = true;
  console.log(
    `Total size is too big: ${chalk.red(
      prettyBytes(totalSize)
    )} > ${maxTotalSize}`
  );
} else {
  console.log(
    `Total size is OK: ${chalk.greenBright(
      prettyBytes(totalSize)
    )} < ${maxTotalSize}`
  );
}

if (errors) {
  process.exit(1);
}
