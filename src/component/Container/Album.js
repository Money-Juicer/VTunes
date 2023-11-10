import React, {useState} from "react";
import styles from "../../styles/Album.module.css";

const Album = ({currentMusic}) =>{
  const [isAlbumClick, setIsAlbumClick] = useState(false);

  const toggleIsAlbumClick = () => {
    setIsAlbumClick(prev => (!prev));
  }
  return (
    <div className={styles.album}>
      {
        isAlbumClick ? (  
          <div className={styles.lyrics} onClick = {toggleIsAlbumClick}>
            lyrics
          </div>
        ) : (
          <div className={styles["mini-album"]} onClick ={toggleIsAlbumClick}>
            mini-album
          </div>
        )
      }
    </div>
  );
};

export default Album;