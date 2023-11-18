import React, { useEffect, useState } from "react";
import { secondsToMinutes } from "../../../common/durationHelper";
import styles from "../../../../styles/SideContainerContents.module.css";
import deleter from "../../../../assets/base/deleter.png";
import deleterHover from "../../../../assets/hover/deleter.png";
import deleterClick from "../../../../assets/onClick/deleter.png";
import playing from "../../../../assets/base/playing.png";

const MusicItem = ({buttonFlag, musicData, isPlaying, selectedPlaylist, onDeleteMusic, onCurrent }) => {
  const [imgDeleterClick, setImgDeleterClick] = useState(false);
  const [imgDeleterHover, setImgDeleterHover] = useState(false);
  const [isMusicItemClick, setIsMusicItemClick] = useState(false);

  const deleterImage = imgDeleterClick ? deleterClick : imgDeleterHover ? deleterHover : deleter;

  const handleMusicItemClick = ()=>{
    setIsMusicItemClick(true);
    onCurrent(musicData);
  }
  return (
    <div className={styles["music-wrapper"]} onClick={()=>onCurrent(musicData)}>
      <div className={styles["delete-button-area"]}>
        {buttonFlag&&(
          <img
            src={deleterImage}
            alt="deleter"
            onClick={() => {
              setImgDeleterClick(true);
              setTimeout(() => setImgDeleterClick(false), 100);
              onDeleteMusic(selectedPlaylist, musicData);//redux store에서 삭제
            }}
            onMouseEnter={() => setImgDeleterHover(true)}
            onMouseLeave={() => setImgDeleterHover(false)}
          />
        )}
      </div>
      <div className={styles["music-album"]}>
        {isPlaying && (
          <div className={styles["overlay"]}>
            <img src={playing} alt="재생중"/>
          </div>
        )}
        <img src={musicData.album} alt="앨범 이미지"/>
      </div>
      <div className={styles["music-info"]}>
        <div className={styles["name"]}>
          <span>{musicData.name}</span>
        </div>
        <div className={styles["artist"]}>
          <span>{musicData.artist}</span>
        </div>
      </div>
      <div className={styles["music-duration"]}>
        <span>{secondsToMinutes(musicData.duration)}</span>
      </div>
    </div>
  );
};

export default MusicItem;
