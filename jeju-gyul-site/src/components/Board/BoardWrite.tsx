import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../board.css';

export default function BoardWrite() {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState({ title: '', content: '' });

  // 🔥 handleSubmit을 비동기(async)로 변경하여 서버 통신을 처리합니다.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...boardData,
          author: '테스트유저' // 나중에 실제 로그인된 userName을 넣을 자리입니다.
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("게시글이 성공적으로 등록되었습니다! 🍊");
        navigate('/board');
      } else {
        alert("등록 실패: " + data.message);
      }
    } catch (error) {
      console.error("게시글 등록 중 오류:", error);
      alert("서버와 통신할 수 없습니다.");
    }
  };

  return (
    <div className="board-container">
      <h2>✍️ 게시글 작성</h2>
      <form className="write-form" onSubmit={handleSubmit}>
        <input 
          className="input-field"
          type="text" 
          placeholder="제목을 입력하세요"
          value={boardData.title}
          onChange={(e) => setBoardData({...boardData, title: e.target.value})}
          required
        />
        <textarea 
          className="textarea-field"
          placeholder="내용을 입력하세요"
          value={boardData.content}
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