import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../loginpage.css';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  // 🔥 핵심: await를 쓰기 위해 함수 앞에 async를 붙였습니다.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // 부모 컴포넌트(App.tsx)의 로그인 상태를 변경합니다.
        onLoginSuccess(); 
        navigate('/');
        alert(`${data.userName}님, 제주 귤 농장에 오신 걸 환영합니다!`);
      } else {
        // 서버에서 보낸 에러 메시지(비번 틀림 등)를 띄웁니다.
        alert(data.message);
      }
    } catch (error) {
      console.error("로그인 요청 중 오류 발생:", error);
      alert("서버와 통신할 수 없습니다. 서버(Node.js)가 켜져 있는지 확인해 주세요!");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          {/* 로고 클릭 시 메인으로 이동 */}
          <h2 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            🍊 JEJU GYUL
          </h2>
          <p>반가워요! 로그인이 필요해요.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>이메일</label>
            <input 
              type="email" 
              placeholder="example@gyul.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div className="input-group">
            <label>비밀번호</label>
            <input 
              type="password" 
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">로그인</button>
        </form>

        <div className="login-helper">
          <button type="button" onClick={() => navigate('/signup')}>회원가입</button>
          <button type="button">비밀번호 찾기</button>
        </div>

        <div className="social-login-group">
          <p>간편 로그인</p>
          <div className="social-buttons">
            <button type="button" className="social-btn kakao">
              <span className="icon">💬</span> 카카오로 시작
            </button>
            <button type="button" className="social-btn naver">
              <span className="icon">N</span> 네이버로 시작
            </button>
          </div>
        </div>    
      </div>
    </div>
  );
}