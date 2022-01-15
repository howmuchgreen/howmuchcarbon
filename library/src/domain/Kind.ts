import * as Codec from "io-ts/es6/Codec";

export namespace Kind {
  export const codec = Codec.literal("thing", "trip");
}
export type Kind = Codec.TypeOf<typeof Kind.codec>;
