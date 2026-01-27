import hisTory from '../../assets/history.jpg';

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="hero-section" 
      /* 🔥 인라인 스타일로 배경 이미지를 확실하게 고정합니다 */
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${hisTory})` 
      }}
    >
      <div className="hero-content">
        <h2 className="hero-title">제주에서 온 가장 달콤한 귤</h2>
        <p className="hero-subtitle">
          한라산 바람과 햇살로 키운 프리미엄 감귤 브랜드, <br />
          <strong>JEJU GYUL</strong>
        </p>
        <p className="hero-description">
          <span>한라봉, 레드향, 천혜향</span>까지 — <br />
          제주 농장의 진심이 담긴 최고의 귤을 지금 바로 만나보세요.
        </p>
      </div>
    </section>
  );
}