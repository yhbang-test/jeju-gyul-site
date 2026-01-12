import hisTory from '../../assets/history.jpg'

export default function HeroSection() {
  return (
    <section
      className="section history"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
          url(${hisTory})
        `
      }}
    >
      <h2 className='section h2'>제주에서 온 가장 달콤한 귤</h2>
      <p>
        한라산 바람과 햇살로 키운 프리미엄 감귤 브랜드,
        JEJU GYUL
      </p>

      <p>
        한라봉, 레드향, 천혜향까지 —
        제주가 키운 최고의 귤을 만나보세요.
      </p>
    </section>
  )
}