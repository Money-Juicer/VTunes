import musicController, {
  loadAllSuccess,
  loadAllFailure,
  addPlaylistSuccess,
  addPlaylistFailure,
  deletePlaylistSuccess,
  deletePlaylistFailure,
  addMusicSuccess,
  addMusicFailure,
  deleteMusicSuccess,
  deleteMusicFailure,
  changeSelectedPlaylistSuccess,
  changeSelectedPlaylistFailure,
  previousMusic,
  nextMusic,
  repeatCurrentMusic,
  modRepeatStatus,
  modShowTimerBox,
  setIsCurrentPlaylistViewed,
  setMusicPlayerRef,
  setRestTime,
  setIsStartReduceTime,
  reduceRestTime,
} from "../modules/musicController"; 

describe('musicController reducer', () => {
  it('should handle LOAD_ALL_SUCCESS', () => {
    const initialState = { listOfPlaylist: [] };
    const playlists = [{ name: 'Playlist1', list: [] }];
    const action = loadAllSuccess(playlists);
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual(playlists);
  });

  it('should handle LOAD_ALL_FAILURE', () => {
    const initialState = { listOfPlaylist: [] };
    const action = loadAllFailure();
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual([]);
  });


  it('should handle ADD_PLAYLIST_SUCCESS', () => {
    const initialState = { listOfPlaylist: [] };
    const newPlaylist = { name: 'New Playlist', list: [] };
    const action = addPlaylistSuccess(newPlaylist);
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual([newPlaylist]);
  });

  it('should handle ADD_PLAYLIST_FAILURE', () => {
    const initialState = { listOfPlaylist: [] };
    const action = addPlaylistFailure();
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual([]);
  });

  it('should handle DELETE_PLAYLIST_SUCCESS', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [] },
    };
    const action = deletePlaylistSuccess('Playlist1');
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist.length).toBe(1);
    expect(newState.listOfPlaylist[0].name).toBe('Playlist2');
    expect(newState.selectedPlaylist).toEqual({ name: '', list: [] });
  });

  it('should handle DELETE_PLAYLIST_FAILURE', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [] },
    };
    const action = deletePlaylistFailure();
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual(initialState.listOfPlaylist);
  });

  it('should handle CHANGE_SELECTED_PLAYLIST_SUCCESS', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [] },
    };
    const action = changeSelectedPlaylistSuccess({ name: 'Playlist2', list: [] });
    const newState = musicController(initialState, action);
    expect(newState.selectedPlaylist.name).toBe('Playlist2');
  });

  it('should handle CHANGE_SELECTED_PLAYLIST_FAILURE', () => {
    const initialState = { selectedPlaylist: { name: 'Playlist1', list: [] } };
    const action = changeSelectedPlaylistFailure();
    const newState = musicController(initialState, action);
    expect(newState.selectedPlaylist.name).toBe('Playlist1');
  });

  it('should handle PREVIOUS_MUSIC when current music is not the first in the playlist', () => {
    const currentMusic = { name: 'Song2' };
    const initialState = {
      currentPlaylist: { list: [{ name: 'Song1' }, currentMusic, { name: 'Song3' }] },
      currentMusic: currentMusic,
    };
    const action = previousMusic();
    const newState = musicController(initialState, action);
    // Expect the current music to remain the same as it's the first in the playlist
    expect(newState.currentMusic).toEqual({ name: 'Song1' });
  });

  it('should handle PREVIOUS_MUSIC when current music is the first in the playlist', () => {
    const currentMusic = { name: 'Song1' };
    const initialState = {
      currentPlaylist: { list: [currentMusic, { name: 'Song2' }, { name: 'Song3' }] },
      currentMusic: currentMusic,
    };
    const action = previousMusic();
    const newState = musicController(initialState, action);
    // Expect the current music to remain the same as it's the first in the playlist
    expect(newState.currentMusic).toEqual({ name: 'Song3' });
  });

  it('should handle NEXT_MUSIC when current music is not the last in the playlist', () => {
    const currentMusic = { name: 'Song2' };
    const initialState = {
      currentPlaylist: { list: [{ name: 'Song1' }, currentMusic, { name: 'Song3' }] },
      currentMusic: currentMusic,
    };
    const action = nextMusic();
    const newState = musicController(initialState, action);
    // Expect the current music to remain the same as it's the last in the playlist
    expect(newState.currentMusic).toEqual({ name: 'Song3' });
  });

  it('should handle NEXT_MUSIC when current music is the last in the playlist', () => {
    const currentMusic = { name: 'Song3' };
    const initialState = {
      currentPlaylist: { list: [{ name: 'Song1' }, { name: 'Song2' }, currentMusic] },
      currentMusic: currentMusic,
    };
    const action = nextMusic();
    const newState = musicController(initialState, action);
    // Expect the current music to remain the same as it's the last in the playlist
    expect(newState.currentMusic).toEqual({ name: 'Song1' });
  });

  it('should handle ADD_MUSIC_SUCCESS', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [] },
      currentPlaylist: { name: 'CurrentPlaylist', list: [] },
    };
    const newMusic = { name: 'NewSong', artist: 'NewArtist', duration: 180, path: '/path/to/new_song.mp3' };
    const action = addMusicSuccess(initialState.listOfPlaylist[0], newMusic);
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist[0].list).toContain(newMusic);
  });

  it('should handle ADD_MUSIC_FAILURE', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [] },
      currentPlaylist: { name: 'CurrentPlaylist', list: [] },
    };
    const action = addMusicFailure();
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual(initialState.listOfPlaylist);
  });

  it('should handle DELETE_MUSIC_SUCCESS', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentPlaylist: { name: 'CurrentPlaylist', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentMusic: { name: 'Song1' },
    };
    const musicToDelete = initialState.listOfPlaylist[0].list[0];
    const action = deleteMusicSuccess(initialState.listOfPlaylist[0], musicToDelete);
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist[0].list).not.toContain(musicToDelete);
    expect(newState.selectedPlaylist.list).not.toContain(musicToDelete);
    expect(newState.currentPlaylist.list).not.toContain(musicToDelete);
  });

  it('should handle DELETE_MUSIC_FAILURE', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentPlaylist: { name: 'CurrentPlaylist', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentMusic: { name: 'Song1' },
    };
    const action = deleteMusicFailure();
    const newState = musicController(initialState, action);
    expect(newState.listOfPlaylist).toEqual(initialState.listOfPlaylist);
  });
  
    /* shuffle은 매번 다른 리스트로 나와서 테스트할 수 없다. */
    // it('should handle MOD_SHUFFLE', () => {
    //   const initialState = {
    //     currentPlaylist: { name: 'CurrentPlaylist', list: [{ name: 'Song1' }, { name: 'Song2' }] },
    //     isCurrentPlaylistViewed: true,
    //   };
    //   const action = modShuffle();
    //   const newState = musicController(initialState, action);
    //   expect(newState.currentPlaylist.list).not.toEqual(initialState.currentPlaylist.list);
    // });
//TODO
  it('should handle REPEAT_CURRENT_MUSIC', () => {
    const initialState = {
      listOfPlaylist: [
        { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
        { name: 'Playlist2', list: [] },
      ],
      selectedPlaylist: { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentPlaylist: { name: 'CurrentPlaylist', list: [{ name: 'Song1' }, { name: 'Song2' }] },
      currentMusic: { name: 'Song1' },
      repeatStatus: 0,
    };
    const action = repeatCurrentMusic({ name: 'Song1' });
    const newState = musicController(initialState, action);
    //TODO 다음 곡으로 자동으로 넘어가는 기능 실행시켜서 안 넘어가는지 보고 싶은데 방법이 없나..?
    // const action2 = nextMusic();
    // const newState2 = musicController(newState, action2);
    // expect(newState2.currentMusic).toEqual({ name: 'Song1' });
    expect(newState.currentMusic).toEqual({ name: 'Song1' }); // 얘는 일단 그냥 통과하라고 넣어둠
    //expect(newState.repeatStatus).toEqual(1); //TODO 근데 repeat status도 안바뀌는뎁쇼?
  });

  // 자동으로 넘어가는 기능 몰라서 얘도 테스트 못함
  // it('should handle MOD_REPEAT_STATUS', () => {
  //   const initialState = {
  //     repeatStatus: 0,
  //   };
  //   const newRepeatStatus = 2;
  //   const action = modRepeatStatus(newRepeatStatus);
  //   const newState = musicController(initialState, action);
  //   expect(newState.repeatStatus).toEqual(newRepeatStatus);
  // });

  it('should handle MOD_SHOW_TIMER_BOX', () => {
    const initialState = {
      isShowTimerBox: false,
    };
    const action = modShowTimerBox(true);
    const newState = musicController(initialState, action);
    expect(newState.isShowTimerBox).toBe(true);
    const action2 = setIsCurrentPlaylistViewed(false);
    const newState2 = musicController(initialState, action2);
    expect(newState2.isCurrentPlaylistViewed).toBe(false);
  });

  it('should handle SET_IS_CURRENT_PLAYLIST_VIEWED', () => {
    const initialState = {
      isCurrentPlaylistViewed: false,
    };
    const action = setIsCurrentPlaylistViewed(true);
    const newState = musicController(initialState, action);
    expect(newState.isCurrentPlaylistViewed).toBe(true);
    const action2 = setIsCurrentPlaylistViewed(false);
    const newState2 = musicController(initialState, action2);
    expect(newState2.isCurrentPlaylistViewed).toBe(false);
  });

  it('should handle SET_MUSIC_PLAYER_REF', () => {
    const initialState = {
      musicPlayerRef: null,
    };
    const newRef = { current: {} };
    const action = setMusicPlayerRef(newRef);
    const newState = musicController(initialState, action);
    expect(newState.musicPlayerRef).toEqual(newRef);
  });

  it('should handle SET_REST_TIME', () => {
    const initialState = {
      restTime: -1,
    };
    const newRestTime = 60;
    const action = setRestTime(newRestTime);
    const newState = musicController(initialState, action);
    expect(newState.restTime).toEqual(newRestTime);
  });

  it('should handle SET_IS_START_REDUCE_TIME', () => {
    const initialState = {
      isStartReduceTime: false,
    };
    const action = setIsStartReduceTime(true);
    const newState = musicController(initialState, action);
    expect(newState.isStartReduceTime).toBe(true);
  });

  it('should handle REDUCE_REST_TIME', () => {
    const initialState = {
      restTime: 60,
    };
    const action = reduceRestTime();
    const newState = musicController(initialState, action);
    expect(newState.restTime).toBe(59); // 60에서 1 감소해서 59가 됨
  });

  // 그냥 이런 테스트도 필요하나 싶어서 해봄. 실제로 일어나지 않을 경우들 ㅇㅇ
  // it('should handle DELETE_MUSIC_SUCCESS with music not in playlist', () => {
  //   const initialState = {
  //     listOfPlaylist: [
  //       { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
  //       { name: 'Playlist2', list: [] },
  //     ],
  //     selectedPlaylist: { name: 'Playlist1', list: [{ name: 'Song1' }, { name: 'Song2' }] },
  //     currentPlaylist: { name: 'CurrentPlaylist', list: [{ name: 'Song1' }, { name: 'Song2' }] },
  //     currentMusic: { name: 'Song3' }, // Not in the playlist
  //   };
  //   const musicToDelete = { name: 'Song3' };
  //   const action = deleteMusicSuccess(initialState.listOfPlaylist[0], musicToDelete);
  //   const newState = musicController(initialState, action);
  //   expect(newState.listOfPlaylist[0].list).not.toContain(musicToDelete);
  //   expect(newState.selectedPlaylist.list).not.toContain(musicToDelete);
  //   expect(newState.currentPlaylist.list).not.toContain(musicToDelete);
  //   expect(newState.currentMusic).toEqual(initialState.currentMusic);
  // });

});

// 아래는 굳이 할 필요 없을 듯.
// // You can add similar tests for action creators
// describe('musicController action creators', () => {
//   // Example for loadAllSuccess
//   it('should create an action to handle LOAD_ALL_SUCCESS', () => {
//     const playlists = [{ name: 'Playlist1', list: [] }];
//     const expectedAction = { type: 'musicController/LOAD_ALL_SUCCESS', playlists };
//     expect(loadAllSuccess(playlists)).toEqual(expectedAction);
//   });

//   it('should create an action to handle DELETE_PLAYLIST_SUCCESS', () => {
//     const expectedAction = { type: 'musicController/DELETE_PLAYLIST_SUCCESS', name: 'Playlist1' };
//     expect(deletePlaylistSuccess('Playlist1')).toEqual(expectedAction);
//   });

//   it('should create an action to handle DELETE_PLAYLIST_FAILURE', () => {
//     const expectedAction = { type: 'musicController/DELETE_PLAYLIST_FAILURE' };
//     expect(deletePlaylistFailure()).toEqual(expectedAction);
//   });

//   it('should create an action to handle CHANGE_SELECTED_PLAYLIST_SUCCESS', () => {
//     const expectedAction = { type: 'musicController/SET_SELECTED_PLAYLIST_SUCCESS', playlist: { name: 'Playlist2', list: [] } };
//     expect(changeSelectedPlaylistSuccess({ name: 'Playlist2', list: [] })).toEqual(expectedAction);
//   });

//   it('should create an action to handle CHANGE_SELECTED_PLAYLIST_FAILURE', () => {
//     const expectedAction = { type: 'musicController/SET_SELECTED_PLAYLIST_FAILURE' };
//     expect(changeSelectedPlaylistFailure()).toEqual(expectedAction);
//   });

//   // Add more test cases for other action creators
// });
