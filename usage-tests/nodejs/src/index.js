const {
  howMuch,
  HowMuchResult,
  Co2Eq,
} = require("@howmuchgreen/howmuchcarbon");

printResult(howMuch("iPad").bestResult);
printResult(howMuch("Paris New York").bestResult);

/**
 *
 * @param {HowMuchResult} result
 */
function printResult(result) {
  if (HowMuchResult.isThing(result)) {
    console.log(`${result.name}: ${printCo2Eq(result.co2Eq)}`);
  } else {
    console.log(
      `${result.origin?.name} > ${result.destination?.name}: ${printCo2Eq(
        result.transports[0].co2Eq
      )}`
    );
  }
}

/**
 *
 * @param {Co2Eq} co2Eq
 * @returns {string}
 */
function printCo2Eq(co2Eq) {
  return `${co2Eq.format()} CO₂eq`;
}
