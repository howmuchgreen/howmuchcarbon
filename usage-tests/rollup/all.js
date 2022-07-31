import { howMuch } from "@howmuchgreen/howmuchcarbon";
import assert from "assert";

const results = howMuch("iphone 12");

assert(HowMuchResult.isThing(results.bestResult));

console.log(
  `${results.bestResult.name} : ${results.bestResult.co2Eq.format()} CO₂eq`
);
