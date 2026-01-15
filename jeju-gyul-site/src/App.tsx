import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header'
import HeroSection from './components/Hero/HeroSection'
import ProductSection from './components/Product/ProductSection'
import EventSection from './components/Event/EventSection'
import Footer from './components/Footer/Footer'
import OrderPage from './components/Order/OrderPage'

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* 1. 메인 페이지: 기존 섹션들을 모두 여기에 모읍니다. */}
        <Route path="/" element={
          <>
            <HeroSection />
            <ProductSection />
            <EventSection />
          </>
        } />

        {/* 2. 주문 페이지: 클릭 시 이동할 새 화면 */}
        <Route path="/order" element={<OrderPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App
