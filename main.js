const { app, BrowserWindow, ipcMain, protocol ,dialog} = require('electron');
const isDev = require('electron-is-dev');
const fs = require('fs');
const path = require("path")
const musicParser = require('music-metadata')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 550,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  protocol.registerFileProtocol('local', (request, callback) => {
    const url = request.url.substr;
    const pathname = decodeURIComponent(request.url.replace('local://', ''));
    try {
      callback(pathname);
    } catch (error) {
      console.log(error);
    }
  });
  createWindow();
});

/*렌더러 프로세스로부터 요청 받아서 메인 프로세스에서 작업 실행 : ipcMain*/
ipcMain.handle('select-music-file', async (event) => {
  try {
    const result = await dialog.showOpenDialog({
      filters: [
        { name: 'Audio Files', extensions: ['mp3', 'ogg', 'wav'] },
      ],
      properties: ['openFile'],
    });

    return result;
  } catch (error) {
    console.error('Error selecting music file in main:', error);
    return { canceled: true };
  }
});
ipcMain.handle('load-all', async (event) => {
  try {
    // ./resource 폴더에서 모든 JSON 파일 로드
    const files = fs.readdirSync('./resource').filter(file => file.endsWith('.json'));
    const playlists = files.map(file => {
      const filePath = path.join(__dirname, 'resource', file); // 파일 경로를 구성하기 위해 path.join 사용
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    });
    console.log(playlists);
    return playlists;
  } catch (error) {
    console.error('모든 재생목록을 불러오는 중 오류 발생:', error);
    throw error;
  }
});
ipcMain.handle('add-playlist', async (event, playlist) => {
  try {
    console.log('Received addPlaylist event:', playlist);
    if(playlist.name !== "현재재생목록"){//현재재생목록 플레이리스트면 굳이 json파일을 만들지 않아도 된다
      await fs.promises.writeFile(`./resource/${playlist.name}.json`, JSON.stringify(playlist));
    }
    event.sender.send('savePlaylistResponse', true);
  } catch (error) {
    console.error('Error saving playlist:', error);
    event.sender.send('savePlaylistResponse', false);
  }
});
ipcMain.handle('delete-playlist', async (event, name) => {
  try {
    await fs.promises.unlink(path.join(__dirname, `./resource/${name}.json`));
    event.sender.send('deletePlaylistResponse', true);
  } catch (error) {
    console.error('Error deleting playlist:', error);
    event.sender.send('deletePlaylistResponse', false);
  }
});
ipcMain.handle('add-music', async (event, playlist, music) => {
  try {
    if(playlist.name !== "현재재생목록"){//현재 재생목록이면 json파일에 접근할 필요가 없다
      // 파일 읽기
      const filePath = path.join(__dirname, `./resource/${playlist.name}.json`);
      const fileData = await fs.promises.readFile(filePath, 'utf-8');
      const playlistData = JSON.parse(fileData);

      // 음악 추가
      playlistData.list.push(music);

      // 파일 쓰기
      await fs.promises.writeFile(filePath, JSON.stringify(playlistData));
    }
    event.sender.send('addMusicResponse', true);
  } catch (error) {
    console.error('Error adding music:', error);
    event.sender.send('addMusicResponse', false);
  }
});

ipcMain.handle('load-music-file', async (event, path, thumbnailPath) => {
  try {
    // loadMusicFile 함수 실행
    const music = await loadMusicFile(path, thumbnailPath);
    return music;
  } catch (error) {
    console.error('Error loading music file:', error);
    event.sender.send('loadMusicErrorResponse', error.message);
  }
});
async function loadMusicFile(path, thumbnailPath) {
  try {
    const metadata = await musicParser.parseFile(path, { duration: true });

    const { lyrics, artist, album } = metadata.common;//picture가져오는거 임시로 지웠음
    const { duration } = metadata.format;
    let { title } = metadata.common;

    if (!title) {
      title = path.basename(path);
    }

    // if (picture && picture.length > 0) {                    picture 가져오는게 안된다
    //   const image = picture[0];
    //   fs.writeFileSync(`${thumbnailPath}/${title}.jpg`, image.data);
    // }

    // Music 객체 생성
    const music = {
      name: title, 
      lyrics: lyrics,
      artist: artist,
      duration: parseInt(duration),
      album: album, 
      path: path
    };

    return music;
  } catch (error) {
    console.error('MP3 정보를 읽어오는 도중 에러 발생:', error.message);
    throw error;
  }
};
ipcMain.handle('delete-music', async (event, playlist, music) => {
  try {
    if(playlist.name !== "현재재생목록"){//현재재생목록 이면 json파일에 접근하지 않아도 된다
      // 파일 읽기
      const filePath = path.join(__dirname, `./resource/${playlist.name}.json`);
      const fileData = await fs.promises.readFile(filePath, 'utf-8');
      const playlistData = JSON.parse(fileData);

      // 음악 찾기 및 삭제
      playlistData.list = playlistData.list.filter(item => item.name !== music.name);

      // 파일 쓰기
      await fs.promises.writeFile(filePath, JSON.stringify(playlistData));
    }
    event.sender.send('deleteMusicResponse', true);
  } catch (error) {
    console.error('Error deleting music:', error);
    event.sender.send('deleteMusicResponse', false);
  }
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
