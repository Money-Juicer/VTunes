import React from "react";
import styles from "../../../../styles/SideContainerContents.module.css";

const SideContainerContents = ({currentPlaylist, currentMusic, onCurrentPlaylist, onCurrentMusic}) =>{
  return (
    <div className={styles["side-container-contents"]}>
      <div className={styles["music-wrapper"]}>
        <div>
          앨범 이미지
        </div>
        <div>
          곡제목+artist
        </div>
        <div>
          duration
        </div>
      </div>
    </div>
  );
};

export default SideContainerContents;