import * as Codec from "io-ts/Codec";

export namespace City {
  export const codec = Codec.struct({
    name: Codec.string,
    country: Codec.string,
  });
}
export type City = Codec.TypeOf<typeof City.codec>;
