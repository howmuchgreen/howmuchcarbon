import { howMuch } from "./HowMuch";

describe("howMuch()", () => {
  it("should return some results when searching for iPhone", () => {
    expect(howMuch("iphone").numResults).toBeGreaterThan(0);
  });
  it("should return some results when searching for apple", () => {
    expect(howMuch("apple").numResults).toBeGreaterThan(2);
  });
  it("should return some results when searching for paris berlin", () => {
    expect(howMuch("paris berlin").numResults).toEqual(1);
  });
  it("should return nothing when searching for something that does not exist", () => {
    expect(howMuch("qmskljvlkjqdnfparoeiunlsdkfjvnqlfgur").numResults).toEqual(
      0
    );
  });
});
