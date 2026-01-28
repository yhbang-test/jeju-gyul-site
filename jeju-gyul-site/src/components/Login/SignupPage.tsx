import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../loginpage.css'; // 기존 로그인 페이지와 스타일 공유

export default function SignupPage() {
  const navigate = useNavigate();
  
  // 가입에 필요한 상태 관리
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 비밀번호 일치 확인 (간단한 유효성 검사)
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("회원가입을 축하합니다! 로그인 후 이용해주세요. 🍊");
        navigate('/login');
      } else {
        alert(data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("서버와 통신할 수 없습니다.");
    }
  };

  return (
    <div className="login-page-container"> {/* 레이아웃 통일을 위해 로그인 컨테이너 재사용 */}
      <div className="login-card signup-card">
        <div className="login-header">
          <h2 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            🍊 JEJU GYUL
          </h2>
          <p>새로운 가족이 되어주세요!</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>이메일 (아이디)</label>
            <input 
              type="email" 
              placeholder="example@gyul.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required 
            />
          </div>

          <div className="input-group">
            <label>이름</label>
            <input 
              type="text" 
              placeholder="성함을 입력하세요"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required 
            />
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input 
              type="password" 
              placeholder="8자 이상 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required 
            />
          </div>

          <div className="input-group">
            <label>비밀번호 확인</label>
            <input 
              type="password" 
              placeholder="비밀번호를 한번 더 입력하세요"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required 
            />
          </div>

          <div className="input-group">
            <label>연락처</label>
            <input 
              type="tel" 
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required 
            />
          </div>

          <button type="submit" className="login-submit-btn">가입하기</button>
        </form>

        <div className="login-helper">
          <p>이미 계정이 있으신가요?</p>
          <button type="button" onClick={() => navigate('/login')}>로그인하러 가기</button>
        </div>
      </div>
    </div>
  );
}