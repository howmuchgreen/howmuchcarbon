import { ALL_THINGS, HowMuch } from "@howmuchgreen/howmuchcarbon";
import assert from "assert";

const results = new HowMuch({ things: ALL_THINGS }).search("iphone 12");

assert(HowMuchResult.isThing(results.bestResult));

console.log(
  `${results.bestResult.name} : ${results.bestResult.co2Eq.format()} CO₂eq`
);
