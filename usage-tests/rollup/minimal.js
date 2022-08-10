import { HowMuch } from "@howmuchgreen/howmuchcarbon";
import assert from "assert";

const results = new HowMuch().search("iphone 12");

assert(results.results.length === 0);
