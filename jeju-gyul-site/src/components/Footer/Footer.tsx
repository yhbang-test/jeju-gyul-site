export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 1. 브랜드 섹션 */}
        <div className="footer-brand">
          <h2 className="footer-logo">JEJU GYUL</h2>
          <p className="footer-slogan">
            가장 제주다운 맛을 <br />
            가장 신선한 상태로 전해드립니다.
          </p> 
        </div>

        {/* 2. 고객센터 섹션 */}
        <div className="footer-info">
          <h3>Customer Center</h3>
          <p className="phone">1588-0000</p>
          <p>평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
          <p>카카오톡 상담: @제주귤농장</p>
        </div>

        {/* 3. 사업자 정보 섹션 */}
        <div className="footer-details">
          <p>상호: 제주귤농업법인 | 대표: 홍길동</p>
          <p>사업자등록번호: 000-00-00000</p>
          <p>주소: 제주특별자치도 서귀포시 어느 귤밭길 1</p>
          <p className="copyright">© 2026 JEJU GYUL. All Rights Reserved.</p>
        </div>
      </div> 
    </footer> 
  );
}