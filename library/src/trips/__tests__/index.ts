import { searchTrips } from "..";

describe("searchTrips", () => {
  it("should not find trips", () => {
    expect(searchTrips("oneword")).toHaveLength(0);
  });

  it("should find trips", () => {
    expect(searchTrips("paris new york")).toHaveLength(1);
  });
});
