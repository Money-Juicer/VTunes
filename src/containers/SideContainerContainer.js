//react-redux store에서 SideContainer 으로 정보 받아오기
import {connect} from 'react-redux';
import SideContainer from '../component/Container/SideController/SideContainer';
import { changeCurrentMusic, changeCurrentPlaylist } from '../modules/musicController';

const SideContainerContainer = ({currentPlaylist, currentMusic, onCurrentPlaylist, onCurrentMusic}) =>{
  return (
    <SideContainer
      currentPlaylist={currentPlaylist}
      currentMusic={currentMusic}
      onCurrentPlaylist={onCurrentPlaylist}
      onCurrentMusic={onCurrentMusic} 
     />
  );
};

const mapStateToProps = ({musicController}) => ({
  currentPlaylist : musicController.currentPlaylist,
  currentMusic : musicController.currentMusic,
})
const mapDispatchToProps = (dispatch) => ({
  onCurrentPlaylist : () =>{
    dispatch(changeCurrentPlaylist());
  },
  onCurrentMusic : () =>{
    dispatch(changeCurrentMusic());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideContainerContainer);