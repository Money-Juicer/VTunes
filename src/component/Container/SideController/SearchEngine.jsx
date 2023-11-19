import React, { useState, useEffect} from "react";
import styles from "../../../styles/SearchEngine.module.css";
import search from '../../../assets/base/search.png';
import plMenu from '../../../assets/base/playlist_menu.png';
import searchHover from '../../../assets/hover/search.png';
import plMenuHover from '../../../assets/hover/playlist_menu.png';
import searchClick from '../../../assets/onClick/search.png';
import plMenuClick from '../../../assets/onClick/playlist_menu.png';

const SearchEngine = ({ isPlMenuClick, onPlMenuClick, userInput, onUserInput, isCurrentPlaylistViewed, onIsCurrentPlaylistViewed}) => {
  const [imgSearchClick, setImgSearchClick] = useState(false);
  const [imgPlMenuClick, setImgPlMenuClick] = useState(false);
  const [imgSearchHover, setImgSearchHover] = useState(false);
  const [imgPlMenuHover, setImgPlMenuHover] = useState(false);
  
  const searchImage = imgSearchClick ? searchClick : imgSearchHover ? searchHover : search;
  const plMenuImage = imgPlMenuClick ? plMenuClick : imgPlMenuHover ? plMenuHover : plMenu;

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    onUserInput(inputText);
  };

  useEffect(() => {
    if(isPlMenuClick){//isPlMenuClick하면 userInput을 reset시킴
      onUserInput("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlMenuClick]);
  useEffect(()=>{
    onUserInput("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isCurrentPlaylistViewed]);

  return (
    <div className={styles["search-engine-wrapper"]}>
      <div className={styles["search-engine-area"]}>
          <div className={styles["search-engine"]}>
          <input
            type="text"
            placeholder="            Search Music in Playlist"
            value={userInput}
            onChange={handleInputChange}
          />
          {!userInput && (
            <div className={styles["search-icon"]}>
              <img
                src={searchImage}
                alt="search"
                onClick={() => {
                  setImgSearchClick(prev=>!prev);
                  setTimeout(() => setImgSearchClick(false), 200);
                }}
                onMouseEnter={() => setImgSearchHover(true)}
                onMouseLeave={() => setImgSearchHover(false)}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles["playlist-menu"]} onClick={onPlMenuClick}>
        <img
          src={plMenuImage}
          alt="playlistMenu"
          onClick={() => {
            setImgPlMenuClick(true);
            setTimeout(() => setImgPlMenuClick(false), 100);
            onIsCurrentPlaylistViewed(false);//플레이리스트 목록을 보려고 하면 현재재생목록이 안보이게함
          }}
          onMouseEnter={() => setImgPlMenuHover(true)}
          onMouseLeave={() => setImgPlMenuHover(false)}
        />
      </div>
    </div>
  );
};

export default SearchEngine;
