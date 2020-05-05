import styles from './Cards.module.css';
import { CardObj, CardsResponse } from '../interfaces/cards';
import _ from 'lodash';
import queryString from 'query-string';
import React, { useState, useContext, useEffect, useRef } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import Card from './Card';
import { FilterContext } from '../providers/FilterProvider';

const CARDS_URL = 'https://api.elderscrollslegends.io/v1/cards';

const Cards: React.FC = () => {
  const filtersContext = useContext(FilterContext);
  const { search } = filtersContext;

  const [loading, setLoading] = useState<boolean>(false);
  const [cards, setCards] = useState<CardObj[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const pageRef = useRef<number>(1);

  async function fetchCards() {
    setLoading(true);

    const params = queryString.stringify({
      page: pageRef.current,
      pageSize: 20,
      ...search && { name: search }
    });
 
    try {
      const response = await fetch(`${CARDS_URL}?${params}`)
      const responseObj: CardsResponse = await response.json();
      const newCards = _.get(responseObj, 'cards');

      setCards(pageRef.current > 1 ? cards.concat(newCards) : newCards);

      // The cards response has a next link if there are more items to fetch
      setHasMore(Boolean(_.get(responseObj, ['_links', 'next'])));
    } catch (error) {
      // TODO: show error
      setCards([]);
      setHasMore(false);
    }

    setLoading(false);
  }

  useEffect(() => {
    pageRef.current = 1;
    fetchCards();
  }, [search]);

  const cardComponents = cards.map(card => <Card card={card} key={card.id} />)

  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {cardComponents}
      </div>
      {hasMore && !loading && (
        <VisibilitySensor onChange={isVisible  => {
          if (isVisible && !loading) {
            pageRef.current = pageRef.current + 1;
            fetchCards();
          }
        }}>
          <div className={styles.visibilitySensor}>
            Sensor
          </div>
        </VisibilitySensor>
      )}
      {(loading || hasMore) && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
        </div>
      )}
    </div>
  );
}

export default Cards;
