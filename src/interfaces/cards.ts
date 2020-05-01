export interface CardSet {
  id: string;
  name: string;
  _self: string;
}

export interface CardObj {
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

export interface CardsResponse {
  cards: CardObj[];
  _links: {
    next: string;
  },
  _pageSize: number;
  _totalCount: number;
}
