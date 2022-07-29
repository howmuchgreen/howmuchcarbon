const { howMuch, HowMuchResult } = require("@howmuchgreen/howmuchcarbon");

describe("howMuch()", () => {
  it("should return some results when searching for iPad", () => {
    expect(howMuch("iphone").numResults).toBeGreaterThan(0);
  });

  it("should return some flight for Paris > New York", () => {
    const flightResults = howMuch("paris newyork");
    expect(flightResults.numResults).toBeGreaterThan(0);
    flightResults.results.forEach((result) => {
      expect(result.kind).toBe("trip");
    });
    expect(HowMuchResult.isTrip(flightResults.bestResult)).toBe(true);
    expect(flightResults.bestResult.origin?.name).toBe("paris");
    expect(flightResults.bestResult.destination?.name).toBe("new york");
  });
});
