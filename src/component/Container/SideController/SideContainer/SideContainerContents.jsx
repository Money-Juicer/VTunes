import React,{useState, useEffect} from "react";
import ScrollList from "../../../common/ScrollList/ScrollList";
import MusicItem from "./MusicItem";
import styles from "../../../../styles/SideContainerContents.module.css";

const SideContainerContents = ({
  isDeleteClick,
  userInput,
  selectedPlaylist,
  currentPlaylist,
  currentMusic,
  onSelectedPlaylist,
  onCurrentPlaylist,
  onCurrentMusic,
  onDeleteMusic,
}) => {

  //뮤직 아이템을 클릭하면 해당 음악으로 현재 음악 설정 + 현재 플레이리스트 설정
  const handleCurrent = (musicData) => {
    onCurrentPlaylist(selectedPlaylist);
    onCurrentMusic(musicData);
  }

  return (
    <div className={styles["side-container-contents"]}>
      <ScrollList>
        {userInput && selectedPlaylist.list
        .filter(
          (musicData)=>
          musicData.name.includes(userInput)
          ).length === 0 ? (
          <div className={styles["music-wrapper"]}>
            <span style={{ width: "100%", height: "100%", fontSize: "20px" }}>
              No Results Found (｡•́︿•̀｡)
            </span>
          </div>
        ) : (
          selectedPlaylist.list
            .filter(
              (musicData) =>
                !userInput || musicData.name.includes(userInput)
            )
            .map((musicData, index) => (
              <div className={styles["music-wrapper"]} key={index}>
                <MusicItem
                  buttonFlag={isDeleteClick}
                  musicData={musicData}
                  isPlaying={currentMusic&&currentMusic === musicData && currentPlaylist === selectedPlaylist}
                  selectedPlaylist={selectedPlaylist}
                  onDeleteMusic={onDeleteMusic}
                  onCurrent={handleCurrent}
                />
              </div>
            ))
        )}
      </ScrollList>
    </div>
  );
};

export default SideContainerContents;
