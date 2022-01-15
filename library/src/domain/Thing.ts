import { pipe } from "fp-ts/es6/function";
import * as Codec from "io-ts/es6/Codec";
import { Co2Eq } from "./Co2Eq";
import { HowMuchResult } from "./HowMuchResult";
import { fromClassCodec } from "./io-ts";

export class Thing   {
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

  static propsCodec = Codec.sum("kind")({
    thing: pipe(
      Codec.struct({
        name: Codec.string,
        co2Eq: Co2Eq.stringCodec,
      }),
      Codec.intersect(
        Codec.partial({
          keywords: Codec.array(Codec.string),
          source: Codec.array(Codec.string),
        })
      )
    ),
  });

  static codec = pipe(this.propsCodec, Codec.compose(fromClassCodec(Thing)));
}

type ThingProps = Codec.TypeOf<typeof Thing.propsCodec>;
