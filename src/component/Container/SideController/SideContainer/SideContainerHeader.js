import React from "react";
import styles from "../../../../styles/SideContainerHeader.module.css";

const SideContainerHeader = ({currentPlaylist}) =>{
  return (
    <div className={styles["side-container-header"]}>
      {currentPlaylist ? (<span>{currentPlaylist.playlistName}</span> ):(<span>PLAYLIST NAME</span>)}
    </div>
  );
};

export default SideContainerHeader;