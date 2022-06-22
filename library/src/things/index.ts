import { isLeft } from "fp-ts/Either";
import * as Codec from "io-ts/Codec";
import { draw } from "io-ts/Decoder";
import { matchSorter } from "match-sorter";
import thingsJson from "../../things/things.json";
import { Thing } from "../domain";

const things = Codec.array(Thing.codec).decode(thingsJson);

if (isLeft(things)) {
  throw new Error(
    `There was a problem decoding thing data: ${draw(things.left)}`
  );
}

export const searchThings = (query: string): Thing[] => {
  const thingsResults = matchSorter(things.right, query, {
    keys: ["name", "keywords"],
  });

  return thingsResults;
};
