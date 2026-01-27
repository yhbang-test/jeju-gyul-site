import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DaumPostcodeEmbed from 'react-daum-postcode';
import '../../order.css';

interface OrderPageProps {
  userName: string | null;
}

export default function OrderPage({ userName }: OrderPageProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // 모달 제어 상태

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

  useEffect(() => {
    if (userName) {
      setOrder(prev => ({
        ...prev,
        customerName: userName,
        phoneNumber: '010-1234-5678',
        address: '제주특별자치도 서귀포시 어느 귤밭길 1',
        detailAddress: ''
      }));
    }
  }, [userName]);

  const totalPrice = useMemo(() => {
    const product = productList.find(p => p.id === selectedProductId);
    return product ? product.basePrice * selectedKg : 0;
  }, [selectedProductId, selectedKg]);

  // 주소 선택 완료 시 실행
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    if (data.addressType === 'R') {
      let extraAddress = '';
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setOrder(prev => ({ ...prev, address: fullAddress }));
    setIsOpen(false); // ✅ 주소 선택 시 모달 닫기
  };

  return (
    <div className="order-page">
      <div className="container">
        <header className="order-header">
          <h1>🍊 제주 귤 주문</h1>
        </header>

        <form className="order-form" onSubmit={(e) => e.preventDefault()}>
          {/* 1. 상품 선택 (가로형 슬림 배치) */}
          <section className="form-group slim">
            <h3 className="section-title">상품 선택</h3>
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

          {/* 2. 배송 정보 (컴팩트 배치) */}
          <section className="form-group slim">
            <h3 className="section-title">배송 정보</h3>
            <div className="input-list slim">
              <div className="input-row">
                <input type="text" placeholder="성함" value={order.customerName} className="order-input" />
                <input type="text" placeholder="연락처" value={order.phoneNumber} className="order-input" />
              </div>
              <div className="address-input-wrapper">
                <input 
                  type="text" 
                  placeholder="주소 검색을 눌러주세요" 
                  value={order.address} 
                  readOnly 
                  className="order-input address-main"
                />
                <button type="button" onClick={() => setIsOpen(true)} className="address-search-btn">주소 검색</button>
              </div>
              <input 
                type="text" 
                placeholder="상세 주소 (호수, 동 등)" 
                value={order.detailAddress}
                onChange={(e) => setOrder({...order, detailAddress: e.target.value})}
                className="order-input detail-address"
              />
            </div>
          </section>

          {/* 3. 결제 요약 */}
          <div className="price-summary-bar">
            <select value={selectedKg} onChange={(e) => setSelectedKg(Number(e.target.value))} className="kg-select-slim">
              <option value={3}>3kg</option>
              <option value={5}>5kg</option>
              <option value={10}>10kg</option>
            </select>
            <div className="total-text">최종 결제 금액: <strong>{totalPrice.toLocaleString()}원</strong></div>
          </div>

          <div className="button-group slim">
            <button type="submit" className="order-btn primary">주문하기</button>
            <button type="button" className="order-btn cancel" onClick={() => navigate('/')}>취소</button>
          </div>
        </form>
      </div>

      {/* 팝업 모달: 주소 검색 API는 오직 이 안에만 존재 */}
      {isOpen && (
        <div className="address-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="address-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span>주소 찾기</span>
              <button type="button" onClick={() => setIsOpen(false)}>✕</button>
            </div>
            {/* ✅ API가 모달 내부에 포함됨 */}
            <div className="postcode-wrapper">
              <DaumPostcodeEmbed onComplete={handleComplete} autoClose={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}