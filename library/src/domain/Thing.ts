import { pipe } from "fp-ts/function";
import * as Codec from "io-ts/Codec";
import { Co2Eq } from "./Co2Eq";
import { fromClassCodec } from "./io-ts";

export class Thing {
  kind;
  co2Eq;
  keywords;
  name;
  sources;

  constructor(props: ThingProps) {
    this.kind = props.kind;
    this.co2Eq = props.co2Eq;
    this.keywords = props.keywords;
    this.name = props.name;
    this.sources = props.sources;
  }

  static build(props: ThingProps) {
    return new Thing(props);
  }

  static factory({
    name = "aThing",
    sources = ["aSource"],
    co2Eq = Co2Eq.factory(),
    keywords = [],
  }: Partial<ThingProps> = {}) {
    return Thing.build({ kind: "thing", name, sources, co2Eq, keywords });
  }

  static propsCodec = pipe(
    Codec.struct({
      kind: Codec.literal("thing"),
      name: Codec.string,
      co2Eq: Co2Eq.stringCodec,
      keywords: Codec.array(Codec.string),
      sources: Codec.array(Codec.string),
    })
  );

  static codec = pipe(this.propsCodec, Codec.compose(fromClassCodec(Thing)));
}

type ThingProps = Codec.TypeOf<typeof Thing.propsCodec>;
