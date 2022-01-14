import { Co2Eq, ResultObject, Thing } from "./domain";

export const howMuch = (query: string): ResultObject => {
  return ResultObject.build({
    results: [
      Thing.build({ co2Eq: Co2Eq.build({ averageInGrams: 120 * 1000 }) }),
    ],
  });
};
