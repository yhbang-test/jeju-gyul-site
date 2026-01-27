// src/components/Board/BoardDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import '../../board.css';


export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="board-container">
      <h2>📖 게시글 상세 보기</h2>
      <div className="write-form">
        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
          {id}번 게시글 제목입니다.
        </h3>
        <p style={{ minHeight: '200px', padding: '20px 0' }}>
          여기에 게시글 내용이 들어갑니다. (나중에 서버에서 받아올 예정)
        </p>
        <div className="board-btn-group">
          <button className="btn secondary" onClick={() => navigate('/board')}>
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
}