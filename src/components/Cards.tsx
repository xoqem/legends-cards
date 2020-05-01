import { CardObj, CardsResponse } from '../interfaces/cards';
import _ from 'lodash';
import queryString from 'query-string';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Card from './Card';

const CARDS_URL = 'https://api.elderscrollslegends.io/v1/cards';

const Cards: React.FC = () => {
  // For a project of this size using state seems ok, if it becomes more complex, moving to context or a proper state
  // management solution like Redux or Mobx may be a good idea.
  const [cards, setCards] = useState<CardObj[]>([]);
  const [hasMore , setHasMore] = useState<boolean>(true);

  async function fetchCards(page: number) {
    const params = queryString.stringify({
      page,
      pageSize: 20,
    });
 
    const response = await fetch(`${CARDS_URL}?${params}`)
    const responseObj: CardsResponse = await response.json();
    const newCards = _.get(responseObj, 'cards');

    setCards(cards.concat(newCards));

    // The cards response has a next link if there are more items to fetch
    setHasMore(Boolean(_.get(responseObj, ['_links', 'next'])));
  }

  const cardComponents = cards.map(card => <Card card={card} key={card.id} />)

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchCards}
      hasMore={hasMore}
      loader={<div key={0}>Loading ...</div>}
    >
      {cardComponents}
    </InfiniteScroll>
  );
}

export default Cards;
