import styles from './App.module.css';
import React from 'react';
import Cards from './components/Cards';

function App() {
  return (
    <div>
      <header className={styles.Header}>
        Elder Scrolls Legends - Card Database
      </header>
      <Cards />
    </div>
  );
}

export default App;
