import styles from './Card.module.css';
import _ from 'lodash';
import React from 'react';
import { CardObj } from '../interfaces/cards';

interface CardProps {
  card: CardObj;
}

const Card: React.FC<CardProps> = props => {
  const { card } = props;
  if (!card) return null;

  function getCardProperty(title: string, value: string) {
    return (
      <div className={styles.property}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value || `(No ${title})`}</div>
      </div>
    )
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} alt={`${card.name} card`} src={card.imageUrl} />
      </div>
      <div className={styles.properties}>
        {getCardProperty('Name', card.name)}
        {getCardProperty('Text', card.text)}
        {getCardProperty('Set Name', _.get(card.set, 'name'))}
        {getCardProperty('Type', card.type)}
      </div>
    </div>
  );
}

export default Card;
