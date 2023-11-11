import React from "react";
import styles from "../../../../../styles/Adder.module.css";
import adder from "../../../../../assets/images/adder.png";
import remover from "../../../../../assets/images/remover.png";


const Adder = ({onIsDeleteClick}) =>{
  return (
    <div className={styles["adder-wrapper"]}>
      <div className={styles["button-area"]}>
        <div className={styles["adder"]}>
          <img 
          src={adder}
          alt="adder"
          />
        </div>
        <div className={styles["remover"]}>
          <img 
          src={remover}
          alt="remover"
          onClick={onIsDeleteClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Adder;