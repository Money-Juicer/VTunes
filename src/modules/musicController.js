//////////////////////////////////////액션 타입 상수////////////////////////////////////////////////
const LOAD_ALL_SUCCESS = 'musicController/LOAD_ALL_SUCCESS';
const LOAD_ALL_FAILURE = 'musicController/LOAD_ALL_FAILURE';

const ADD_PLAYLIST_SUCCESS = 'musicController/ADD_PLAYLIST_SUCCESS';
const ADD_PLAYLIST_FAILURE = 'musicController/ADD_PLAYLIST_FAILURE';

const DELETE_PLAYLIST_SUCCESS = 'musicController/DELETE_PLAYLIST_SUCCESS';
const DELETE_PLAYLIST_FAILURE = 'musicController/DELETE_PLAYLIST_FAILURE';

const SET_CURRENT_PLAYLIST = 'musicController/SET_CURRENT_PLAYLIST';
const SET_SELECTED_PLAYLIST = 'musicController/SET_SELECTED_PLAYLIST';

const ADD_MUSIC_SUCCESS = 'musicController/ADD_MUSIC_SUCCESS';
const ADD_MUSIC_FAILURE = 'musicController/ADD_MUSIC_FAILURE';

const DELETE_MUSIC_SUCCESS = 'musicController/DELETE_MUSIC_SUCCESS';
const DELETE_MUSIC_FAILURE = 'musicController/DELETE_MUSIC_FAILURE';

const SET_CURRENT_MUSIC = 'musicController/SET_CURRENT_MUSIC';
const PREVIOUS_MUSIC = 'musicController/PREVIOUS_MUSIC';
const NEXT_MUSIC = 'musicController/NEXT_MUSIC';

const MOD_SHUFFLE_STATUS = 'musicController/MOD_SHUFFLE_STATUS';
const MOD_REPEAT_STATUS = 'musicController/MOD_REPEAT_STATUS';

const SET_IS_CURRENT_PLAYLIST_VIEWED = 'musicController/SET_IS_CURRENT_PLAYLIST_VIEWED';
////////////////////////////////////동기화 + 비동기화 액션/////////////////////////////////////////////////////////
export const loadAll = () => async dispatch => {
  try {
    const result = await window.electronApi.loadAll();
    console.log('Load All Result:', result);
    dispatch(loadAllSuccess(result)); // 수정된 부분
  } catch (error) {
    dispatch(loadAllFailure());
    console.error('Error loading playlists:', error);
  }
};
export const addPlaylist = playlist => async dispatch => {
  try {
    await window.electronApi.addPl(playlist);
    dispatch(addPlaylistSuccess(playlist));
  } catch (error) {
    dispatch(addPlaylistFailure());
    console.error('Error adding playlist:', error);
  }
};
export const deletePlaylist = name => async dispatch=> {
  try{
    await window.electronApi.deletePl(name);
    dispatch(deletePlaylistSuccess(name));
  }catch(error){
    dispatch(deletePlaylistFailure());
    console.error('Error deleting playlist:', error);
  }
};

export const addMusic = (playlist, music) => async dispatch=> {
  try{
    await window.electronApi.addMusic(playlist, music);
    dispatch(addMusicSuccess(playlist, music));
  }catch(error){
    dispatch(addMusicFailure());
    console.error('Error deleting playlist:', error);
  }
}
export const deleteMusic = (playlist, music) => async dispatch=> {
  try{
    await window.electronApi.deleteMusic(playlist, music);
    dispatch(deleteMusicSuccess(playlist, music));
  }catch(error){
    dispatch(deleteMusicFailure());
    console.error('Error deleting playlist:', error);
  }
}
//////////////////////////////////////////비동기화 액션///////////////////////////////////////////////////
export const loadAllSuccess = playlists => ({
  type: LOAD_ALL_SUCCESS,
  playlists
});
export const loadAllFailure = () => ({
  type: LOAD_ALL_FAILURE,
});
export const addPlaylistSuccess = playlist => ({
  type: ADD_PLAYLIST_SUCCESS,
  playlist
});
export const addPlaylistFailure = () => ({
  type: ADD_PLAYLIST_FAILURE,
});

export const deletePlaylistSuccess = name => ({
  type : DELETE_PLAYLIST_SUCCESS,
  name
});
export const deletePlaylistFailure = name => ({
  type : DELETE_PLAYLIST_FAILURE,
  name
});
export const changeCurrentPlaylist = playlist => ({
  type : SET_CURRENT_PLAYLIST,
  playlist
});
export const changeSelectedPlaylist = playlist => ({
  type : SET_SELECTED_PLAYLIST,
  playlist
});
export const changeCurrentMusic = music => ({
  type : SET_CURRENT_MUSIC,
  music
});

export const addMusicSuccess = (playlist, music) => ({
  type : ADD_MUSIC_SUCCESS,
  payload:{playlist, music},
});
export const addMusicFailure = () => ({
  type : DELETE_MUSIC_FAILURE,
});

export const deleteMusicSuccess = (playlist, music) => ({
  type : DELETE_MUSIC_SUCCESS,
  payload:{playlist, music},
});
export const deleteMusicFailure = () => ({
  type : DELETE_MUSIC_FAILURE,
});



export const previousMusic = () => ({
  type : PREVIOUS_MUSIC,
});
export const nextMusic = () => ({
  type : NEXT_MUSIC,
});
export const modShuffleStatus = (input) => ({
  type : MOD_SHUFFLE_STATUS,
  input
});
export const modRepeatStatus = (input) => ({
  type : MOD_REPEAT_STATUS,
  input
});

export const setIsCurrentPlaylistViewed = (input) => ({
  type : SET_IS_CURRENT_PLAYLIST_VIEWED,
  input
})
///////////////////////////////////////////////초기 상태//////////////////////////////////////////////

//repeatStatue와 shuffleStatus
const repeatStatus = {
  REPEAT_ON: 2, 
  REPEAT_CURRENT: 1,
  REPEAT_OFF: 0,
};
Object.freeze(repeatStatus);
const shuffleStatus = {
  SHUFFLE_ON: 1,
  SHUFFLE_OFF: 0,
};
Object.freeze(shuffleStatus);


//initial state
const initialState = {
  listOfPlaylist : [],
  selectedPlaylist : { name: "", list: [],},
  currentPlaylist : { name: "현재재생목록", list: [],},
  currentMusic : {
    name : "",
    lyrics : "",
    artist :  "",
    album : "",
    duration : 0,
    path : "",
  },
  repeatStatus : 0,
  shuffleStatus : 1,
  isCurrentPlaylistViewed : true,
}

///////////////////////////////////////////리듀서//////////////////////////////////////////////////


//reducer function
function musicController(state = initialState, action){
  let currentPlaylist;
  let currentMusic;
  let playlist;
  let music;
  switch(action.type){
    /*load all playlist*/
    case LOAD_ALL_SUCCESS:
      console.log("load all success");
      return {
        ...state,
        listOfPlaylist: action.playlists,
      };
    case LOAD_ALL_FAILURE:
      alert('Failed to load playlists.');
      return state;

    /*add playlist*/
    case ADD_PLAYLIST_SUCCESS:
      return {
        ...state,
        listOfPlaylist: state.listOfPlaylist.concat(action.playlist),
      };
    case ADD_PLAYLIST_FAILURE:
      alert('Failed to save playlist.');
      return state;

    /*delete playlist*/
    case DELETE_PLAYLIST_SUCCESS:
      let lop = state.listOfPlaylist;
      lop = lop.filter(playlist => playlist.name !== action.name);
      return {
        ...state,
        listOfPlaylist: lop,
      };
    case DELETE_PLAYLIST_FAILURE:
      alert('Failed to delete playlist.');
      return state;
    
    case SET_CURRENT_PLAYLIST:
      return {
        ...state,
        currentPlaylist : {...state.currentPlaylist, list: action.playlist.list}
      };
    case SET_SELECTED_PLAYLIST:
      return {
        ...state,
        selectedPlaylist : action.playlist
      };
    case SET_CURRENT_MUSIC:
      return {
        ...state,
        currentMusic : action.music
      };
      
    /*add music to playlist*/
    case ADD_MUSIC_SUCCESS:
      playlist = action.payload.playlist;
      music = action.payload.music;
      const updatedListOfPlaylistAdd = state.listOfPlaylist.map(pl => {
        if (pl === playlist) {
          return {
            ...pl,
            list: [...pl.list, music],
          };
        } else {
          return pl;
        }
      });
      if (playlist.name === '현재재생목록') {
        return {
          ...state,
          listOfPlaylist: updatedListOfPlaylistAdd,
          currentPlaylist: {
            ...state.currentPlaylist,
            list: [...state.currentPlaylist.list, music],
          },
        };
      } else {
        return {
          ...state,
          listOfPlaylist: updatedListOfPlaylistAdd,
          selectedPlaylist: {
            ...state.selectedPlaylist,
            list: [...state.selectedPlaylist.list, music],
          },
        };
      };
      case ADD_MUSIC_FAILURE:
      alert('Failed to add music.');
      return state;

    /*delete music in selected playlist */
    case DELETE_MUSIC_SUCCESS:
      playlist = action.payload.playlist;
      music = action.payload.music;
      const updatedListOfPlaylistDelete = state.listOfPlaylist.map(pl => {
        if (pl === playlist) {
          return {
            ...pl,
            list: pl.list.filter(ms => ms.name !== music.name),
          };
        } else {
          return pl;
        }
      });
      if (playlist.name === '현재재생목록') {
        return {
          ...state,
          listOfPlaylist: updatedListOfPlaylistDelete,
          currentPlaylist: {
            ...state.currentPlaylist,
            list: state.currentPlaylist.list.filter(ms => ms.name !== music.name),
          },
        };
      } else {
      return {
          ...state,
          listOfPlaylist: updatedListOfPlaylistDelete,
          selectedPlaylist: {
            ...state.selectedPlaylist,
            list: state.selectedPlaylist.list.filter(ms => ms.name !== music.name),
          },
        };
      };
    case DELETE_MUSIC_FAILURE:
      alert('Failed to delete music.');
      return state;



    case PREVIOUS_MUSIC:
      currentPlaylist = state.currentPlaylist;
      currentMusic = state.currentMusic;
    
      if (currentPlaylist && currentPlaylist.list.length > 0) {
        let currentIndex = currentPlaylist.list.findIndex(music => music === currentMusic);
    
        if (currentIndex !== -1) {
          let newIndex = (currentIndex - 1 + currentPlaylist.list.length) % currentPlaylist.list.length;
          const newMusic = currentPlaylist.list[newIndex];//플레이리스트 내의 이전 음악(맨처음이면 맨끝으로) 이건 수정할수도
    
          return {
            ...state,
            currentMusic: newMusic,
          };

        }
      }
      return state;

    case NEXT_MUSIC:
      currentPlaylist = state.currentPlaylist;
      currentMusic = state.currentMusic;
    
      if (currentPlaylist && currentPlaylist.list.length > 0) {
        let currentIndex = currentPlaylist.list.findIndex(music => music === currentMusic);
    
        if (currentIndex !== -1) {
          let newIndex = (currentIndex + 1 + currentPlaylist.list.length) % currentPlaylist.list.length;
          const newMusic = currentPlaylist.list[newIndex];//플레이리스트 내의 다음 음악(맨끝이면 맨처음으로)
    
          return {
            ...state,
            currentMusic: newMusic,
          };
        } 
      }
      return state;

    case MOD_SHUFFLE_STATUS:
      return {
        ...state,
        shuffleStatus : action.input
      };

    case MOD_REPEAT_STATUS:
      return {
        ...state,
        repeatStatus : action.input
      };
    
    case SET_IS_CURRENT_PLAYLIST_VIEWED:
      return {
        ...state,
        isCurrentPlaylistViewed : action.input
      };

    default :
      return state;
  }
}
export default musicController;