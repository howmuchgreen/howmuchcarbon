import { pipe } from "fp-ts/function";
import * as Codec from "io-ts/Codec";
import { City } from "./City";
import { fromClassCodec } from "./io-ts";
import { Transport } from "./Transport";

export class Trip {
  kind;
  origin;
  destination;
  distanceInKm;
  transports;

  constructor(props: TripProps) {
    this.kind = "trip" as "trip";
    this.origin = props.origin;
    this.destination = props.destination;
    this.distanceInKm = props.distanceInKm;
    this.transports = props.transports;
  }

  static build(props: TripProps) {
    return new Trip(props);
  }

  static propsCodec = pipe(
    Codec.struct({
      distanceInKm: Codec.number,
      origin: City.codec,
      destination: City.codec,
      transports: Codec.array(Transport.codec),
    })
  );

  static codec = pipe(this.propsCodec, Codec.compose(fromClassCodec(Trip)));
}

type TripProps = Omit<Codec.TypeOf<typeof Trip.propsCodec>, "kind">;
