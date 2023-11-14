import React, { useState } from "react";
import styles from "../../styles/SideController.module.css";
import SearchEngineContainer from "../../containers/SearchEngineContainer";
import PlaylistSet from "./SideController/PlaylistSet";

import SideContainerContainer from "../../containers/SideContainerContainer";

const SideController = () =>{
  const [searchResult, setSearchResult] = useState({musics:[]});
  const [isSearch, setIsSearch] = useState(false);
  const [isPlaylistMenuClick, setIsPlaylistMenuClick] = useState(false);
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  
  const handleIsDeleteClick = () =>{
    setIsDeleteClick(prev=>!prev);
  }
  const handleIsPlaylistMenuClick = () =>{
    setIsPlaylistMenuClick(prev=>!prev);
  }
  const handleSearchResult = (result) => {
    setSearchResult(result);
  }
  const handleIsSearch = (flag)=>{
    setIsSearch(flag);
  }

  return (
    <div className={styles["side-controller"]}>
      <SearchEngineContainer
        onPlMenuClick = {handleIsPlaylistMenuClick} 
        onIsSearch = {handleIsSearch}
        onSearchResult = {handleSearchResult} 
      />
      {isPlaylistMenuClick && (
          <PlaylistSet />
      )}
      <SideContainerContainer 
        isDeleteClick= {isDeleteClick} 
        onIsDeleteClick={handleIsDeleteClick} 
        isSearch={isSearch}
        searchResult={searchResult}
      />
    </div>
  );
};

export default SideController;