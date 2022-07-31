import {
  HowMuch,
  HowMuchResult,
  ALL_THINGS,
} from "@howmuchgreen/howmuchcarbon";
import { CityArrayProto } from "@howmuchgreen/howmuchcarbon/cjs/data/cities/City.pb";
import { useState } from "react";
import styled from "styled-components";
import "./App.css";

const App = () => {
  const [queryString, setQueryString] = useState("");
  const cities = CityArrayProto.fromJSON({
    cities: [
      {
        name: "New York City",
        country: "US",
        population: 8175133,
        location: {
          lat: 40.73061,
          lng: -73.935242,
        },
      },
      {
        name: "Paris",
        country: "FR",
        population: 2244000,
        location: {
          lat: 48.856614,
          lng: 2.352222,
        },
      },
    ],
  }).cities;
  const results = new HowMuch({
    things: ALL_THINGS,
    cities: () => cities,
  }).search(queryString);

  return (
    <AppContainer>
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
    </AppContainer>
  );
};

const SearchInput = styled.input`
  margin: 2px;
  width: 300px;
  font: 1.9em sans-serif;
`;

const AppContainer = styled.div`
  margin: 20px;
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

export default App;
