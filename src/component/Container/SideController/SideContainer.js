import React from "react";
import styles from "../../../styles/SideContainer.module.css";
import SideContainerHeader from "./SideContainer/SideContainerHeader";
import SideContainerContents from "./SideContainer/SideContainerContents";
import SideContainerFooter from "./SideContainer/SideContainerFooter";

const SideContainer = ({currentPlaylist, currentMusic, onCurrentPlaylist, onCurrentMusic, 
    isDeleteClick, onIsDeleteClick, isSearch, searchResult}) =>{
  return (
    <div className={styles["side-container"]}>
      <SideContainerHeader currentPlaylist={currentPlaylist} />
      <SideContainerContents 
        currentPlaylist={currentPlaylist} 
        currentMusic={currentMusic} 
        onCurrentPlaylist={onCurrentPlaylist}
        onCurrentMusic={onCurrentMusic}
        
        isDeleteClick={isDeleteClick}
        isSearch = {isSearch}
        searchResult={searchResult}
      />
      <SideContainerFooter currentPlaylist={currentPlaylist} onCurrentPlaylist={onCurrentPlaylist} onIsDeleteClick={onIsDeleteClick}/>
    </div>
  );
};

export default SideContainer;