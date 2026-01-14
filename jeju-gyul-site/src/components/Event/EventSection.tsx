import miniGyul from '../../assets/Eventicon.jpg'
export default function EventSection() {
  return (
    <section id="event" className="event-section">
      <img src={miniGyul} className="event-deco-img" alt="deco" />
      <div className="event-container">
        <div className="event-badge">LIMITED EVENT</div>
        <h2 className="event-title">지금만 만날 수 있는 산지직송 할인</h2>
        <p className="event-desc">
          첫 구매 고객께는 제주 감귤 박스 10% 할인 쿠폰과<br />
          귀여운 귤잎 모양 책갈피를 선물로 드립니다.
        </p>
        <button className="event-button">이벤트 참여하기</button>
      </div>
    </section>
  );
}