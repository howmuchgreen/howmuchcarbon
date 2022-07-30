import { HowMuch, HowMuchArgs } from "./HowMuchClass";
import { CITIES_ABOVE_10_000, ALL_THINGS } from "./data";

const allData: HowMuchArgs = {
  cities: CITIES_ABOVE_10_000,
  things: ALL_THINGS,
};

export const howMuch = (searchString: string) => {
  return new HowMuch(allData).search(searchString);
};
