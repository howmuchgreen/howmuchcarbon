import { pipe } from "fp-ts/function";
import * as Codec from "io-ts/Codec";
import { Co2Eq } from "./Co2Eq";
import { fromClassCodec } from "./io-ts";

export class Transport {
  type;
  co2Eq;
  explanation;

  constructor(props: TransportProps) {
    this.type = props.type;
    this.co2Eq = props.co2Eq;
    this.explanation = props.explanation;
  }

  static build(props: TransportProps) {
    return new Transport(props);
  }

  static propsCodec = pipe(
    Codec.struct({
      type: Codec.literal("flight", "train"),
      co2Eq: Co2Eq.stringCodec,
      explanation: Codec.struct({
        sources: Codec.array(Codec.string),
        co2EqPerKm: Co2Eq.stringCodec,
      }),
    })
  );

  static codec = pipe(
    this.propsCodec,
    Codec.compose(fromClassCodec(Transport))
  );
}

type TransportProps = Codec.TypeOf<typeof Transport.propsCodec>;
