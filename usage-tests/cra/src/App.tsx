import { howMuch, HowMuchResult } from "@howmuchgreen/howmuchcarbon";
import { useState } from "react";
import styled from "styled-components";
import "./App.css";

const App = () => {
  const [queryString, setQueryString] = useState("");
  const results = howMuch(queryString);

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
