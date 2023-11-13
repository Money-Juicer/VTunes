import React,{useState} from "react";
import styles from "../../../styles/PlaylistSet.module.css";
import ScrollList from "../../common/ScrollList/ScrollList";

const PlaylistSet = ({}) => {
  const [isDeleteClick, setIsDeleteClick] = useState(false);
  const [isAddClick, setIsAddClick] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [deleteChosenPl, setDeleteChosenPl] = useState(-1);

  const handleDeleteClick = ()=>{
    setIsDeleteClick(prev=>!prev);
  }
  const handleAddClick = () =>{
    setIsAddClick(prev=>!prev);
  }
  const handleDeleteChosenPl = (plId) =>{
    setDeleteChosenPl(plId);
    console.log("삭제클릭:"+plId);
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

  const playlistSet = {//임시 테스트용
    playlists: [
      {
        pid: 0,
        numberOfMusic: 2,
        playlistName: "음잘알김영현의플레이리스트",
        listOfMusic: 
        [
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
            musicName: "아뤼스트2",
            lyrics: "는 인생이 예술이어야 한다2",
            artist: "김영현2",
            albumTitle: "음잘알 앨범2",
            duration: "2:23",
            sourceOfPath: "/images/baby.jpg",
          },
        ],
      },
      {
        pid: 1,
        numberOfMusic: 3,
        playlistName: "음악의신김영현찬양하라",
        listOfMusic:
        [
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
            musicName: "아뤼스트2",
            lyrics: "는 인생이 예술이어야 한다2",
            artist: "김영현2",
            albumTitle: "음잘알 앨범2",
            duration: "2:23",
            sourceOfPath: "/images/baby.jpg",
          },        
          {
            musicId: 2,
            musicName: "아뤼스트2",
            lyrics: "는 인생이 예술이어야 한다2",
            artist: "김영현2",
            albumTitle: "음잘알 앨범2",
            duration: "2:23",
            sourceOfPath: "/images/baby.jpg",
          },
        ]
      }
    ],
  };

  return (

    <div className={styles["playlist-set-wrapper"]}>
      {isAddClick&&(//new playlist클릭시 뜨는 창 : adder-modal
        <div className={styles["adder-modal"]}>
          <span>New Playlist</span>
          <div className={styles["search-engine"]}>
            <input
              type="text"
              placeholder=""
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={styles["adder-modal-button-area"]}>
            <button className={styles["confirm-button"]}>Confirm</button>
            <button className={styles["cancel-button"]}>Cancel</button>
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
        {playlistSet.playlists.map((playlist) => (
          <div className={styles["playlist-wrapper"]}>
            <div className={styles["delete-button-area"]}>
              {isDeleteClick&&(
                <button onClick={()=>handleDeleteChosenPl(playlist.pid)}>삭제</button>
              )}
            </div>
            <div className={styles["playlist-info"]}>
              <div className={styles["name"]}>
                {playlist.playlistName}
              </div>
              <div className={styles["songs-count"]}>
                {playlist.numberOfMusic}ㆍSongs
              </div>
            </div>
            <div className={styles["view-playlist"]}>
              화살표
            </div>
          </div>
        ))}
        </ScrollList>
      </div>


    </div>
  );
};

export default PlaylistSet;
