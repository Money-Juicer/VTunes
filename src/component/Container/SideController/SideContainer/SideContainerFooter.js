import React from "react";
import styles from "../../../../styles/SideContainerFooter.module.css";
import TimerSetting from "./SideContainerFooter/TimerSetting";
import Adder from "./SideContainerFooter/Adder";

const SideContainerFooter = () =>{
  return (
    <div className={styles["side-container-footer"]}>
      <Adder />
      <TimerSetting />
    </div>
  );
};

export default SideContainerFooter;