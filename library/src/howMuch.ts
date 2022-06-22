import { ResultObject, Thing, Trip } from "./domain";
import { searchThings } from "./things";
import { searchTrips } from "./trips";

export const howMuch = (query: string): ResultObject => {
  const results: (Trip | Thing)[] = [];

  const thingsResults = searchThings(query);
  const tripResult = searchTrips(query);

  if (thingsResults.length === 0 && tripResult.length > 0) {
    results.push(...tripResult.map(({ trip }) => trip));
  } else {
    results.push(...thingsResults);
  }

  return ResultObject.build({
    results,
  });
};
