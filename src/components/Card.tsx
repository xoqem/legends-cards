import _ from 'lodash';
import React from 'react';
import { CardObj } from '../interfaces/cards';

interface CardProps {
  card: CardObj;
}

const Card: React.FC<CardProps> = props => {
  const { card } = props;
  if (!card) return null;

  return (
    <div>
      <img alt={card.name} src={card.imageUrl} />
      <div>
        Name: {card.name}
      </div>
      <div>
        Text: {card.text}
      </div>
      <div>
        Set Name: {_.get(card.set, 'name')}
      </div>
      <div>
        Type: {card.type}
      </div>
    </div>
  );
}

export default Card;
