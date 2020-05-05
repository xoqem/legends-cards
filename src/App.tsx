import styles from './App.module.css';
import React from 'react';
import Cards from './components/Cards';
import FilterProvider from './providers/FilterProvider';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <FilterProvider>
      <div className={styles.app}>
        <Header />
        <Cards />
      </div>
    </FilterProvider>
  );
}

export default App;
