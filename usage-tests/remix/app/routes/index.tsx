import {
  HowMuch,
  HowMuchResult,
  ALL_THINGS,
  CITIES_ABOVE_10_000,
  CityProto,
  Thing,
} from "@howmuchgreen/howmuchcarbon";
import styled from "styled-components";
import { useState } from "react";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { flow } from "fp-ts/function";
import * as Either from "fp-ts/Either";

export const loader: LoaderFunction = async () => {
  return {
    cities: CITIES_ABOVE_10_000(),
    things: ALL_THINGS(),
  };
};

export default function Index() {
  const { cities, things } = useLoaderData();

  const decodedCities = cities.map(CityProto.fromJSON);
  const decodedThings = things.map(
    flow(
      Thing.codec.decode,
      Either.getOrElseW(() => null)
    )
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <SearchComponent
        cities={decodedCities}
        things={decodedThings}
      ></SearchComponent>
    </div>
  );
}

const SearchComponent = ({
  cities,
  things,
}: {
  cities: CityProto[];
  things: Thing[];
}) => {
  const [queryString, setQueryString] = useState("");
  const results = new HowMuch({
    cities: () => cities,
  }).search(queryString);
  return (
    <>
      <SearchInput
        onChange={(e) => setQueryString(e.target.value)}
        data-testid={"search-input"}
      />
      <ResultsList>
        {results.results.map((thingOrTrip, i) => {
          if (HowMuchResult.isThing(thingOrTrip)) {
            const { name, co2Eq, sources } = thingOrTrip;

            return (
              <ResultsListElement key={i} data-testid="result-element">
                <span>{name}</span>
                <span>
                  <b>
                    {sources && sources[0] ? (
                      <a href={sources[0]}>{co2Eq.format()}</a>
                    ) : (
                      co2Eq.format()
                    )}
                  </b>
                </span>
              </ResultsListElement>
            );
          } else {
            const { origin, destination, distanceInKm, transports } =
              thingOrTrip;

            return (
              <ResultsListElement key={i} data-testid="result-element">
                <span>
                  {origin.name}, {origin.country} - {destination.name},
                  {destination.country}
                </span>
                <span>
                  <b>
                    {transports[0]?.co2Eq ? (
                      <a href={transports[0]?.explanation.sources[0]}>
                        {transports[0]?.co2Eq.format()}
                      </a>
                    ) : (
                      distanceInKm
                    )}
                  </b>
                </span>
              </ResultsListElement>
            );
          }
        })}
      </ResultsList>
    </>
  );
};

const SearchInput = styled.input`
  margin: 2px;
  width: 300px;
  font: 1.9em sans-serif;
`;

const ResultsList = styled.div`
  display: flex;
  justify-items: left;
  flex-direction: column;
  width: 300px;
`;

const ResultsListElement = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
`;
