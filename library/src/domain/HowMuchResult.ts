import { Thing } from "./Thing";
import { Trip } from "./Trip";
import * as Codec from "io-ts/Codec";

export type HowMuchResult = Thing | Trip;

export namespace HowMuchResult {
  export const codec = Codec.sum("kind")({
    thing: Thing.codec,
    trip: Trip.codec,
  });

  export const isTrip = (result: HowMuchResult): result is Trip =>
    result.kind === "trip";

  export const isThing = (result: HowMuchResult): result is Thing =>
    result.kind === "thing";
}
