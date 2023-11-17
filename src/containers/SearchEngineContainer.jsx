//react-redux store에서 SearchEngine 으로 정보 받아오기
import {useSelector} from 'react-redux';
import SearchEngine from "../component/Container/SideController/SearchEngine";

const SearchEngineContainer = ({isPlMenuClick, onPlMenuClick, onIsSearch, onSearchResult}) => {
  const selectedPlaylist = useSelector(state=> state.musicController.selectedPlaylist);
  return <SearchEngine 
            isPlMenuClick={isPlMenuClick} 
            onPlMenuClick={onPlMenuClick} 
            onIsSearch={onIsSearch} 
            onSearchResult={onSearchResult} 
            selectedPlaylist={selectedPlaylist}
          />;
};

export default SearchEngineContainer;