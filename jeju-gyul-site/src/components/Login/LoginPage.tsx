import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../loginpage.css';

// 1. interface는 컴포넌트 함수 밖(위쪽)으로 꺼내야 합니다.
interface LoginPageProps {
  onLoginSuccess: () => void;
}

// 2. 함수의 인자값으로 { onLoginSuccess }를 명시해줍니다.
export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 3. 로그인이 성공했다고 치고, 부모(App.tsx)의 함수를 실행합니다.
    onLoginSuccess(); 
    
    // 4. 메인 페이지로 이동시킵니다.
    navigate('/'); 
    
    console.log("로그인 성공 처리됨:", formData);
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          <h2 onClick={() => navigate('/')} style={{cursor:'pointer'}}>🍊 JEJU GYUL</h2>
          <p>반가워요! 로그인이 필요해요.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>이메일</label>
            <input 
              type="email" 
              placeholder="example@gyul.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="input-group">
            <label>비밀번호</label>
            <input 
              type="password" 
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">로그인</button>
        </form>

        <div className="login-helper">
          <button onClick={() => navigate('/signup')}>회원가입</button>
          <button>비밀번호 찾기</button>
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