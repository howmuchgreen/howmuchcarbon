import { Co2Eq } from "./Co2Eq";
import { Kind } from "./Kind";

export interface HowMuchResult {
  co2Eq: Co2Eq;
  kind: Kind;
  name: string;
  source?: string;
}
