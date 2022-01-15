import { Thing } from "./Thing";

describe("Thing", () => {
  it("should encode properly", () => {
    console.log(Thing.codec.encode(Thing.factory()));
  });
});
