/// <reference path='./types.d.ts' />

import cities, { City, LngLat } from "all-the-cities";
import { distance } from "fastest-levenshtein";
import { Co2Eq, Co2EqUnit, Trip } from "../domain";
import { Transport } from "../domain/Transport";

type CityFormatted = City & { formattedName: string };
type BestCity = { city: CityFormatted; score: number };
type TripWithScore = { trip: Trip; score: number };

const formatCityName = (name: string) => {
  return name.toLocaleLowerCase().replace(/ city$/, "");
};

// We reduce a bit the number of cities to speed-up the lookup,
// which is using the levenshtein distance.
const filteredCities: CityFormatted[] = cities
  .filter((city) => city.population >= 10000)
  .map((city) => ({ ...city, formattedName: formatCityName(city.name) }));

const findBestCity = (name: string): BestCity => {
  const formattedName = formatCityName(name);

  return filteredCities.reduce<BestCity>(
    (bestCity, city) => {
      // It’s important to take the population into account,
      // as 'Paris' for example exist in multiple places.
      // Without further information, we assume the user is
      // talking about the biggest one.
      // However we don’t want either to give too much importance
      // to the population as it could completly overlap the score
      // for huge cities (like Shanghai).
      // We could also remove the homonym in some preprocessing,
      // to always keep the biggest city, however in the future
      // we could add the possibility to specify the country of your
      // city (with a syntax like 'new york usa paris france')
      // so it seems more future-proof to take the population into
      // account only here.
      const score =
        distance(formattedName, city.formattedName) -
        city.population / 50_000_000;
      if (score < bestCity.score) {
        return {
          score,
          city,
        };
      }

      return bestCity;
    },
    { city: filteredCities[0], score: Infinity }
  );
};

const findCities = (
  query: string
): { cities: [City, City]; score: number } | undefined => {
  // Our query is something like "san fransisco new york"
  // There can be only two cities, one at the start, and
  // one at the end.
  // All the magic is to split the string at the right place.
  // Which space separate the two cities.
  // This is what this function is doing.

  const words = query.split(" ");
  const wordsCount = words.length;

  if (wordsCount < 2) {
    return;
  }

  let bestScore = Infinity;
  let bestCities;

  for (let i = 1; i < wordsCount; i += 1) {
    const firstWord = words.slice(0, i).join(" ");
    const secondWord = words.slice(i, wordsCount).join(" ");

    const firstCity = findBestCity(firstWord);
    const secondCity = findBestCity(secondWord);

    const score = firstCity.score + secondCity.score;
    if (score < bestScore) {
      bestScore = score;
      bestCities = [firstCity.city, secondCity.city];
    }
  }

  return { cities: bestCities as any as [City, City], score: bestScore };
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const getDistanceFromLatLonInKm = (
  [lon1, lat1]: LngLat,
  [lon2, lat2]: LngLat
) => {
  // https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const CO2EQ_FLIGHT_SOURCES = ["https://www.carbonindependent.org/22.html"];
const CO2EQ_KG_PER_KM_FLIGHT = 0.158;

export const searchTrips = (query: string): TripWithScore[] => {
  const citiesResult = findCities(query);
  if (!citiesResult) {
    return [];
  }

  const {
    cities: [origin, destination],
    score,
  } = citiesResult;

  const distanceInKm = getDistanceFromLatLonInKm(
    origin.loc.coordinates,
    destination.loc.coordinates
  );

  const carbonInKg = distanceInKm * CO2EQ_KG_PER_KM_FLIGHT;

  const trip = Trip.build({
    origin: {
      name: origin.name,
      country: origin.country,
    },
    destination: {
      name: destination.name,
      country: destination.country,
    },
    distanceInKm: distanceInKm,
    transports: [
      Transport.build({
        type: "flight",
        co2Eq: Co2Eq.build({
          averageValue: carbonInKg,
          unit: Co2EqUnit.KILOGRAM,
        }),
        explanation: {
          sources: CO2EQ_FLIGHT_SOURCES,
          co2EqPerKm: Co2Eq.build({
            averageValue: CO2EQ_KG_PER_KM_FLIGHT,
            unit: Co2EqUnit.KILOGRAM,
          }),
        },
      }),
    ],
  });

  return [
    {
      trip,
      score,
    },
  ];
};
