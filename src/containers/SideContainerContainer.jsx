//react-redux store에서 SideContainer 으로 정보 받아오기
import {useSelector, useDispatch} from 'react-redux';
import SideContainer from '../component/Container/SideController/SideContainer';
import { changeCurrentMusic, changeCurrentPlaylist, changeSelectedPlaylist } from '../modules/musicController';

const SideContainerContainer = ({ isDeleteClick, onIsDeleteClick, isSearch, searchResult}) =>{
  const currentPlaylist = useSelector(state =>state.musicController.currentPlaylist);//useSelector로 상태조회
  const currentMusic = useSelector(state=> state.musicController.currentMusic);
  const selectedPlaylist = useSelector(state=> state.musicController.selectedPlaylist);

  const dispatch = useDispatch();//useDispatch로 액션 디스패치


  return (
    <SideContainer
      selectedPlaylist={selectedPlaylist}
      currentPlaylist={currentPlaylist}
      currentMusic={currentMusic}

      onSelectedPlaylist={(playlist)=>dispatch(changeSelectedPlaylist(playlist))}
      onCurrentPlaylist={(playlist)=>dispatch(changeCurrentPlaylist(playlist))}
      onCurrentMusic={(music)=>dispatch(changeCurrentMusic(music))}
      
      isDeleteClick={isDeleteClick}
      onIsDeleteClick={onIsDeleteClick}
      isSearch={isSearch}
      searchResult={searchResult}
     />
  );
};

export default SideContainerContainer;