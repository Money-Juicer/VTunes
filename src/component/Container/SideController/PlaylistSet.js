import React from "react";
import styles from "../../../styles/PlaylistSet.module.css";

const PlaylistSet = () =>{
  const buttonStyle = {
    fontSize: '20px',
    height: '70%',
    width: '35%',
  }
  return (
    <div className={styles["playlist-set-wrapper"]}>
      <div className={styles["playlist-adder"]}>
        <button style={buttonStyle}>New Playlist</button>
        <button style={buttonStyle}>Delete Playlist</button>
      </div>
      <div className={styles["playlist-set"]}>
        pl 목록
      </div>
    </div>
  );
};

export default PlaylistSet;