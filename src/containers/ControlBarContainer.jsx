//react-redux store에서 ControlBar 으로 정보 받아오기
import {useSelector, useDispatch} from 'react-redux';
import { previousMusic, nextMusic, setIsCurrentPlaylistViewed } from '../modules/musicController';
import ControlBar from '../component/ControlBar';

const ControlBarContainer = () => {
  const selectedPlaylist = useSelector(state=> state.musicController.selectedPlaylist);
  const currentPlaylist = useSelector(state=> state.musicController.currentPlaylist);
  const currentMusic = useSelector(state=> state.musicController.currentMusic);
  const isCurrentPlaylistViewed = useSelector(state=>state.musicController.isCurrentPlaylistViewed);
  const dispatch = useDispatch();//useDispatch로 액션 디스패치
  return (
    <ControlBar 
    selectedPlaylist = {selectedPlaylist}
    currentPlaylist = {currentPlaylist} 
    currentMusic = {currentMusic}  
    onPrevMusic = {()=>dispatch(previousMusic())}
    onNextMusic = {()=>dispatch(nextMusic())}
    isCurrentPlaylistViewed = {isCurrentPlaylistViewed}
    onIsCurrentPlaylistViewed = {(input)=>dispatch(setIsCurrentPlaylistViewed(input))}
    />
  );
};

export default ControlBarContainer;