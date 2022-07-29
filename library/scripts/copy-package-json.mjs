#!/usr/bin/env zx
import "zx/globals";
const LIB_ROOT = path.resolve(`${__dirname}`, `..`);
const TARGET_DIR = path.resolve(`${LIB_ROOT}`, `published`);
const TARGET_CJS_DIR = path.resolve(`${LIB_ROOT}`, `published/cjs`);
const DIST_ESM_ROOT = path.resolve(`${LIB_ROOT}`, `dist/esm`);
const DIST_CJS_ROOT = path.resolve(`${LIB_ROOT}`, `dist/cjs`);

let {
  name,
  version,
  description,
  types,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  dependencies,
  sideEffects,
} = fs.readJsonSync(`${LIB_ROOT}/package.json`);

const newPackageJson = {
  name,
  version,
  description,
  types,
  module: "src/index.js",
  main: "cjs/bundle.js",
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  dependencies,
  sideEffects,
};

fs.mkdirSync(TARGET_DIR, { recursive: true });

if (existingPackageJsonEquals(newPackageJson)) {
  echo(`-- ${path.relative(LIB_ROOT, TARGET_DIR)}/package.json unchanged`);
} else {
  echo(`✅ ${path.relative(LIB_ROOT, TARGET_DIR)}/package.json changed`);
  fs.writeJsonSync(`${TARGET_DIR}/package.json`, newPackageJson);
}

fs.cpSync(DIST_ESM_ROOT, `${TARGET_DIR}/`, { recursive: true });
fs.cpSync(DIST_CJS_ROOT, `${TARGET_CJS_DIR}/`, { recursive: true });

echo(`✅ ESM files copied to ./${path.relative(LIB_ROOT, TARGET_DIR)}`);

function existingPackageJsonEquals(packageJson) {
  return (
    fs.existsSync(`${TARGET_DIR}/package.json`) &&
    JSON.stringify(fs.readJsonSync(`${TARGET_DIR}/package.json`)) ===
      JSON.stringify(packageJson)
  );
}
