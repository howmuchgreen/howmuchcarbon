import { Thing } from "./Thing";
import { Trip } from "./Trip";
import * as Codec from "io-ts/Codec";

export type HowMuchResult = Thing | Trip;

export namespace HowMuchResult {
  export const codec = Codec.sum("kind")({
    thing: Thing.codec,
    trip: Trip.codec,
  });
}
