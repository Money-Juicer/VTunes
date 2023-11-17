import React, { useEffect, useState } from "react";
import styles from "../../styles/SideController.module.css";

import SideContainerContainer from "../../containers/SideContainerContainer";
import SearchEngineContainer from "../../containers/SearchEngineContainer";
import PlaylistSetContainer from "../../containers/PlaylistSetContainer";

const SideController = () =>{
  const [searchResult, setSearchResult] = useState({musics:[]});
  const [isSearch, setIsSearch] = useState(false);
  const [isPlaylistMenuClick, setIsPlaylistMenuClick] = useState(false);
  const [isDeleteClick, setIsDeleteClick] = useState(false);//음악 삭제 위한 버튼 플래그
  
  const handleIsDeleteClick = () =>{
    setIsDeleteClick(prev=>!prev);
  }
  const handleIsPlaylistMenuClick = () =>{
    if(isPlaylistMenuClick&&isDeleteClick) setIsDeleteClick(false);
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
        isPlMenuClick = {isPlaylistMenuClick}
        onPlMenuClick = {handleIsPlaylistMenuClick} 
        onIsSearch = {handleIsSearch}
        onSearchResult = {handleSearchResult} 
      />
      {isPlaylistMenuClick && (
        <PlaylistSetContainer isPlMenuClick={isPlaylistMenuClick} onPlMenuClick={handleIsPlaylistMenuClick}/>
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