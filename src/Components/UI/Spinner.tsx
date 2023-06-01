import React from "react";
import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles["spinner"]}>
      <div className={styles["spinner-inner"]} />
    </div>
  );
}

export default Spinner;
