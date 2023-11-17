//react-redux store에서 SearchEngine 으로 정보 받아오기
import {useSelector, useDispatch} from 'react-redux';
import { changeSelectedPlaylist, addPlaylist, deletePlaylist, loadAll } from '../modules/musicController';
import PlaylistSet from '../component/Container/SideController/PlaylistSet';

const PlaylistSetContainer = ({isPlMenuClick, onPlMenuClick}) => {
  const listOfPlaylist = useSelector(state=> state.musicController.listOfPlaylist);
  const dispatch = useDispatch();//useDispatch로 액션 디스패치
  return <PlaylistSet
            isPlMenuClick={isPlMenuClick}
            onPlMenuClick={onPlMenuClick}
            listOfPlaylist={listOfPlaylist}
            onLoadAllPlaylists={()=>dispatch(loadAll())}

            onSelectedPlaylist={(playlist)=>dispatch(changeSelectedPlaylist(playlist))}
            onAddPlaylist={(playlist)=>dispatch(addPlaylist(playlist))}
            onDeletePlaylist={(playlist)=>dispatch(deletePlaylist(playlist))}
          />;
};

export default PlaylistSetContainer;