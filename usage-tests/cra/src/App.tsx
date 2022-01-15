import { howMuch } from "howmuchcarbon";
import { useMemo, useState } from "react";
import styled from "styled-components";
import "./App.css";

const App = () => {
  const [queryString, setQueryString] = useState("");
  const results = howMuch(queryString);

  return (
    <AppContainer>
      <SearchInput onChange={(e) => setQueryString(e.target.value)} />
      <ResultsList>
        {results.results.map(({ name, co2Eq, source }, i) => {
          return (
            <ResultsListElement key={i}>
              <span>{name}</span>
              <span>
                <b>
                  {source ? (
                    <a href={source}>{co2Eq.format()}</a>
                  ) : (
                    co2Eq.format()
                  )}
                </b>
              </span>
            </ResultsListElement>
          );
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
