import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DaumPostcodeEmbed from 'react-daum-postcode';
import '../../order.css';

interface OrderPageProps {
  userName: string | null;
}

export default function OrderPage({ userName }: OrderPageProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // 주소 모달 제어
  const [paymentMethod, setPaymentMethod] = useState('kakao'); // ✅ 결제 수단 상태 추가

  // 1. 주문서 상태 관리
  const [order, setOrder] = useState({
    customerName: '',
    phoneNumber: '',
    address: '',
    detailAddress: '',
  });

  const [selectedProductId, setSelectedProductId] = useState('halla');
  const [selectedKg, setSelectedKg] = useState(5);

  const productList = [
    { id: 'halla', name: '한라봉', basePrice: 7000, icon: '🍊' },
    { id: 'red', name: '레드향', basePrice: 8400, icon: '🧡' },
    { id: 'cheon', name: '천혜향', basePrice: 7600, icon: '✨' }
  ];

  // 2. 로그인된 사용자 정보 자동 채우기
  useEffect(() => {
    if (userName) {
      setOrder(prev => ({
        ...prev,
        customerName: userName,
      }));
    }
  }, [userName]);

  // 3. 실시간 가격 계산
  const totalPrice = useMemo(() => {
    const product = productList.find(p => p.id === selectedProductId);
    return product ? product.basePrice * selectedKg : 0;
  }, [selectedProductId, selectedKg]);

  // 4. 주소 선택 완료 핸들러
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    if (data.addressType === 'R') {
      let extraAddress = '';
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setOrder(prev => ({ ...prev, address: fullAddress }));
    setIsOpen(false);
  };

  // 🔥 5. 카카오페이 결제 준비 API 호출 (핵심 로직)
  const handleKakaoPay = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payment/kakao/ready', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemName: productList.find(p => p.id === selectedProductId)?.name,
          totalAmount: totalPrice,
          quantity: selectedKg,
          customerName: order.customerName
        }),
      });

      const data = await response.json();
      
      if (data.next_redirect_pc_url) {
        // 카카오페이 결제 페이지(QR코드)로 리다이렉트
        window.location.href = data.next_redirect_pc_url;
      }
    } catch (error) {
      console.error("카카오페이 호출 오류:", error);
      alert("결제 서버와 통신 중 오류가 발생했습니다.");
    }
  };

  // 6. 주문 제출 핸들러 (수정됨)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'kakao') {
      handleKakaoPay();
    } else {
      // 무통장입금이나 카드 결제는 나중에 구현
      console.log("일반 주문 데이터:", { ...order, paymentMethod, totalPrice });
      alert(`${paymentMethod} 결제는 아직 준비 중입니다. 카카오페이를 이용해 주세요!`);
    }
  };

  return (
    <div className="order-page">
      <div className="container">
        <form className="order-form" onSubmit={handleSubmit}>
          
          {/* 1. 상품 선택 섹션 */}
          <section className="form-group slim">
            <h3 className="section-title">상품 종류 선택</h3>
            <div className="product-grid slim">
              {productList.map((p) => (
                <div 
                  key={p.id}
                  className={`product-card slim ${selectedProductId === p.id ? 'active' : ''}`}
                  onClick={() => setSelectedProductId(p.id)}
                >
                  <span className="p-icon">{p.icon}</span>
                  <div className="p-info">
                    <strong>{p.name}</strong>
                    <span>{p.basePrice.toLocaleString()}원</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. 배송 정보 섹션 */}
          <section className="form-group slim">
            <h3 className="section-title">배송 정보 입력</h3>
            <div className="input-list slim">
              <div className="input-row">
                <input 
                  type="text" 
                  placeholder="성함" 
                  value={order.customerName} 
                  className="order-input"
                  onChange={(e) => setOrder({...order, customerName: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="연락처" 
                  value={order.phoneNumber} 
                  className="order-input"
                  onChange={(e) => setOrder({...order, phoneNumber: e.target.value})}
                  required
                />
              </div>
              <div className="address-input-wrapper">
                <input 
                  type="text" 
                  placeholder="주소 검색을 눌러주세요" 
                  value={order.address} 
                  readOnly 
                  onClick={() => setIsOpen(true)}
                  className="order-input address-main"
                  required
                />
                <button type="button" onClick={() => setIsOpen(true)} className="address-search-btn">주소 검색</button>
              </div>
              <input 
                type="text" 
                placeholder="상세 주소 (호수, 동 등)" 
                value={order.detailAddress}
                onChange={(e) => setOrder({...order, detailAddress: e.target.value})}
                className="order-input detail-address"
                required
              />
            </div>
          </section>

          {/* ✅ 3. 결제 수단 선택 섹션 추가 */}
          <section className="form-group slim">
            <h3 className="section-title">결제 수단 선택</h3>
            <div className="payment-grid">
              <button 
                type="button" 
                className={`pay-btn ${paymentMethod === 'kakao' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('kakao')}
              >
                💛 카카오페이
              </button>
              <button 
                type="button" 
                className={`pay-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                💳 신용카드
              </button>
              <button 
                type="button" 
                className={`pay-btn ${paymentMethod === 'bank' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('bank')}
              >
                🏦 무통장입금
              </button>
            </div>
          </section>

          {/* 4. 가격 요약 및 무게 선택 */}
          <div className="price-summary-bar">
            <div className="kg-selection">
              <span>용량 선택: </span>
              <select 
                value={selectedKg} 
                onChange={(e) => setSelectedKg(Number(e.target.value))} 
                className="kg-select-slim"
              >
                <option value={3}>3kg</option>
                <option value={5}>5kg</option>
                <option value={10}>10kg</option>
              </select>
            </div>
            <div className="total-text">
              최종 결제 금액: <strong>{totalPrice.toLocaleString()}원</strong>
            </div>
          </div>

          <div className="button-group slim">
            <button type="submit" className="order-btn primary">주문하기</button>
            <button type="button" className="order-btn cancel" onClick={() => navigate('/')}>취소</button>
          </div>
        </form>
      </div>

      {/* 주소 모달 */}
      {isOpen && (
        <div className="address-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="address-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span>주소 찾기</span>
              <button type="button" onClick={() => setIsOpen(false)}>✕</button>
            </div>
            <div className="postcode-wrapper">
              <DaumPostcodeEmbed onComplete={handleComplete} autoClose={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}