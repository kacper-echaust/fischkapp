import { createContext, useState } from "react";
import React from "react";
import { Card } from "../types";

type CardContextType = {
  cardList: Card[];
  setCardList: React.Dispatch<React.SetStateAction<Card[]>>;
  isAddingNewCard: boolean;
  setIsAddingNewCard: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddCard: () => void;
};
const defaultState = [{ title: "", value: "" }];
const defaultContext: CardContextType = {
  cardList: defaultState,
  setCardList: () => {},
  isAddingNewCard: false,
  setIsAddingNewCard: () => {},
  handleAddCard: () => {},
};

const CardContext = createContext<CardContextType>(defaultContext);

const CardListProvider = ({ children }) => {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [isAddingNewCard, setIsAddingNewCard] = useState(false);

  const handleAddCard = () => {
    setIsAddingNewCard(true);
  };
  return (
    <CardContext.Provider
      value={{
        cardList,
        setCardList,
        isAddingNewCard,
        setIsAddingNewCard,
        handleAddCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
export { CardListProvider, CardContext };
