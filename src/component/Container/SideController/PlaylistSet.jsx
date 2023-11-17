import React,{useEffect, useState} from "react";
import styles from "../../../styles/PlaylistSet.module.css";
import ScrollList from "../../common/ScrollList/ScrollList";
import PlaylistItem from "./PlaylistItem";
import Playlist from "../../../domain/Playlist";

const PlaylistSet = ({isPlMenuClick, onPlMenuClick, listOfPlaylist, onLoadAllPlaylists, onSelectedPlaylist, onAddPlaylist, onDeletePlaylist}) => {
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [isAddClick, setIsAddClick] = useState(false);
  const [userInput, setUserInput] = useState("");
  
  useEffect(()=>{
    onLoadAllPlaylists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isPlMenuClick])
  
  const handleDeleteClick = ()=>{
    setIsDeleteClick(prev=>!prev);
  }
  const handleAddClick = () =>{
    setIsAddClick(prev=>!prev);
  }
  const handleAddPlaylist = ()=>{
    setIsAddClick(false);
    onAddPlaylist(new Playlist(userInput, []));//redux store에 추가
  }
  const handleDeletePlaylist = ()=>{
    setIsDeleteClick(false);
  }
  const handleInputChange = (event) => { //adder-modal에서 입력시
    setUserInput(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // input에 enter쳐도 실행되게 할건데 아직 구현x
    }
  };

  const buttonStyle = {
    fontSize: "20px",
    height: "70%",
    width: "35%",
  };

  return (

    <div className={styles["playlist-set-wrapper"]}>
      {isAddClick&&(//new playlist클릭시 뜨는 창 : adder-modal
        <div className={styles["adder-modal"]}>
          <span>New Playlist</span>
          <div className={styles["search-engine"]}>
            <input
              type="text"
              placeholder="       Enter the name for the New Playlist :)"
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={styles["adder-modal-button-area"]}>
            <button className={styles["confirm-button"]} onClick={handleAddPlaylist}>Confirm</button>
            <button className={styles["cancel-button"]} onClick={()=>setIsAddClick(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className={styles["header"]} />{/*본문*/}
      <div className={styles["playlist-adder"]}>
        <button style={buttonStyle} onClick={handleAddClick}>New Playlist</button>
        <button style={buttonStyle} onClick={handleDeleteClick}>Delete Playlist</button>
      </div>
      <div className={styles["playlist-set"]}>
        <ScrollList>
        {listOfPlaylist&&Array.isArray(listOfPlaylist)&&listOfPlaylist.map((playlist, index) => (
          <div className={styles["playlist-wrapper"]} key={index}>
            <PlaylistItem 
            buttonFlag = {isDeleteClick} 
            playlistData={playlist} 
            onPlMenuClick={onPlMenuClick}//플레이리스트 선택하면 sideContainerContents보여주는 용도
            onSelectedPlaylist={onSelectedPlaylist}
            onDeletePlaylist={onDeletePlaylist}
            />
          </div>
        ))}
        </ScrollList>
      </div>
    </div>
  );
};

export default PlaylistSet;
