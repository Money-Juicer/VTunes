import React, { useState } from "react";
import styles from "../../styles/SideController.module.css";
import SearchEngine from "./SideController/SearchEngine";
import PlaylistSet from "./SideController/PlaylistSet";

import SideContainerContainer from "../../containers/SideContainerContainer";
import useIconClick from "../../hooks/useIconClick";

const SideController = () =>{
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isPlaylistMenuClick, handleIsPlaylistMenuClick] = useIconClick();
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  

  return (
    <div className={styles["side-controller"]}>
      <SearchEngine 
        isPlMenuClick = {isPlaylistMenuClick} 
        onPlMenuClick = {handleIsPlaylistMenuClick} 
        searchResult = {searchResult} 
      />
      {!isPlaylistMenuClick ? (<SideContainerContainer />):(<PlaylistSet />)}
    </div>
  );
};

export default SideController;