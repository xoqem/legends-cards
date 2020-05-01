import _ from 'lodash';
import queryString from 'query-string';
import React, { useEffect, useState, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const CARDS_URL = 'https://api.elderscrollslegends.io/v1/cards';

interface CardSet {
  id: string;
  name: string;
  _self: string;
}

interface Card {
  attributes: string[];
  collectible: boolean;
  cost: number;
  id: string;
  imageUrl: string;
  name: string;
  rarity: string;
  set: CardSet;
  text: string;
  type: string;
  unique: boolean;
}

const PAGE_SIZE = 100;

const Cards: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const getDivWidth = () => _.get(divRef.current, 'offsetWidth', 0);
  const getDivHeight = () => _.get(divRef.current, 'offsetHeight', 0);
  const getDivScrollTop = () => _.get(divRef.current, 'scrollTop', 0);
console.log('getDivScrollTop', getDivScrollTop());
  const [cards, setCards] = useState<Card[]>([]);
  const [srollTop, setScrollTop] = useState<number>(getDivScrollTop());
  const [width, setWidth] = useState<number>(getDivWidth());
  const [height, setHeight] = useState<number>(getDivHeight());

  async function fetchCards() {
    const params = queryString.stringify({
      page: 1,
      pageSize: 5,
    });
    const response = await fetch(`${CARDS_URL}?${params}`)
    const responseJson = await response.json();
    const newCards = _.get(responseJson, 'cards');
    console.log('newCards', newCards);
    setCards(cards.concat(newCards));
  }

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {

  });

  const onScroll = _.debounce(() => {
    console.log('onScroll', getDivScrollTop());
  }, 500);

  return (
      <div onScroll={onScroll} ref={divRef}>
        Cards Length: {cards.length}
        test<br/>
      </div>
  );
}

export default Cards;
