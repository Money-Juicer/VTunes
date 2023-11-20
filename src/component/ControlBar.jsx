import {useState} from "react";
import Controller from "../domain/Controller";
import Playlist from "../domain/Playlist";
import styles from "../styles/Footer.module.css";
import MusicPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import '../styles/ControlBar.css';
import currentPl from '../assets/base/currentPl.png';
import shuffleIcon from '../assets/base/shuffle.png';
import oneRepeat from '../assets/base/repeatOne.png';
import currentPlHover from '../assets/hover/currentPl.png';
import shuffleIconHover from '../assets/hover/shuffle.png';
import currentPlClick from '../assets/onClick/currentPl.png';
import shuffleIconClick from '../assets/onClick/shuffle.png';
import oneRepeatClick from '../assets/hover/repeatOne.png';

const ControlBar = ({
  selectedPlaylist, 
  currentPlaylist, 
  currentMusic, 
  onPrevMusic, 
  onNextMusic,
  onRepeatCurrentMusic, 
  isCurrentPlaylistViewed, 
  onIsCurrentPlaylistViewed
}) => {
  // const [controller, setController] = useState(new Controller(new Playlist()));
  // const [curr, setCurr] = useState("local://C:\\Users\\LEE\\Downloads\\Quick Share\\1.mp3");
  // const next = () => setCurr(controller.next());
  // const prev = () => setCurr(controller.prev());
  const [imgCurrentPlClick, setImgCurrentPlClick] = useState(false);
  const [imgCurrentPlHover, setImgCurrentPlHover] = useState(false);
  const [imgShuffleClick, setImgShuffleClick] = useState(false);
  const [imgShuffleHover, setImgShuffleHover] = useState(false);
  const [imgOneRepeatClick, setImgOneRepeatClick] = useState(false);

  const currentPlImage = imgCurrentPlClick ? currentPlClick : imgCurrentPlHover ? currentPlHover : currentPl;
  const shuffleIconImage = imgShuffleClick ? shuffleIconClick : imgShuffleHover ? shuffleIconHover : shuffleIcon;
  const oneRepeatImage = imgOneRepeatClick ? oneRepeatClick :  oneRepeat;
  const shouldDisableClick = !selectedPlaylist.list || selectedPlaylist.list.length === 0;

  const handleClickControlBar = () =>{
    if(isCurrentPlaylistViewed) onIsCurrentPlaylistViewed(false);
    else onIsCurrentPlaylistViewed(true);
  }
  return (
    <div className={styles["footer"]} >
      <div className={styles["button-area"]}>
          <img 
            src={oneRepeatImage}
            alt={"한곡 반복"}
            onClick={() => {
              setImgOneRepeatClick(prev => !prev);
            }}
          />
          <img 
            src={shuffleIconImage}
            alt={"셔플"}
            onClick={() => {
              setImgShuffleClick(prev => !prev);
              setTimeout(() => setImgShuffleClick(false), 200);
            }}
            onMouseEnter={() => setImgShuffleHover(true)}
            onMouseLeave={() => setImgShuffleHover(false)}
          />
          <div className={styles["current-playlist-menu"]}>
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
          </div>
      </div>
      <MusicPlayer autoPlay src={currentMusic? "local://".concat(currentMusic.path) : ""}
                   showJumpControls={false}
                   showSkipControls={true}
                   onClickPrevious={() => {
                    if (imgOneRepeatClick) {
                      onRepeatCurrentMusic(currentMusic);
                    } else {
                      onPrevMusic();
                    }
                    }}
                    onClickNext={() => {
                      if (imgOneRepeatClick) {
                        onRepeatCurrentMusic(currentMusic);
                      } else {
                        onNextMusic();
                      }
                    }}
                    onEnded={() => {
                      if (imgOneRepeatClick) {
                        onRepeatCurrentMusic(currentMusic);
                      } else {
                        onNextMusic();
                      }
                    }}
                   showFiledVolumn={true} 
                   />
    </div>
  );
};

export default ControlBar;