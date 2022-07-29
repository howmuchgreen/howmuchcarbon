import { searchTrips } from "..";
import citiesWith1000 from "../../data/cities/cities-with-1000";

describe("searchTrips", () => {
  it("should not find trips", () => {
    expect(searchTrips(citiesWith1000.getAll(), "oneword")).toHaveLength(0);
  });

  it("should find trips", () => {
    expect(searchTrips(citiesWith1000.getAll(), "paris new york")).toHaveLength(
      1
    );
  });
});
