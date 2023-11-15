import React, { useEffect, useState } from "react";
import styles from "../../styles/SideController.module.css";
import SearchEngine from "./SideController/SearchEngine";
import PlaylistSet from "./SideController/PlaylistSet";

import SideContainerContainer from "../../containers/SideContainerContainer";

const SideController = () =>{
  const [searchResult, setSearchResult] = useState({musics:[]});
  const [isSearch, setIsSearch] = useState(false);
  const [isPlaylistMenuClick, setIsPlaylistMenuClick] = useState(false);
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState({musics:[]});//contents에 보여질 선택된 플레이리스트(현재 재생과 무관)
  
  useEffect(()=>{//selectedPlaylist가 바뀌면 해당 플레이리스트의 음악 목록(SideContainerContents)을 보여줌
    setIsPlaylistMenuClick(false);
  },[selectedPlaylist])

  useEffect(()=>{//playlist menu 클릭하면 검색결과와 isDeleteClick reset
    if(isDeleteClick){
      setIsDeleteClick(false);
    }
    if(isSearch){
      setIsSearch(false);
      setSearchResult({musics:[]});
    }
  },[isPlaylistMenuClick])
  
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
  const handleSelectedPlaylist = (playlist) =>{
    setSelectedPlaylist(playlist);
  }

  return (
    <div className={styles["side-controller"]}>
      <SearchEngine
        isPlMenuClick = {isPlaylistMenuClick}
        onPlMenuClick = {handleIsPlaylistMenuClick} 
        onIsSearch = {handleIsSearch}
        onSearchResult = {handleSearchResult} 
        selectedPlaylist={selectedPlaylist}
      />
      {isPlaylistMenuClick && (
          <PlaylistSet onSelectedPlaylist={handleSelectedPlaylist}/>
      )}
      <SideContainerContainer 
        isDeleteClick= {isDeleteClick} 
        onIsDeleteClick={handleIsDeleteClick} 
        isSearch={isSearch}
        searchResult={searchResult}
        selectedPlaylist = {selectedPlaylist}
      />
    </div>
  );
};

export default SideController;