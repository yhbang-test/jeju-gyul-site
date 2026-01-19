import { useState, useMemo, useEffect } from 'react';
import type { OrderForm } from '../../types/order';
import { useNavigate } from 'react-router-dom';
import DaumPostcodeEmbed from 'react-daum-postcode'; // 다음 주소 api
import '../../order.css';

// 1. Props 타입 정의: App.tsx에서 userName을 내려받습니다.
interface OrderPageProps {
  userName: string | null;
}

export default function OrderPage({ userName }: OrderPageProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // 주소창 팝업 열림 상태

  // 주소 선택 완료 시 실행될 함수
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    // 선택된 주소를 order 상태에 반영
    setOrder(prev => ({ ...prev, address: fullAddress }));
    setIsOpen(false); // 주소창 닫기
  };

  // 2. 상태 관리: 연락처와 주소 필드를 추가했습니다.
  const [order, setOrder] = useState<Partial<OrderForm>>({
    customerName: '',
    phoneNumber: '', 
    address: '',     
    items: []
  });

  const [selectedProductId, setSelectedProductId] = useState('halla'); 
  const [selectedKg, setSelectedKg] = useState(5); 

  const productList = [
    { id: 'halla', name: '한라봉', basePrice: 7000, icon: '🍊' },
    { id: 'red', name: '레드향', basePrice: 8400, icon: '🧡' },
    { id: 'cheon', name: '천혜향', basePrice: 7600, icon: '✨' }
  ];

  useEffect(() => {
  if (userName) {
    // 1. 로그인 성공 시: 데이터 자동 삽입
    const mockUserData = {
      customerName: userName,
      phoneNumber: '010-1234-5678',
      address: '제주특별자치도 서귀포시 어느 귤밭길 1'
    };
    setOrder(prev => ({ ...prev, ...mockUserData }));
  } else {
    // 2. 로그아웃 시 (userName이 null일 때): 정보 싹 비우기 (초기화)
    setOrder({
      customerName: '',
      phoneNumber: '',
      address: '',
      items: []
     });
    }
  }, [userName]); // userName 상태가 바뀔 때마다(로그인/로그아웃) 감지해서 작동

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
          {/* 1. 상품 종류 선택 */}
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

          {/* 2. 무게 선택 및 가격 확인 */}
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

        {/* 3. 주문자 정보 섹션: 자동 완성 + 주소 API 통합 */}
          <section className="form-group">
            <div className="section-title-box" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <h3>주문자 정보</h3>
            {userName && (
              <span style={{ fontSize: '12px', color: '#ff7a00', fontWeight: 'bold', backgroundColor: '#fff4e6', padding: '4px 8px', borderRadius: '4px' }}>
            ✨ 회원 정보 자동 입력됨
          </span>
           )}
        </div>

        <div className="input-list">
        {/* 성함 입력 */}
        <input 
        type="text" 
        placeholder="성함" 
        value={order.customerName || ''}
        onChange={(e) => setOrder({...order, customerName: e.target.value})}
        />

        {/* 연락처 입력 */}
        <input 
        type="text" 
        placeholder="연락처 (- 없이 입력)" 
        value={order.phoneNumber || ''}
        onChange={(e) => setOrder({...order, phoneNumber: e.target.value})}
        />

        {/* 배송지 주소 (입력창 + 검색 버튼) */}
        <div className="address-group" style={{ display: 'flex', gap: '10px' }}>
        <input 
        type="text" 
        placeholder="배송지 주소" 
        value={order.address || ''} 
        readOnly // 직접 타이핑 방지 (API로만 입력)
        onClick={() => setIsOpen(true)} // 클릭해도 주소창 뜨게
        style={{ flex: 1, cursor: 'pointer', backgroundColor: '#f9f9f9' }}
        />
        <button 
        type="button" 
        onClick={() => setIsOpen(true)}
        className="address-search-btn"
        style={{ 
        padding: '0 15px', 
        backgroundColor: '#2D5A27', 
        color: 'white', 
        border: 'none', 
        borderRadius: '8px', 
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        fontSize: '14px'
        }}
        >
        주소 검색
        </button>
        </div>

        {/* 주소 검색 모달 로직 */}
        {isOpen && (
        <div className="address-modal-overlay">
        <div className="address-modal">
        <div className="modal-header">
          <span>주소 검색</span>
          <button type="button" onClick={() => setIsOpen(false)}>X</button>
        </div>
        <DaumPostcodeEmbed 
          onComplete={handleComplete} 
          autoClose={false} // 선택 후 바로 닫히는 건 handleComplete에서 제어
        />
        </div>
        </div>
        )}
        </div>
        </section>

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