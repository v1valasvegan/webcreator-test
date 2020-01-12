import React from 'react';
import './App.css';
import data from './data/page.json';

function App() {
  console.log(Object.keys(data));
  return (
    <div className="App">
        {Object.entries(data).map(([key, value]) => <span>{`${key}: ${value}`}</span>)}
    </div>
  );
}

export default App;
