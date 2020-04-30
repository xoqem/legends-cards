import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Cards } from './components/cards';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Cards />
    </div>
  );
}

export default App;
