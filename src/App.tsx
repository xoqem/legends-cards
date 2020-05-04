import React from 'react';
import Cards from './components/Cards';
import FilterProvider from './providers/FilterProvider';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <FilterProvider>
      <div>
        <Header />
        <Cards />
      </div>
    </FilterProvider>
  );
}

export default App;
