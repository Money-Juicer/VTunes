import React, { useEffect, useState } from "react";
import { secondsToMinutes } from "../../../common/durationHelper";
import styles from "../../../../styles/SideContainerContents.module.css";
import deleter from "../../../../assets/base/deleter.png";
import deleterHover from "../../../../assets/hover/deleter.png";
import deleterClick from "../../../../assets/onClick/deleter.png";
import playing from "../../../../assets/base/playing.png";

const MusicItem = ({buttonFlag, musicData, isPlaying, playlistToRender, onDeleteMusic, onCurrent, onCurrentMusic, onIsCurrentPlaylistViewed }) => {
  const [imgDeleterClick, setImgDeleterClick] = useState(false);
  const [imgDeleterHover, setImgDeleterHover] = useState(false);

  const deleterImage = imgDeleterClick ? deleterClick : imgDeleterHover ? deleterHover : deleter;

  const handleMusicItemClick = ()=>{
    if(!buttonFlag){//deleter(-)가 보이지 않았을 때만 클릭해서 음악 재생이 가능하다
      if(playlistToRender&&playlistToRender.name === "현재재생목록"){
        onCurrentMusic(musicData);
      }else{
        onCurrent(musicData);
      }
      onIsCurrentPlaylistViewed(true);
    }
  }

  return (
    <div className={styles["music-wrapper"]} onClick={handleMusicItemClick}>
      <div className={styles["delete-button-area"]}>
        {buttonFlag&&(
          <img
            src={deleterImage}
            alt="deleter"
            onClick={() => {
              setImgDeleterClick(true);
              setTimeout(() => setImgDeleterClick(false), 100);
              onDeleteMusic(playlistToRender, musicData);//redux store에서 삭제
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
