//action 설정
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

const SET_MUSIC = 'musicController/SET_MUSIC';
const PREVIOUS_MUSIC = 'musicController/PREVIOUS_MUSIC';
const NEXT_MUSIC = 'musicController/NEXT_MUSIC';

const MOD_SHUFFLE_STATUS = 'musicController/MOD_SHUFFLE_STATUS';
const MOD_REPEAT_STATUS = 'musicController/MOD_REPEAT_STATUS';


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


export const changeCurrentMusic = music => ({
  type : SET_MUSIC,
  music
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
  currentPlaylist : { name: "", list: [],},
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
}

//reducer function
function musicController(state = initialState, action){
  let currentPlaylist;
  let currentMusic;
  let lop;
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
      lop = state.listOfPlaylist;
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
        currentPlaylist : action.playlist
      };
    case SET_SELECTED_PLAYLIST:
      return {
        ...state,
        selectedPlaylist : action.playlist
      };

    /*add music to selected playlist*/
    case ADD_MUSIC_SUCCESS:
      playlist = action.payload.playlist;
      music = action.payload.music;
      const updatedListOfPlaylist = state.listOfPlaylist.map(pl => {
        if (pl === playlist) {
          return {
            ...pl,
            list: [...pl.list, music],
          };
        } else {
          return pl;
        }
      });
      return {
        ...state,
        listOfPlaylist: updatedListOfPlaylist,
        selectedPlaylist: {
          ...state.selectedPlaylist,
          list: [...state.selectedPlaylist.list, music]
        }
      };
    case ADD_MUSIC_FAILURE:
      alert('Failed to add music.');
      return state;

    /*delete music in selected playlist*/
    case DELETE_MUSIC_SUCCESS:
      playlist= action.payload.playlist;
      music = action.payload.music;
      const updatedListOfPlaylistDelete = state.listOfPlaylist.map(pl => {
        if (pl === playlist) {
          return {
            ...pl,
            list: pl.list.filter(ms=> ms.name !== music.name)
          };
        } else {
          return pl;
        }
      });
      return {
        ...state,
        listOfPlaylist: updatedListOfPlaylistDelete,
        selectedPlaylist: {
          ...state.selectedPlaylist,
          list: state.selectedPlaylist.list.filter(ms => ms.name !== music.name)
        }
      };
    case DELETE_MUSIC_FAILURE:
      alert('Failed to delete music.');
      return state;

    case SET_MUSIC:
      return {
        ...state,
        currentMusic : action.music
      };

    case PREVIOUS_MUSIC:
      currentPlaylist = state.currentPlaylist;
      currentMusic = state.currentMusic;
    
      if (currentPlaylist && currentPlaylist.listOfMusic.length > 0) {
        let currentIndex = currentPlaylist.listOfMusic.findIndex(music => music === currentMusic);
    
        if (currentIndex !== -1) {
          let newIndex = (currentIndex - 1 + currentPlaylist.listOfMusic.length) % currentPlaylist.listOfMusic.length;
          const newMusic = currentPlaylist.listOfMusic[newIndex];//플레이리스트 내의 이전 음악(맨처음이면 맨끝으로)
    
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
    
      if (currentPlaylist && currentPlaylist.listOfMusic.length > 0) {
        let currentIndex = currentPlaylist.listOfMusic.findIndex(music => music === currentMusic);
    
        if (currentIndex !== -1) {
          let newIndex = (currentIndex + 1) % currentPlaylist.listOfMusic.length;
          const newMusic = currentPlaylist.listOfMusic[newIndex];//플레이리스트 내의 다음 음악(맨끝이면 맨처음으로)
    
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

    default :
      return state;
  }
}
export default musicController;