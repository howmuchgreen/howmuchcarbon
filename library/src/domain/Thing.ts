import { Co2Eq } from "./Co2Eq";
import { HowMuchResult } from "./HowMuchResult";
import { Kind } from "./Kind";

export class Thing implements HowMuchResult {
  kind = Kind.THING;
  co2Eq;
  
  constructor(props: ThingProps) {
    this.co2Eq = props.co2Eq;
  }

  static build(props: ThingProps) {
    return new Thing(props);
  }
}

type ThingProps = {
  co2Eq: Co2Eq;
};
