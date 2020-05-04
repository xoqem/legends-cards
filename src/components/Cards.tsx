import styles from './Cards.module.css';
import { CardObj, CardsResponse } from '../interfaces/cards';
import _ from 'lodash';
import queryString from 'query-string';
import React, { useState, useContext, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './Card';
import { FilterContext } from '../providers/FilterProvider';

const CARDS_URL = 'https://api.elderscrollslegends.io/v1/cards';

const Cards: React.FC = () => {
  const filtersContext = useContext(FilterContext);
  const { search } = filtersContext;

  // For a project of this size using state seems ok, if it becomes more complex, moving to context or a proper state
  // management solution like Redux or Mobx may be a good idea.
  const [cards, setCards] = useState<CardObj[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  async function fetchCards(page: number) {
    const params = queryString.stringify({
      page,
      pageSize: 20,
      ...search && { name: search }
    });
 
    const response = await fetch(`${CARDS_URL}?${params}`)
    const responseObj: CardsResponse = await response.json();
    const newCards = _.get(responseObj, 'cards');

    setCards(page > 1 ? cards.concat(newCards) : newCards);

    // The cards response has a next link if there are more items to fetch
    setHasMore(Boolean(_.get(responseObj, ['_links', 'next'])));
  }

  useEffect(() => {
    fetchCards(1);
  }, [search]);

  const cardComponents = cards.map(card => <Card card={card} key={card.id} />)

  return (
    <InfiniteScroll
      hasMore={hasMore}
      loader={<div className={styles.loading} key={0}>Loading...</div>}
      loadMore={fetchCards}
      pageStart={0}
      threshold={1000}
    >
      <div className={styles.cards}>
        {cardComponents}
      </div>
    </InfiniteScroll>
  );
}

export default Cards;
