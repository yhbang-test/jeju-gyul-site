import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../board.css';

export default function BoardWrite() {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState({ title: '', content: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("게시글이 등록되었습니다!");
    navigate('/board');
  };

  return (
    <div className="board-container">
      <h2>✍️ 게시글 작성</h2>
      <form className="write-form" onSubmit={handleSubmit}>
        <input 
          className="input-field"
          type="text" 
          placeholder="제목을 입력하세요"
          onChange={(e) => setBoardData({...boardData, title: e.target.value})}
          required
        />
        <textarea 
          className="textarea-field"
          placeholder="내용을 입력하세요"
          onChange={(e) => setBoardData({...boardData, content: e.target.value})}
          required
        />
        <div className="board-btn-group">
          <button type="button" className="btn secondary" onClick={() => navigate('/board')}>
            취소
          </button>
          <button type="submit" className="btn primary">
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}