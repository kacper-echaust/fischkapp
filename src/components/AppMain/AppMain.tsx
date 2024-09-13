import React, { useContext } from "react";
import { CardContext } from "../Context/CardListProvider";
import { NewCard } from "./NewCard/NewCard";
import { DisplayCard } from "./DisplayCard/DisplayCard";
import styles from './AppMain.module.css'

const AppMain = () => {
  const { isAddingNewCard, cardList } = useContext(CardContext);
  const displayCardList = cardList.map((card) => {
    return (
      <DisplayCard
        front={card.front}
        back={card.back}
        _id={card._id}
        key={card._id}
      />
    );
  });
  return <main className={styles.main}>{isAddingNewCard ? <><NewCard />  {displayCardList}</> : displayCardList}</main>;
};

export { AppMain };
