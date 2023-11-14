import React, {useState} from "react";
import ScrollList from "../../../common/ScrollList/ScrollList";
import styles from "../../../../styles/SideContainerContents.module.css";
import { useSelector } from "react-redux";

const SideContainerContents = ({ currentPlaylist, currentMusic, onCurrentPlaylist, onCurrentMusic, isDeleteClick, isSearch, searchResult}) => {
  const [deleteChosenMusic, setDeleteChosenMusic] = useState(-1);

  const handleDeleteChosenMusic = (musicId) =>{
    setDeleteChosenMusic(musicId);
    console.log("삭제클릭:"+musicId);
  }
  
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

  //리액트에서 state나 props가 변경되면 재렌더링 : 검색엔진에서 userInput이 존재할경우 searchResult아니면 currentPlaylist
  const isNoSearchResult = isSearch && !searchResult.musics.length;
  const isSearchResultExist = isSearch && searchResult.musics.length;
  const playlistToRender = isSearchResultExist ? searchResult : curPlaylist;
  
  return (
    <div className={styles["side-container-contents"]}>
      <ScrollList>
        {
          isNoSearchResult&&(
            <div className={styles["music-wrapper"]}>
             <span style={{width: '100%', height:'100%', fontSize:'20px'}}> No Results Found (｡•́︿•̀｡) </span>
            </div>
          )
        }
        {!isNoSearchResult && playlistToRender.musics.map((musicData) => (
          <div key={musicData.musicId} className={styles["music-wrapper"]}>
            <div className={styles["delete-button-area"]}>
              {isDeleteClick&&(
                <button onClick={()=>handleDeleteChosenMusic(musicData.musicId)}>삭제</button>
              )}
            </div>
            <div className={styles["music-album"]}>
              <img src={musicData.sourceOfPath} alt="앨범 이미지" />
            </div>
            <div className={styles["music-info"]}>
              <div className={styles["name"]}>
                <span>{musicData.musicName}</span>
              </div>
              <div className={styles["artist"]}>
                <span>{musicData.artist}</span>
              </div>
            </div>
            <div className={styles["music-duration"]}>
              <span>{musicData.duration}</span>
            </div>
          </div>
        ))}
      </ScrollList>
    </div>
  );
};

export default SideContainerContents;
