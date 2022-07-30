import { searchTrips } from "..";
import { CITIES_ABOVE_10_000 } from "../../data";

describe("searchTrips", () => {
  it("should not find trips", () => {
    expect(searchTrips(CITIES_ABOVE_10_000, "oneword")).toHaveLength(0);
  });

  it("should find trips", () => {
    expect(searchTrips(CITIES_ABOVE_10_000, "paris new york")).toHaveLength(1);
  });
});
