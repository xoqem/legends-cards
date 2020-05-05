import styles from './Header.module.css';
import React from 'react';
import { FilterContext } from '../providers/FilterProvider';

const Header: React.FC = () => {
  return (    
    <header className={styles.Header}>
      <div>Elder Scross: Legends - Card Database</div>
      <div className={styles.filters}>
        <FilterContext.Consumer>
          {({search, setSearch}) => (
            <input
              className={styles.searchInput}
              onChange={event => setSearch(event.target.value)}
              placeholder="Search"
              value={search}
            />
          )}
        </FilterContext.Consumer>
      </div>
    </header>
  );
}

export default Header;
