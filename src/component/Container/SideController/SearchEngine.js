import React, { useState } from "react";
import styles from "../../../styles/SearchEngine.module.css";
import search from '../../../assets/images/search.png';
import plMenu from '../../../assets/images/playlist_menu.png';

const SearchEngine = ({ isPlMenuClick, onPlMenuClick, searchResult }) => {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // input에 enter쳐도 실행되게 할건데 아직 구현x
    }
  };

  return (
    <div className={styles["search-engine-wrapper"]}>
      <div className={styles["search-engine-area"]}>
          <div className={styles["search-engine"]}>
          <input
            type="text"
            placeholder="            Search Music in Playlist"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {!userInput && (
            <div className={styles["search-icon"]}>
              <img
                src={search}
                alt="search"
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles["playlist-menu"]} onClick={onPlMenuClick}>
        <img
          src={plMenu}
          alt="playlistMenu"
        />
      </div>
    </div>
  );
};

export default SearchEngine;
