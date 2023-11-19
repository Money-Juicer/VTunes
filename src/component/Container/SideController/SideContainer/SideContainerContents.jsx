import React, { useState, useEffect } from "react";
import ScrollList from "../../../common/ScrollList/ScrollList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MusicItem from "./MusicItem";
import styles from "../../../../styles/SideContainerContents.module.css";

const SideContainerContents = ({
  isDeleteClick,
  userInput,
  listOfPlaylist,
  selectedPlaylist,
  currentPlaylist,
  currentMusic,
  isCurrentPlaylistViewed,
  onSelectedPlaylist,
  onCurrentPlaylist,
  onCurrentMusic,
  onDeleteMusic,
  onIsCurrentPlaylistViewed,
  onAddPlaylist,
}) => {
  //뮤직 아이템을 클릭하면 해당 음악으로 현재 음악 설정 + 현재 플레이리스트 설정
  const handleCurrent = (musicData) => {
    //add playlist와 onCurrentPlaylist 순서를 바꾸면 안됨, 빈 현재재생목록 추가 -> selectPlaylist 내용을 현재재생목록에 카피
    const playlistExists = listOfPlaylist.some(
      (playlist) => playlist.name === "현재재생목록"
    );
    if (!playlistExists) {
      onAddPlaylist({ name: "현재재생목록", list: [] });
    }
    onCurrentPlaylist(selectedPlaylist);
    onCurrentMusic(musicData);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(playlistToRender.list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // 플레이리스트 항목의 순서를 업데이트합니다.
    if (isCurrentPlaylistViewed) {
      onCurrentPlaylist({ ...playlistToRender, list: items });
    } else {
      onSelectedPlaylist({ ...playlistToRender, list: items });
    }
  };

  const playlistToRender = isCurrentPlaylistViewed
    ? currentPlaylist
    : selectedPlaylist;
  return (
    <div className={styles["side-container-contents"]}>
      <ScrollList>
        <DragDropContext onDragEnd={handleDragEnd}>
          {/*드래그 가능 영역*/}
          <Droppable droppableId="playlist">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {userInput &&
                playlistToRender.list.filter((musicData) =>
                  musicData.name.includes(userInput)
                ).length === 0 ? (
                  <div className={styles["music-wrapper"]}>
                    <span
                      style={{
                        width: "100%",
                        height: "100%",
                        fontSize: "20px",
                      }}
                    >
                      No Results Found (｡•́︿•̀｡)
                    </span>
                  </div>
                ) : (
                  playlistToRender.list
                    .filter(
                      (musicData) =>
                        !userInput || musicData.name.includes(userInput)
                    )
                    .map((musicData, index) => (
                      <Draggable //드래그 가능한 컴포넌트
                        key={index}
                        draggableId={index.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              className={styles["music-wrapper"]}
                              key={index}
                            >
                              <MusicItem
                                buttonFlag={isDeleteClick}
                                musicData={musicData}
                                isPlaying={
                                  isCurrentPlaylistViewed &&
                                  currentMusic &&
                                  currentMusic === musicData
                                }
                                playlistToRender={playlistToRender}
                                onDeleteMusic={onDeleteMusic}
                                onCurrent={handleCurrent} //이건 selectedPlaylist에서 선택시
                                onCurrentMusic={onCurrentMusic} //이건 currentPlaylist에서 선택시
                                onIsCurrentPlaylistViewed={
                                  onIsCurrentPlaylistViewed
                                }
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollList>
    </div>
  );
};

export default SideContainerContents;
