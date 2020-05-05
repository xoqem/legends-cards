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
  const prevParamsRef = useRef<string | null>(null);

  async function fetchCards() {
    const params = queryString.stringify({
      page: pageRef.current,
      pageSize: 20,
      ...search && { name: search }
    });
   
    // if the query params we are sending are for the request we just already made, do nothing and return
    if (params === prevParamsRef.current) {
      console.log('params are the same');
      return;
    }

    prevParamsRef.current = params;

    // if fetching the first page, clear the cards array while fetching, so loading indicator is at top of page
    if (pageRef.current === 1) {
      console.log('clearing cards');
      setCards([]);
    }
   
    setLoading(true);
 
    try {
      const response = await fetch(`${CARDS_URL}?${params}`)

      // make sure that the params that were requested are still the ones for the most recent request, if not then
      // we know another request was made after this one, so we can ignore the results. This will avoid race
      // conditions and other odd behavior if multiple requests are in flight at the same time.
      if (params !== prevParamsRef.current) {
        return;
      }

      const responseObj: CardsResponse = await response.json();
      const newCards = _.get(responseObj, 'cards');

      if (pageRef.current === 1) {
        setCards(newCards);
      } else {
        // if not the first page, add the new cards to the end of the old cards
        setCards(cards.concat(newCards));
      }

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
        {!loading && !cards.length && (
          <div className={styles.noResults}>No results.</div>
        )}
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
