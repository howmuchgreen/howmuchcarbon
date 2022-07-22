import { Thing, DataProvider } from "../../domain";
import thingsJson from "./things.json";
import * as Codec from "io-ts/Codec";
import { isLeft } from "fp-ts/lib/Either";
import { draw } from "io-ts/lib/Decoder";

export class ThingsDataProvider implements DataProvider<Thing> {
  getAll() {
    const things = Codec.array(Thing.codec).decode(thingsJson);
    if (isLeft(things)) {
      throw new Error(
        `There was a problem decoding thing data: ${draw(things.left)}`
      );
    }
    return things.right;
  }
}

export default new ThingsDataProvider();
