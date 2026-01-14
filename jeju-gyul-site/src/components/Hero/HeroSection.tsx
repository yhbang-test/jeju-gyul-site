import hisTory from '../../assets/history.jpg';

export default function HeroSection() {
  return (
    // 클래스명을 단순화합니다. (hero-section 하나만 사용)
    <section 
      id="home" 
      className="hero-section" 
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${hisTory})` }}
    >
      <div className="hero-content">
        <h2 className="hero-title">제주에서 온 가장 달콤한 귤</h2>
        <p className="hero-subtitle">
          한라산 바람과 햇살로 키운 프리미엄 감귤 브랜드, <br />
          <strong>JEJU GYUL</strong>
        </p>
        <p className="hero-description">
          한라봉, 레드향, 천혜향까지 — <br />
          제주가 키운 최고의 귤을 만나보세요.
        </p>
      </div>
    </section>
  );
}