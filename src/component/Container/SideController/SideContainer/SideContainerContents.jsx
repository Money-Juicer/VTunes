import React, {useEffect, useState} from "react";
import ScrollList from "../../../common/ScrollList/ScrollList";
import MusicItem from "./MusicItem";
import styles from "../../../../styles/SideContainerContents.module.css";
import deleter from "../../../../assets/base/deleter.png";
import deleterHover from "../../../../assets/hover/deleter.png";
import deleterClick from "../../../../assets/onClick/deleter.png";

const SideContainerContents = ({isDeleteClick, isSearch, searchResult, 
  selectedPlaylist, currentPlaylist, currentMusic, onSelectedPlaylist, onCurrentPlaylist, onCurrentMusic, onDeleteMusic
}) => {
  //리액트에서 state나 props가 변경되면 재렌더링 : 검색엔진에서 userInput이 존재할경우 searchResult아니면 currentPlaylist
  // //const isNoSearchResult = isSearch && !searchResult.musics.length;
  // //const isSearchResultExist = isSearch && searchResult.musics.length;
  // const playlistToRender = isSearchResultExist ? searchResult : selectedPlaylist;
  const isNoSearchResult = false;
  const playlistToRender = selectedPlaylist;
  
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
        {!isNoSearchResult &&
          playlistToRender.list.map((musicData, index) => (
            <div className={styles["music-wrapper"]} key = {index}>
              <MusicItem 
              buttonFlag = {isDeleteClick}  
              musicData={musicData} 
              selectedPlaylist = {selectedPlaylist} 
              onDeleteMusic={onDeleteMusic} 
              />
            </div>
          ))}
      </ScrollList>
    </div>
  );
};

export default SideContainerContents;
