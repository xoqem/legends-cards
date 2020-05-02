import './App.css';
import React from 'react';
import Cards from './components/Cards';

function App() {
  return (
    <div className="App">
      <header className="AppHeader">
        Elder Scrolls Legends - Card Browser
      </header>
      <Cards />
    </div>
  );
}

export default App;
