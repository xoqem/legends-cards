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
            <span>
              Search:
              <input
                className={styles.searchInput}
                onChange={event => setSearch(event.target.value)}
                value={search}
              />
            </span>
          )}
        </FilterContext.Consumer>
      </div>
    </header>
  );
}

export default Header;
