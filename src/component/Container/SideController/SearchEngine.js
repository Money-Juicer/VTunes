import React, {useState} from "react";
import styles from "../../../styles/SearchEngine.module.css";

const SearchEngine = ({isPlMenuClick, onPlMenuClick, searchResult}) =>{
  const [userInput, setUserInput] = useState("");
  
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      //input에 enter쳐도 실행되게 할건데 아직 구현x
    }
  };
  
  return (
    <div className={styles["search-engine-wrapper"]}>
      <div className={styles["search-engine-area"]}>
      {!isPlMenuClick && (
          <>
            <input
              className={styles["search-engine"]}
              type="text"
              placeholder="            Search Music in Playlist"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {!userInput && (
              <img
                className={styles["search-icon"]}
                src={process.env.PUBLIC_URL + "/images/search.png"}
                alt="search"
              />
            )}
          </>
        )}
      </div>
      <div className={styles["playlist-menu"]} onClick={onPlMenuClick}>
        <img 
        src={process.env.PUBLIC_URL +(isPlMenuClick ? "/images/playlist_menu.png" : "/images/playlist_menu.png")}
        alt="playlistMenu"
        />
      </div>
    </div>
  );
};

export default SearchEngine;