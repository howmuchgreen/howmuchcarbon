import * as Codec from "io-ts/Codec";

export namespace Kind {
  export const codec = Codec.literal("thing", "trip");
}
export type Kind = Codec.TypeOf<typeof Kind.codec>;
