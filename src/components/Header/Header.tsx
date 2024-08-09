import React from "react";
import styles from "./Header.module.css";
interface AppHeaderProps {
  cardsAmount: number;
}
const Header = ({ cardsAmount }: AppHeaderProps) => {
  return (
    <>
      <div className={styles.logo}>
        <img src="/Logo.png" alt="logo" />
        <p>{`Cards: ${cardsAmount}`}</p>
      </div>
      <div className={styles.circle}>
        <img src="/Icon.png" alt="plus icon" />
      </div>
    </>
  );
};

export { Header };
