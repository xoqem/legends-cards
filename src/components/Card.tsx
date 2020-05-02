import './Card.css';
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
    <div className="card">
      <div className="cardImageWrapper">
        <img className="cardImage" alt={`${card.name} card`} src={card.imageUrl} />
      </div>
      <div>
        <b>Name:</b> {card.name}
      </div>
      <div>
        <b>Text:</b> {card.text}
      </div>
      <div>
        <b>Set Name:</b> {_.get(card.set, 'name')}
      </div>
      <div>
        <b>Type:</b> {card.type}
      </div>
    </div>
  );
}

export default Card;
