import { HowMuch, HowMuchArgs } from "./HowMuchClass";
import cities from "./data/cities/cities-with-1000";
import things from "./data/things";

const allData: HowMuchArgs = {
  cities,
  things,
};

export const howMuch = (searchString: string) => {
  return new HowMuch(allData).search(searchString);
};
