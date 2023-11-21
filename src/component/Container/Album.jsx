import React, {useState, useEffect} from "react";
import styles from "../../styles/Album.module.css";
import ScrollList from "../common/ScrollList/ScrollList";
import DefaultAlbum from "../../assets/base/default_album.png";

const Album = ({currentMusic}) =>{
  const [imgFile, setImgFile] = useState(null);
  const [isAlbumClick, setIsAlbumClick] = useState(false);

  //음악이 이미지파일이 있고 음악의 이미지 파일의 경로에 대한 정보가 있으면 불러온다
  useEffect(() => {
    async function fetchData() {
      if (currentMusic && currentMusic.imgPath && currentMusic.imgPath !== "") {
        try {
          const tmpImg = await window.electronApi.loadImgFile(currentMusic.imgPath);
          setImgFile(tmpImg);
        } catch (error) {
          console.error("Error loading image:", error);
        }
      }
    }
    fetchData(); 
  }, [currentMusic]);
  
  const toggleIsAlbumClick = () => {
    if(currentMusic&&currentMusic.lyrics !== null && currentMusic.lyrics !== undefined){
      setIsAlbumClick(prev => (!prev));
    }
  }
  return (
    <div
      className={styles.album}
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${imgFile || DefaultAlbum})`,
        backgroundSize: 'cover', // 이미지가 찌그러지지 않고 컨테이너를 덮도록 설정
        backgroundRepeat: 'no-repeat', // 이미지 반복을 막습니다.
        backgroundPosition: 'center', // 이미지를 가운데 정렬합니다.
      }}
    >
      {
        isAlbumClick ? (  
          <div className={styles.lyrics} onClick = {toggleIsAlbumClick}>
            <ScrollList>
            {currentMusic.lyrics}
            </ScrollList>
          </div>
        ) : (
          <div className={styles["mini-album"]} onClick ={toggleIsAlbumClick}>
            {
              imgFile === null || imgFile === undefined ? (
                <img src ={DefaultAlbum} alt="앨범 이미지" />
              ):(
                <img src={imgFile} alt="앨범 이미지" />
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default Album;