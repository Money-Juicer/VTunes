import React, { useState } from "react";
import styles from "../../../styles/PlaylistSet.module.css";
import deleter from "../../../assets/base/deleter.png";
import deleterHover from "../../../assets/hover/deleter.png";
import deleterClick from "../../../assets/onClick/deleter.png";
import plEnter from "../../../assets/base/plEnter.png";
import plEnterHover from "../../../assets/hover/plEnter.png";
import plEnterClick from "../../../assets/hover/plEnter.png";

const PlaylistItem = ({ buttonFlag, key, playlistData, onSelectedPlaylist}) => {
  const [imgDeleterClick, setImgDeleterClick] = useState(false);
  const [imgDeleterHover, setImgDeleterHover] = useState(false);
  const [imgPlEnterClick, setImgPlEnterClick] = useState(false);
  const [imgPlEnterHover, setImgPlEnterHover] = useState(false);

  const deleterImage = imgDeleterClick ? deleterClick : imgDeleterHover ? deleterHover : deleter;
  const plEnterImage = imgPlEnterClick ? plEnterClick : imgPlEnterHover ? plEnterHover : plEnter;

  return (
    <div className={styles["playlist-wrapper"]}>
      <div className={styles["delete-button-area"]}>
      {buttonFlag&&(
          <img
            src={deleterImage}
            alt="deleter"
            onClick={() => {
              setImgDeleterClick(true);
              setTimeout(() => setImgDeleterClick(false), 200);
            }}
            onMouseEnter={() => setImgDeleterHover(true)}
            onMouseLeave={() => setImgDeleterHover(false)}
          />
      )}
      </div>
      <div className={styles["playlist-info"]}>
        <div className={styles["name"]}>{playlistData.playlistName}</div>
        <div className={styles["songs-count"]}>{playlistData.numberOfMusic}ㆍSongs</div>
      </div>
      <div className={styles["playlist-enter"]}>
        <img
            src={plEnterImage}
            alt="playlistEnter"
            onClick={() => {
              setImgPlEnterClick(true);
              setTimeout(() => setImgPlEnterClick(false), 100);
              onSelectedPlaylist(playlistData);
            }}
            onMouseEnter={() => setImgPlEnterHover(true)}
            onMouseLeave={() => setImgPlEnterHover(false)}
         />
      </div>
    </div>
  );
};

export default PlaylistItem;
