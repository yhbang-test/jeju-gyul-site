import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../board.css';

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
}

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mockData = [
      { id: 1, title: '제주 한라봉 진짜 맛있네요!', author: '귤조아', date: '2024-05-20' },
      { id: 2, title: '배송 언제 오나요?', author: 'ㅁㄴㅇ', date: '2024-05-21' },
    ];
    setPosts(mockData);
  }, []);

  return (
    <div className="board-container">
      <h2>📋 고객 소통 게시판</h2>
      
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} onClick={() => navigate(`/board/${post.id}`)}>
              <td>{post.id}</td>
              <td className="title-cell">
                {post.title}
              </td>
              <td>{post.author}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="board-btn-group">
        <button className="btn primary" onClick={() => navigate('/board/write')}>
          글쓰기
        </button>
      </div>
    </div>
  );
}