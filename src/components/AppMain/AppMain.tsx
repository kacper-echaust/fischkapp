import React, { useContext } from "react";
import { CardContext } from "../Context/CardListProvider";
import { NewCard } from "./NewCard/NewCard";
import { DisplayCard } from "./DisplayCard/DisplayCard";

const AppMain = () => {
  const { isAddingNewCard, cardList } = useContext(CardContext);
  const displayCardList = cardList.map((card) => {
    return <DisplayCard value={card.title} />;
  });
  return <main>{isAddingNewCard ? <NewCard /> : displayCardList}</main>;
};

export { AppMain };
