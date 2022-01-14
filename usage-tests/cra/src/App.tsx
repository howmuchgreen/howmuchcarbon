import { howMuch } from "howmuchcarbon";
import React, { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [queryString, setQueryString] = useState('');
  const results = useMemo(() => howMuch(queryString), [queryString])
  console.log(results)
  return (
    <div className="App">
      <input onChange={(e) => setQueryString(e.target.value)} />
      {results.map(({ name }, i) => { return <div key={i}>{name}</div> })}

    </div>
  );
}

export default App;
