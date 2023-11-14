import React, { useState, useEffect} from "react";
import styles from "../../../styles/SearchEngine.module.css";
import search from '../../../assets/images/search.png';
import plMenu from '../../../assets/images/playlist_menu.png';

const SearchEngine = ({ onPlMenuClick, onIsSearch, onSearchResult, currentPlaylist}) => {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setUserInput(inputText);
    
    // 입력값이 존재하는지 여부에 따라 onIsSearch 호출
    onIsSearch(!!inputText); // !!inputText를 사용하여 불리언 값으로 변환
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // input에 enter쳐도 실행되게 할건데 아직 구현x
    }
  };

  const filterPlaylist = () => {
    const filtered = curPlaylist.musics.filter((music) =>
      music.musicName.includes(userInput)
    );
    onSearchResult({musics: filtered}); // 필터된 배열을 콜백으로 전달
  };

  useEffect(() => {
    // userInput이 변경될 때마다 필터된 플레이리스트 업데이트
    filterPlaylist();
  }, [userInput]);

  const curPlaylist = {//임시 테스트용
    musics: [
      {
        musicId: 1,
        musicName: "아뤼스트",
        lyrics: "는 인생이 예술이어야 한다",
        artist: "김영현",
        albumTitle: "음잘알 앨범",
        duration: "2:23",
        sourceOfPath: "/images/newjeans.gif",
      },
      {
        musicId: 2,
        musicName: "는인생이",
        lyrics: "는 인생이 예술이어야 한다2",
        artist: "김영현2",
        albumTitle: "음잘알 앨범2",
        duration: "2:23",
        sourceOfPath: "/images/baby.jpg",
      },
      {
        musicId: 3,
        musicName: "예술이어야",
        lyrics: "는 인생이 예술이어야 한다",
        artist: "김영현",
        albumTitle: "음잘알 앨범",
        duration: "2:23",
        sourceOfPath: "/images/newjeans.gif",
      },
      {
        musicId: 4,
        musicName: "한다",
        lyrics: "는 인생이 예술이어야 한다2",
        artist: "김영현2",
        albumTitle: "음잘알 앨범2",
        duration: "2:23",
        sourceOfPath: "/images/newjeans.gif",
      },
      {
        musicId: 5,
        musicName: "짱영현",
        lyrics: "는 인생이 예술이어야 한다",
        artist: "김영현",
        albumTitle: "음잘알 앨범",
        duration: "2:23",
        sourceOfPath: "/images/newjeans.gif",
      },
      {
        musicId: 6,
        musicName: "신영현",
        lyrics: "는 인생이 예술이어야 한다2",
        artist: "김영현2",
        albumTitle: "음잘알 앨범2",
        duration: "2:23",
        sourceOfPath: "/images/newjeans.gif",
      },
      {
        musicId: 7,
        musicName: "갓영현",
        lyrics: "는 인생이 예술이어야 한다",
        artist: "김영현",
        albumTitle: "음잘알 앨범",
        duration: "2:23",
        sourceOfPath: "/images/newjeans.gif",
      },
      {
        musicId: 8,
        musicName: "만세",
        lyrics: "는 인생이 예술이어야 한다2",
        artist: "김영현2",
        albumTitle: "음잘알 앨범2",
        duration: "2:23",
        sourceOfPath: "/images/newjeans.gif",
      },
    ],
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
