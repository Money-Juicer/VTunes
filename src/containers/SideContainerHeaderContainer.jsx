//react-redux store에서 SideContainerHeader으로 정보 받아오기 
import {useSelector} from 'react-redux';
import SideContainerHeader from "../component/Container/SideController/SideContainer/SideContainerHeader";

const SideContainerHeaderContainer = () => {
  const selectedPlaylist = useSelector(state=> state.musicController.selectedPlaylist);
  return <SideContainerHeader selectedPlaylist = {selectedPlaylist} />;
};

export default SideContainerHeaderContainer;