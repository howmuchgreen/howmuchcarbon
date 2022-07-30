const { readFileSync } = require("fs");

module.exports = {
  process(sourceText, sourcePath, options) {
    const fileData = readFileSync(sourcePath);
    return `module.exports = "${fileData.toString("base64")}";`;
  },
};
