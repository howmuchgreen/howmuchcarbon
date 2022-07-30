import { HowMuch } from "@howmuchgreen/howmuchcarbon";
import assert from "assert";

const results = new HowMuch({}).search("iphone 12");

assert(results.results.length === 0);

// assert(HowMuchResult.isThing(results.bestResult));

// console.log(
//   `${results.bestResult.name} : ${results.bestResult.co2Eq.format()} CO₂eq`
// );
