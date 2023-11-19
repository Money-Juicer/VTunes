import {useState} from "react";
import Controller from "../domain/Controller";
import Playlist from "../domain/Playlist";
import styles from "../styles/Footer.module.css";
import MusicPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import currentPl from '../assets/base/currentPl.png';
import currentPlHover from '../assets/hover/currentPl.png';
import currentPlClick from '../assets/onClick/currentPl.png';

const ControlBar = ({
  selectedPlaylist, 
  currentPlaylist, 
  currentMusic, 
  onPrevMusic, 
  onNextMusic, 
  isCurrentPlaylistViewed, 
  onIsCurrentPlaylistViewed
}) => {
  // const [controller, setController] = useState(new Controller(new Playlist()));
  // const [curr, setCurr] = useState("local://C:\\Users\\LEE\\Downloads\\Quick Share\\1.mp3");
  // const next = () => setCurr(controller.next());
  // const prev = () => setCurr(controller.prev());
  const [imgCurrentPlClick, setImgCurrentPlClick] = useState(false);
  const [imgCurrentPlHover, setImgCurrentPlHover] = useState(false);

  const currentPlImage = imgCurrentPlClick ? currentPlClick : imgCurrentPlHover ? currentPlHover : currentPl;
  const shouldDisableClick = !selectedPlaylist.list || selectedPlaylist.list.length === 0;

  const handleClickControlBar = () =>{
    if(isCurrentPlaylistViewed) onIsCurrentPlaylistViewed(false);
    else onIsCurrentPlaylistViewed(true);
  }
  return (
    <div className={styles["footer"]} >
      <div className={styles["button-area"]}>
      {shouldDisableClick ? (
          <img
            src={currentPl}
            alt={"현재재생목록 보기"}
          />
        ) : (
          <img 
            src={currentPlImage}
            alt={"현재재생목록 보기"}
            onClick={() => {
              setImgCurrentPlClick(prev => !prev);
              setTimeout(() => setImgCurrentPlClick(false), 200);
              handleClickControlBar();
            }}
            onMouseEnter={() => setImgCurrentPlHover(true)}
            onMouseLeave={() => setImgCurrentPlHover(false)}
          />
        )}
        <button>dd</button>
      </div>
      <MusicPlayer autoPlay src={currentMusic? "local://".concat(currentMusic.path) : ""}
                   showJumpControls={false}
                   showSkipControls={true}
                   onClickPrevious={()=>onPrevMusic()}
                   onClickNext={()=>onNextMusic()}
                   onEnded={()=>onNextMusic()}
                   showFiledVolumn={true} 
                   />
    </div>
  );
};

export default ControlBar;