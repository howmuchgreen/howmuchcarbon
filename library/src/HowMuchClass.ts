import * as Codec from "io-ts/lib/Codec";
import { matchSorter } from "match-sorter";
import { CityProto } from "./data";
import { ResultObject, Thing, Trip } from "./domain";
import { searchTrips } from "./trips";

export type HowMuchArgs = {
  things?: () => Thing[];
  cities?: () => CityProto[];
};

export class HowMuch {
  things: Codec.TypeOf<typeof Thing.codec>[];
  cities;

  constructor(args: HowMuchArgs = {}) {
    this.things = (args.things && args.things()) || [];
    this.cities = (args.cities && args.cities()) || [];
  }

  searchThings = (query: string): Thing[] => {
    const thingsResults = matchSorter(this.things, query, {
      keys: ["name", "keywords"],
    });

    return thingsResults;
  };

  searchTrips = (query: string): Trip[] => {
    const tripResults = searchTrips(this.cities, query);

    return tripResults.map(({ trip }) => trip);
  };

  search = (query: string): ResultObject => {
    const results: (Trip | Thing)[] = [];

    const thingsResults = this.searchThings(query);
    const tripResults = searchTrips(this.cities, query);

    if (thingsResults.length === 0 && tripResults.length > 0) {
      results.push(...tripResults.map(({ trip }) => trip));
    } else {
      results.push(...thingsResults);
    }

    return ResultObject.build({
      results,
    });
  };
}
