import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  // 🔥 DB에서 데이터를 가져오는 함수
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      if (!response.ok) throw new Error('데이터 로드 실패');
      
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("게시판 로드 중 오류:", error);
      alert("게시글을 불러올 수 없습니다.");
    }
  };

  useEffect(() => {
    fetchPosts();
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
          {posts.length > 0 ? (
            posts.map(post => (
              <tr key={post.id} onClick={() => navigate(`/board/${post.id}`)}>
                <td>{post.id}</td>
                <td className="title-cell">{post.title}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ padding: '50px', color: '#999' }}>
                등록된 게시글이 없습니다. 🍊
              </td>
            </tr>
          )}
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