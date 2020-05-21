import styles from './Header.module.css';
import React, { useContext } from 'react';
import { FilterContext } from '../providers/FilterProvider';

const Header: React.FC = () => {
  const { search, setSearch } = useContext(FilterContext);

  return (    
    <header className={styles.Header}>
      <div>
        <div className={styles.title}>Elder Scross: Legends™</div>
        <div className={styles.subTitle}>Card Database</div>
      </div>
      <div className={styles.filters}>
        <input
          className={styles.searchInput}
          onChange={event => setSearch(event.target.value)}
          placeholder="Search"
          value={search}
        />
      </div>
    </header>
  );
}

export default Header;
