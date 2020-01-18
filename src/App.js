import React from 'react';
import './App.css';
import data from './data/page.json';
import Form from '../src/Form';
import Content from '../src/Content';
import Slider from '../src/Slider';

function App() {
  const { components, form } = data;
  const gridComponent = components.find(({ type }) => type === 'GridComponent');
  return (
    <div className="App">
        <Content props={gridComponent} />
        <Form fields={form.fields} button={form.submit_button} />
        <Slider />
    </div>
  );
}

export default App;
