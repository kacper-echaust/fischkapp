import React from "react";
import styles from "./DisplayCard.module.css";

type DisplayCardProps = {
  value: string;
};
const DisplayCard = ({ value }: DisplayCardProps) => {
  return (
    <div className={styles.container}>
      <p>{value}</p>
    </div>
  );
};

export { DisplayCard };
