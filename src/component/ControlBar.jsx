import {useState} from "react";
import Controller from "../domain/Controller";
import Playlist from "../domain/Playlist";
import styles from "../styles/Footer.module.css";
import MusicPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';

const ControlBar = ({currentPlaylist, currentMusic, onPrevMusic, onNextMusic}) => {
  // const [controller, setController] = useState(new Controller(new Playlist()));
  // const [curr, setCurr] = useState("local://C:\\Users\\LEE\\Downloads\\Quick Share\\1.mp3");
  // const next = () => setCurr(controller.next());
  // const prev = () => setCurr(controller.prev());

  return (
    <div className={styles.footer}>
      <MusicPlayer autoPlay src={currentMusic? "local://".concat(currentMusic.path) : ""}
                   showJumpControls={false}
                   showSkipControls={true}
                   onClickPrevious={()=>onPrevMusic()}
                   onClickNext={()=>onNextMusic()}
                   onEnded={()=>onNextMusic()}
                   showFiledVolumn={true} />
    </div>
  );
};

export default ControlBar;