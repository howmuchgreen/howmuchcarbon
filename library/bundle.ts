import { Parcel } from "@parcel/core";

const bundler = new Parcel({
  entries: "src/index.ts",
  defaultConfig: "@parcel/config-default",
  mode: "production",
  targets: {
    types: {
      distDir: "dist/types/",
      distEntry: "bundle.d.ts",
    },
    main: {
      isLibrary: true,
      engines: {
        node: ">= 14",
      },
      distDir: "dist/cjs/",
      distEntry: "bundle.js",
      outputFormat: "commonjs",
    },
    module: {
      isLibrary: true,
      engines: {
        node: ">= 14",
      },
      distDir: "dist/esm/",
      distEntry: "bundle.js",
      outputFormat: "esmodule",
    },
  },
});

const bundlerDomainOnly = new Parcel({
  entries: "src/domain/index.ts",
  defaultConfig: "@parcel/config-default",
  mode: "production",
  targets: {
    types: {
      distDir: ".",
      distEntry: "domain.d.ts",
    },
    browser: {
      isLibrary: true,
      engines: {
        browsers: "last 1 years, > 2%, not dead",
      },
      distDir: ".",
      distEntry: "domain.js",
    },
  },
});

const bundle = async () => {
  try {
    const { bundleGraph, buildTime } = await bundler.run();
    const bundles = bundleGraph.getBundles();
    console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
  } catch (err) {
    console.log(err);
  }

  try {
    const { bundleGraph, buildTime } = await bundlerDomainOnly.run();
    const bundles = bundleGraph.getBundles();
    console.log(`✨ Built ${bundles.length} domain bundles in ${buildTime}ms!`);
  } catch (err) {
    console.log(err);
  }
};

bundle();
