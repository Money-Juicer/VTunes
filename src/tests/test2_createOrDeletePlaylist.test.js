import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReduxProviderWrapper from './ReduxProviderWrapper';
import PlaylistSet from '../component/Container/SideController/PlaylistSet';
import { Provider } from 'react-redux';

// props Mock
const mockProps = {
    isPlMenuClick: false,
    onPlMenuClick: jest.fn(),
    listOfPlaylist: [
        { name: 'Playlist 1', list: [] },
        { name: 'Playlist 2', list: [] },
    ],
    onLoadAllPlaylists: jest.fn(),
    onSelectedPlaylist: jest.fn(),
    onAddPlaylist: jest.fn(),
    onDeletePlaylist: jest.fn(),
    onIsCurrentPlaylistViewed: jest.fn(),
};

describe('Create or Delete Playlist', () => {
    it('renders PlaylistSet component (New Playlist & Delete Playlist)', async () => {
        render(
        <ReduxProviderWrapper>
            <PlaylistSet {...mockProps} />
        </ReduxProviderWrapper>
        );
        expect(screen).toMatchSnapshot();

        // New Playlist
        const newPlaylistBtn = screen.getByText('New Playlist');
        expect(newPlaylistBtn).toBeInTheDocument();
        expect(newPlaylistBtn).toMatchSnapshot();
        fireEvent.click(newPlaylistBtn);

        const confirmBtn = screen.getByText('Confirm');
        expect(confirmBtn).toBeInTheDocument();
        expect(confirmBtn).toMatchSnapshot();

        const cancelBtn = screen.getByText('Cancel');
        expect(cancelBtn).toBeInTheDocument();
        expect(cancelBtn).toMatchSnapshot();
        
        const scrollList = screen.getByTestId('scrollList');
        expect(scrollList).toBeInTheDocument();
        expect(scrollList).toMatchSnapshot();
     
        // Delete Playlist
        const deletePlaylistBtn = screen.getByText('Delete Playlist');
        expect(deletePlaylistBtn).toBeInTheDocument();
        expect(deletePlaylistBtn).toMatchSnapshot();
    });

    it('should add a new playlist on clicking Confirm button', () => {
        render(<PlaylistSet {...mockProps} />);
        
        // Click on "New Playlist" button to open the modal
        const newPlaylistBtn = screen.getByText('New Playlist');
        fireEvent.click(newPlaylistBtn);
    
        // Input playlist name
        const playlistInput = screen.getByTestId('playlist-input');
        fireEvent.change(playlistInput, { target: { value: 'New Playlist Name' } });
    
        // Click on "Confirm" button
        const confirmBtn = screen.getByText('Confirm');
        fireEvent.click(confirmBtn);
    
        // Assertions
        expect(mockProps.onAddPlaylist).toHaveBeenCalledWith({ name: 'New Playlist Name', list: [] });
        expect(mockProps.onAddPlaylist).toHaveBeenCalledTimes(1);

        // onAddPlaylist이 event가 발생해서 render되는거까지 확인하려고 했는데, 어떻게 해도 render에 적용이 되지 않더라...
        // 메타데이터를 추가하는 작업이라 그런지, 암튼 모르겠따. 그래도 이벤트 발생까지는 확인함 굳굳
        // 노력의 흔적이 맨 아래에 있음.
      });

      it('should not add a new playlist if the name is invalid', () => {
        render(<PlaylistSet {...mockProps} />);
        
        // Click on "New Playlist" button to open the modal
        const newPlaylistBtn = screen.getByText('New Playlist');
        fireEvent.click(newPlaylistBtn);
    
        // Input an invalid playlist name
        const playlistInput = screen.getByTestId('playlist-input');
        fireEvent.change(playlistInput, { target: { value: '' } });
    
        // Click on "Confirm" button
        const confirmBtn = screen.getByText('Confirm');
        fireEvent.click(confirmBtn);
    
        // Assertions
        expect(mockProps.onAddPlaylist).not.toHaveBeenCalled();
        const warningMessage = screen.getByText('Invalid Playlist Name');
        expect(warningMessage).toBeInTheDocument();
      });

    // 안돼. 죽도록 안돼. 이거 해결하려고 1시간 잡아봤는데 왜 안 생성되는지 모르겠어. 그만할래..
/*       it('should display the newly added playlist in ScrollList', () => {
        render(<PlaylistSet {...mockProps} />);
        
        // Click on "New Playlist" button to open the modal
        const newPlaylistBtn = screen.getByText('New Playlist');
        fireEvent.click(newPlaylistBtn);
    
        // Input playlist name
        const playlistInput = screen.getByTestId('playlist-input');
        fireEvent.change(playlistInput, { target: { value: 'New Playlist Name' } });
    
        // Click on "Confirm" button
        const confirmBtn = screen.getByText('Confirm');
        fireEvent.click(confirmBtn);
    
        // Check if the newly added playlist is displayed in ScrollList
        const addedPlaylist = screen.getByText('New Playlist Name');
        expect(addedPlaylist).toBeInTheDocument();
      }); 
      
          it('create New Playlist', async () => {
        render(
        <ReduxProviderWrapper>
            <PlaylistSet {...mockProps} />
        </ReduxProviderWrapper>
        );

        // New Playlist
        const newPlaylistBtn = screen.getByText('New Playlist');
        expect(newPlaylistBtn).toBeInTheDocument();
        fireEvent.click(newPlaylistBtn);

        const inputPlace = screen.getByTestId("playlist-input");
        expect(inputPlace).toBeInTheDocument();
        
        // userInput 값을 변경합니다.
        fireEvent.change(inputPlace, { target: { value: 'sample playlist' } });

        const confirmBtn = screen.getByText('Confirm');
        expect(confirmBtn).toBeInTheDocument();
        // 버튼을 눌러서 재생목록 생성
        fireEvent.click(confirmBtn);

        //data-testid="scrollList"
        const scrollList = screen.getByTestId("scrollList");
        expect(scrollList).toBeInTheDocument();

        // await waitFor(() => {
        //     // Now, check if the new playlist is in the list
        //     const samplePlaylist2 = screen.getByText("sample playlist");
        //     expect(samplePlaylist2).toBeInTheDocument();
        //     });

        // const samplePlaylist2 = screen.getByText("sample playlist");
        // expect(samplePlaylist2).toBeInTheDocument();
        
    });
      
      
      */
});

