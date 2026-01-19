// BoardPage.tsx (게시판 메인 예시)
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../board.css';

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
}

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>([]); // 게시글 데이터 상태

  // 1. 서버(Spring)에서 데이터 가져오는 로직 (나중에 fetch/axios로 교체)
  useEffect(() => {
    const mockData = [
      { id: 1, title: '제주 한라봉 진짜 맛있네요!', author: '귤조아', date: '2024-05-20' },
      { id: 2, title: '배송 언제 오나요?', author: 'ㅁㄴㅇ', date: '2024-05-21' },
    ];
    setPosts(mockData);
  }, []);

  return (
    <div className="board-container" style={{ padding: '100px 20px' }}>
      <h2>📋 고객 소통 게시판</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
              <td>{post.id}</td>
              <td style={{ textAlign: 'left', padding: '15px' }}>
                <Link to={`/board/${post.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                  {post.title}
                </Link>
              </td>
              <td>{post.author}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Link to="/board/write">
          <button style={{ padding: '10px 20px', backgroundColor: '#ff7a00', color: 'white', border: 'none', borderRadius: '5px' }}>
            글쓰기
          </button>
        </Link>
      </div>
    </div>
  );
}