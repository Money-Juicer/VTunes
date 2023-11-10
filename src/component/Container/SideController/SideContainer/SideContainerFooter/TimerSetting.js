import React from "react";
import styles from "../../../../../styles/TimerSetting.module.css";

const TimerSetting = () =>{
  return (
    <div className={styles["timer-setting"]}>
      <div className={styles["timer"]}>
        <img 
          src={process.env.PUBLIC_URL + "/images/timer.png"}
          alt="timer"
        />
      </div>
      <div className={styles["rest-time"]}>
        <span>00:00</span>
      </div>
    </div>
  );
};

export default TimerSetting;