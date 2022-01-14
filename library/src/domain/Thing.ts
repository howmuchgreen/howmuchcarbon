import { Co2Eq } from "./Co2Eq";
import { HowMuchResult } from "./HowMuchResult";
import { Kind } from "./Kind";
import * as Codec from "io-ts/lib/Codec";
import { fromClassCodec, fromEnumCodec } from "./io-ts";
import { pipe } from "fp-ts/lib/function";

export class Thing implements HowMuchResult {
  kind = Kind.THING;
  co2Eq;
  keywords;
  name;
  source;

  constructor(props: ThingProps) {
    this.co2Eq = props.co2Eq;
    this.keywords = props.keywords;
    this.name = props.name;
    this.source = props.source;
  }

  static build(props: ThingProps) {
    return new Thing(props);
  }
  
  static propsCodec = pipe(
    Codec.struct({
      kind: fromEnumCodec("Kind", Kind),
      name: Codec.string,
      co2Eq: Co2Eq.stringCodec,
    }),
    Codec.intersect(
      Codec.partial({
        keywords: Codec.array(Codec.string),
        source: Codec.string,
      })
    )
  );

  static codec = pipe(this.propsCodec, Codec.compose(fromClassCodec(Thing)));
}

type ThingProps = Codec.TypeOf<typeof Thing.propsCodec>;
