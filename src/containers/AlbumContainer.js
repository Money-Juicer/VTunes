import {connect} from 'react-redux';
import Album from "../component/Container/Album";

const AlbumContainer = ({currentMusic}) => {
  return <Album currentMusic = {currentMusic} />;
};

const mapStateToProps = ({musicController}) => ({
  currentMusic : musicController.currentMusic,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumContainer);