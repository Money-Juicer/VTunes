import React from "react";
import styles from "../../../../styles/SideContainerFooter.module.css";
import TimerSetting from "./SideContainerFooter/TimerSetting";
import Adder from "./SideContainerFooter/Adder";

const SideContainerFooter = ({ isDeleteClick, onIsDeleteClick, selectedPlaylist, onAddMusic}) =>{
  return (
    <div className={styles["side-container-footer"]}>
      <Adder 
      isDeleteClick={isDeleteClick} 
      onIsDeleteClick={onIsDeleteClick} 
      selectedPlaylist = {selectedPlaylist} 
      onAddMusic={onAddMusic} 
      />
      <TimerSetting />
    </div>
  );
};

export default SideContainerFooter;