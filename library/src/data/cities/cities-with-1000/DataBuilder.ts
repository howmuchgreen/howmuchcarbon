import { CityProto, CityArrayProto } from "./City.pb";
import cities from "all-the-cities";
import fs from "fs";

// We reduce a bit the number of cities to speed-up the lookup,
// which is using the levenshtein distance.

export const buildCitiesWith1000 = () => {
  const filteredCities: CityProto[] = cities
    .filter((city) => city.population >= 10_000)
    .map((city) => ({
      ...city,
      name: city.name,
      location: { lat: city.loc.coordinates[1], lng: city.loc.coordinates[0] },
      country: city.country,
    }));

  fs.writeFileSync(
    `${__dirname}/all-cities.pbf`,
    CityArrayProto.encode({ cities: filteredCities }).finish()
  );
};
