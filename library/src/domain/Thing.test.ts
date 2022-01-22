import { isRight, right } from "fp-ts/lib/Either";
import { Thing } from "./Thing";

describe("Thing", () => {
  it("should encode properly", () => {
    const originalThing = Thing.factory();
    const decodedThing = Thing.codec.decode(Thing.codec.encode(originalThing));
    expect(
      isRight(decodedThing)
    ).toBeTruthy();
    expect(decodedThing).toEqual(right(originalThing))
  });
});
