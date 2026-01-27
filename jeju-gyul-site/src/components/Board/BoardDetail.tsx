import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../board.css';

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string;
}

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!response.ok) throw new Error('글을 불러올 수 없습니다.');
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("데이터 로드 에러:", error);
        alert("게시글을 불러오는 중 오류가 발생했습니다.");
        navigate('/board');
      }
    };

    fetchPost();
  }, [id, navigate]);

  if (!post) {
    return (
      <div className="board-container">
        <p>로딩 중... 🍊</p>
      </div>
    );
  }

  return (
    <div className="board-container">
      <h2>📋 게시글 상세 보기</h2>
      <div className="write-form" style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
        <div style={{ borderBottom: '2px solid #ff7a00', paddingBottom: '10px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>{post.title}</h3>
          <div style={{ fontSize: '14px', color: '#888', display: 'flex', gap: '15px' }}>
            <span>작성자: <strong>{post.author}</strong></span>
            <span>날짜: {post.date}</span>
          </div>
        </div>

        {/* whiteSpace 속성의 오타와 따옴표를 수정했습니다 */}
        <p style={{ minHeight: '300px', padding: '20px 0', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          {post.content}
        </p>

        <div className="board-btn-group" style={{ borderTop: '1px solid #eee', paddingTop: '20px', display: 'flex' }}>
          <button className="btn secondary" onClick={() => navigate('/board')}>
            목록으로
          </button>
          
          <button 
            className="btn danger" 
            style={{ 
              marginLeft: 'auto', 
              background: '#ff4d4d', 
              color: 'white', 
              border: 'none', 
              padding: '8px 15px', 
              borderRadius: '6px', 
              cursor: 'pointer' 
            }}
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
}