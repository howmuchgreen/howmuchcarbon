import { Thing } from "../../domain";
import thingsJson from "./things.json";
import * as Codec from "io-ts/Codec";
import { isLeft } from "fp-ts/lib/Either";
import { draw } from "io-ts/lib/Decoder";

export const ALL_THINGS = () => {
  const things = Codec.array(Thing.codec).decode(thingsJson);
  if (isLeft(things)) {
    throw new Error(
      `There was a problem decoding thing data: ${draw(things.left)}`
    );
  }

  return things.right;
};
