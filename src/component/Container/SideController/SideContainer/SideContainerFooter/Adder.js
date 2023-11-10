import React from "react";
import styles from "../../../../../styles/Adder.module.css";

const Adder = () =>{
  return (
    <div className={styles["adder-wrapper"]}>
      <div className={styles["button-area"]}>
        <div className={styles["adder"]}>
          <img 
          src={process.env.PUBLIC_URL + "/images/adder.png"}
          alt="adder"
          />
        </div>
        <div className={styles["remover"]}>
          <img 
          src={process.env.PUBLIC_URL + "/images/remover.png"}
          alt="remover"
          />
        </div>
      </div>
    </div>
  );
};

export default Adder;