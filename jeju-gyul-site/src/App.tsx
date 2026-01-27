import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// 컴포넌트 임포트
import Header from './components/Header/Header'
import HeroSection from './components/Hero/HeroSection'
import ProductSection from './components/Product/ProductSection'
import EventSection from './components/Event/EventSection'
import Footer from './components/Footer/Footer'
import OrderPage from './components/Order/OrderPage'
import LoginPage from './components/Login/LoginPage';
import BoardPage from './components/Board/BoardPage';
import BoardDetail from './components/Board/BoardDetail'; // 상세 페이지 컴포넌트 임포
import BoardWrite from './components/Board/BoardWrite';

function App() {
  const [userName, setUserName] = useState<string | null>(null);

  // 로그인 성공 시 실행할 함수
  const handleLoginTest = () => {
    setUserName("ㅁㄴㅇ"); 
  };

  const handleLogout = () => {
    setUserName(null); 
  };

  return (
    <Router>
      {/* 1. 공통 헤더 */}
      <Header userName={userName} onLogout={handleLogout} />
      
      <Routes>
        {/* 2. 메인 페이지 (MainPage 컴포넌트 대신 직접 섹션 조립) */}
        <Route path="/" element={
          <>
            <HeroSection />
            <ProductSection />
            <EventSection />
          </>
        }/>
        <Route path="/board" element={<BoardPage />} />
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path="/board/write" element={<BoardWrite />} />
        {/* 3. 주문 페이지 */}
        <Route path="/order" element={<OrderPage userName={userName} />} />
        {/* 4. 로그인 페이지 (함수 전달) */}
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginTest} />} />
      </Routes>
      {/* 5. 공통 푸터 */}
      <Footer />
    </Router>
  );
}

export default App;