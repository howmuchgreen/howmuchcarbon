import { Thing } from "./Thing";
import * as Codec from "io-ts/Codec";

export type HowMuchResult = Thing;

export namespace HowMuchResult {
  export const codec = Codec.sum("kind")({ thing: Thing.codec });
}
