import React, { useState } from 'react';

interface FilterContextProps {
  search: string;
  setSearch: (value: string) => void;
}

interface FilterProviderProps {
  children: JSX.Element;
}

export const FilterContext = React.createContext<FilterContextProps>({
  search: '',
  setSearch: () => {}
});

const FilterProvider: React.FC<FilterProviderProps> = props => 
{
  const { children } = props;

  const [search, setSearch] = useState<string>('');

  return (
    <FilterContext.Provider value={{
      search,
      setSearch,
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
