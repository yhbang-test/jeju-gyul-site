import { useState, useMemo } from 'react';
import type { OrderForm } from '../../types/order';
import { useNavigate } from 'react-router-dom';
import '../../order.css';

export default function OrderPage() {
  const navigate = useNavigate();

  // 1. 상태 관리: 기존 order 유지 + 선택된 상품 id와 무게(kg) 추가
  const [order, setOrder] = useState<Partial<OrderForm>>({
    customerName: '',
    items: []
  });

  const [selectedProductId, setSelectedProductId] = useState('halla'); // 기본값 한라봉
  const [selectedKg, setSelectedKg] = useState(5); // 기본값 5kg

  // 2. 상품 데이터: kg당 단가(basePrice)로 관리하면 계산이 편합니다.
  const productList = [
    { id: 'halla', name: '한라봉', basePrice: 7000, icon: '🍊' },
    { id: 'red', name: '레드향', basePrice: 8400, icon: '🧡' },
    { id: 'cheon', name: '천혜향', basePrice: 7600, icon: '✨' }
  ];

  // 3. 실시간 총 가격 계산
  const totalPrice = useMemo(() => {
    const product = productList.find(p => p.id === selectedProductId);
    return product ? product.basePrice * selectedKg : 0;
  }, [selectedProductId, selectedKg]);

  return (
    <div className="order-page">
      <div className="container">
        <div className="order-header">
          <h1>🍊 싱싱한 제주 귤 주문하기</h1>
          <p>산지 직송으로 보내드리는 프리미엄 감귤</p>
        </div>

        <form className="order-form" onSubmit={(e) => e.preventDefault()}>
          {/* 1. 상품 종류 선택 (카드형) */}
          <section className="form-group">
            <h3>상품 선택</h3>
            <div className="product-grid">
              {productList.map((p) => (
                <div 
                  key={p.id}
                  className={`product-card ${selectedProductId === p.id ? 'active' : ''}`}
                  onClick={() => setSelectedProductId(p.id)}
                >
                  <div className="product-icon">{p.icon}</div>
                  <div className="product-info">
                    <strong>{p.name}</strong>
                    <span>1kg / {p.basePrice.toLocaleString()}원</span>
                  </div>
                  {selectedProductId === p.id && <div className="check-badge">✓</div>}
                </div>
              ))}
            </div>
          </section>

          {/* 2. 무게 선택 및 가격 확인 (새로 추가된 섹션) */}
          <section className="form-group">
            <h3>용량 및 가격 확인</h3>
            <div className="price-calculator">
              <div className="select-wrapper">
                <label htmlFor="kg-select">용량 선택: </label>
                <select 
                  id="kg-select"
                  className="kg-select"
                  value={selectedKg}
                  onChange={(e) => setSelectedKg(Number(e.target.value))}
                >
                  <option value={3}>3kg</option>
                  <option value={5}>5kg</option>
                  <option value={10}>10kg</option>
                </select>
              </div>
              <div className="total-price-info">
                <span>최종 결제 금액:</span>
                <strong className="total-amount">{totalPrice.toLocaleString()}원</strong>
              </div>
            </div>
          </section>

          {/* 3. 주문자 정보 섹션 (기존 유지) */}
          <section className="form-group">
            <h3>주문자 정보</h3>
            <div className="input-list">
              <input 
                type="text" 
                placeholder="성함" 
                onChange={(e) => setOrder({...order, customerName: e.target.value})}
              />
              <input type="text" placeholder="연락처 (- 없이 입력)" />
              <input type="text" placeholder="배송지 주소" />
            </div>
          </section>

          {/* 하단 버튼 영역 (결제 금액 표시 추가) */}
          <div className="button-group">
            <button type="submit" className="order-btn primary">
              {totalPrice.toLocaleString()}원 주문하기
            </button>
            <button 
              type="button" 
              className="order-btn cancel"
              onClick={() => {
                if(confirm("주문을 취소하고 메인으로 돌아갈까요?")) {
                  navigate('/');
                }
              }}
            >
              주문 취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}