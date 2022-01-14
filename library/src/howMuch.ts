import { isLeft } from "fp-ts/lib/Either";
import * as Codec from "io-ts/lib/Codec";
import { draw } from "io-ts/lib/Decoder";
import { matchSorter } from "match-sorter";
import apple from "../things/apple.json";
import { ResultObject, Thing } from "./domain";

const things = Codec.array(Thing.codec).decode(apple);

if (isLeft(things)) {
  throw new Error(
    `There was a problem decoding thing data: ${draw(things.left)}`
  );
}

export const howMuch = (query: string): ResultObject => {
  return ResultObject.build({
    results: matchSorter(things.right, query, {keys: ['name']}),
  });
};
