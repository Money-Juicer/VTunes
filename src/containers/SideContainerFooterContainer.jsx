//react-redux store에서 SideContainerContents 으로 정보 받아오기
import {useSelector, useDispatch} from 'react-redux';
import { addMusic, deleteMusic } from '../modules/musicController';
import SideContainerFooter from '../component/Container/SideController/SideContainer/SideContainerFooter';

const SideContainerFooterContainer = ({isDeleteClick, onIsDeleteClick}) =>{
  const selectedPlaylist = useSelector(state=> state.musicController.selectedPlaylist);

  const dispatch = useDispatch();//useDispatch로 액션 디스패치

  return (
    <SideContainerFooter
    isDeleteClick={isDeleteClick}
    onIsDeleteClick={onIsDeleteClick}

      selectedPlaylist={selectedPlaylist}
      onAddMusic={(playlist, music)=>dispatch(addMusic(playlist, music))}
     />
  );
};

export default SideContainerFooterContainer;