import React, { useState } from "react";
import styles from "../../styles/SideController.module.css";
import SearchEngine from "./SideController/SearchEngine";
import PlaylistSet from "./SideController/PlaylistSet";

import SideContainerContainer from "../../containers/SideContainerContainer";

const SideController = () =>{
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isPlaylistMenuClick, setIsPlaylistMenuClick] = useState(false);
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  
  const handleIsDeleteClick = () =>{
    setIsDeleteClick(prev=>!prev);
  }
  const handleIsPlaylistMenuClick = () =>{
    setIsPlaylistMenuClick(prev=>!prev);
  }

  return (
    <div className={styles["side-controller"]}>
      <SearchEngine 
        isPlMenuClick = {isPlaylistMenuClick} 
        onPlMenuClick = {handleIsPlaylistMenuClick} 
        searchResult = {searchResult} 
      />
      {!isPlaylistMenuClick ? (
          <SideContainerContainer isDeleteClick= {isDeleteClick} onIsDeleteClick={handleIsDeleteClick}/>
        ):(
          <PlaylistSet />
        )}
    </div>
  );
};

export default SideController;