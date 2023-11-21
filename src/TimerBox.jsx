import React, { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import styles from "./styles/TimerBox.module.css";
import timerIcon from "./assets/base/Timer_Icon.png";



const TimerBox = ({isShowTimerBox, onShowTimerBox, onIsStartReduceTime, onRestTime }) =>{

    const handleClickTime = (input)=>{
        onRestTime(input*60);
        onIsStartReduceTime(true);
        onShowTimerBox(false);
    }
    return(
        <div className={styles["timerBox_container"]}>
            <div className={styles["timerBox_header"]}>
                <img
                    src={timerIcon}
                    alt="Timer Icon"
                />
                <span className={styles["text"]}>
                    Sleep Timer
                </span>
            </div>
            <div className={styles["timerBox_body"]}>
                <div className={styles["timer_button-area"]}>
                    <button className={styles["five-button"]} onClick={()=>handleClickTime(5)}>5 minutes</button>
                    <button className={styles["fifteen-button"]} onClick={()=>handleClickTime(15)}>15 minutes</button>
                    <button className={styles["thirty-button"]}onClick={()=>handleClickTime(30)}>30 minutes</button>
                    <button className={styles["sixty-button"]} onClick={()=>handleClickTime(60)}>60 minutes</button>
                </div>

            </div>
            <div className={styles["timerBox_footer"]}>
                <div className={styles["button-area"]}>
                    <button className={styles["cancel-button"]}
                        onClick={()=>onShowTimerBox(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );

}

export default TimerBox;
