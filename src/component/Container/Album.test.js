import {fireEvent, render, screen} from '@testing-library/react';
import Album from "./Album";
import {useSelector} from "react-redux";

const mockCurrentMusic = {
  name: '염라 (Karma)',
  lyrics: ['바라봤을 뿐인 얼굴',
    '떠오르지 않나요? 네',
    '꺼림칙한 건 나인데',
    '신경 쓰이잖아요?',
    '희미해져 가는 게',
    '사라져 없어져 버린다는 게',
    '망설임은 항상 내 편',
    '물어 볼 수 조차 없죠',
    '대체 어디로들 가는 건지 몰라',
    '인생 마지막의 숨을 든 채로',
    '몸을 던져 버리잖아',
    '색 바랜 기록 위에 눈물 닿아도',
    '빛은 돌아오지 않아',
    '구겨진 기억만을 안고 살고 싶다면',
    '누구에게 말해야만 해?',
    '가장 바라고 가장 두려운 것은',
    '마음의 저편에',
    '두고 온 나인데 어느새 손에 쥐어져',
    '거짓말처럼 아 아미타',
    '(그래요 그래요 좋아요 좋아요 나예요 나예요)',
    '아미타 아미타',
    '바라지 않는 거라도 좋아',
    '(그래요 그래요 좋아요 좋아요 나예요 나예요)',
    '아미타 아미타',
    '두려워도 괜찮을 거라고',
    '(위로하는 그 소리) 거짓말',
    '(뻔한 엔딩 그 스토리)',
    '타임라인 저 아득히 아래 쌓여버리겠지',
    '처음으로 지은 표정',
    '귀엽다고 해줘요? 네',
    '거짓말 하는 건 난데',
    '회자정리인가요?',
    '슬그머니 거릴 두는 게',
    '당신이 먼저 다가왔던 건데',
    '배신감은 항상 독차지',
    '칠흑같은 관계의 색',
    '대체 언제 그렇게 발라 둔 지 몰라',
    '인생 마지막 순간인 것 처럼',
    '눈을 감고 다니잖아',
    '관계도 처럼 줄이 그어져 있어',
    '너와 나 어느 사이에',
    '뒤틀린 추억만을 공유하고 싶다면',
    '누구에게 말해야만 해?',
    '가장 바라고 가장 두려운 것은',
    '마음의 저편에',
    '두고 온 나인데 어느 새 손에 쥐어져',
    '거짓말처럼 아 아미타',
    '(그래요 그래요 좋아요 좋아요 나예요 나예요)',
    '아미타 아미타',
    '바라지 않는 거라도 좋아',
    '(그래요 그래요 좋아요 좋아요 나예요 나예요)',
    '아미타 아미타',
    '두려워도 괜찮을 거라고',
    '애써 연기를 해도 가면을 쓰고 하면 어떡해?',
    '정론이지만 해답으로선 오답인거네',
    '한 치 틀림 없이 어긋난',
    '관음 관심 관용 관세음 너와 나의 추종자가',
    '숨을 손에 품고 귀의를',
    '잃어버린 꿈에 미련은 없는거야',
    '후회는 하지만',
    '사랑했었지만 사랑받은 기억은',
    '거짓말처럼 아 아미타',
    '(그래요 그래요 좋아요 좋아요 나예요 나예요)',
    '아미타 아미타',
    '바라지 않는 거라도 좋아',
    '(그래요 그래요 좋아요 좋아요 나예요 나예요)',
    '아미타 아미타',
    '두려워도 괜찮을 거라고',
    '(위로하는 그 소리) 거짓말',
    '(뻔한 엔딩 그 스토리)',
    '타임라인 저 아득히 아래 쌓여버리겠지'],
  artist: '달의하루 (Dareharu)',
  duration: 278,
  album: '염라 (Karma)',
  path: 'C:\\Users\\LEE\\Downloads\\Quick Share\\1.mp3',
  imgPath: 'C:\\Users\\LEE\\VTunes\\resource\\현재재생목록\\염라 (Karma).jpg'
};

jest.mock('react-redux');

describe('Album', () => {
  useSelector.mockImplementation((selector) => {
    selector(null);
  });

  test('앨범 영역을 눌렀을 때 가사가 출력된다', () => {
    const view = render(<Album currentMusic={mockCurrentMusic} />);

    const albumDiv = screen.getByTestId('album-div');
    expect(albumDiv).toBeInTheDocument();
    fireEvent.click(albumDiv);

    const lyricsDiv = screen.getByTestId('lyrics-div');
    expect(lyricsDiv).toBeInTheDocument();
    expect(view).toMatchSnapshot();
  });
})


