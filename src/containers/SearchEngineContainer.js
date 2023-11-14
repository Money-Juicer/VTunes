//react-redux store에서 SearchEngine 으로 정보 받아오기
import {useSelector} from 'react-redux';
import SearchEngine from '../component/Container/SideController/SearchEngine';

const SearchEngineContainer = ({ onPlMenuClick, onIsSearch, onSearchResult }) => {
  const currentPlaylist = useSelector(({musicController})=> musicController.currentPlaylist);
  return (
    <SearchEngine 
      onPlMenuClick={onPlMenuClick} 
      onIsSearch={onIsSearch} 
      onSearchResult={onSearchResult} 
      currentPlaylist = {currentPlaylist} />
  );
};

export default SearchEngineContainer;