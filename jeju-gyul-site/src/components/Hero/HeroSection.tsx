import hisTory from '../../assets/history.jpg'

export default function HeroSection() {
  return (
    <section
      className="section history"
      style={{
        /* 배경 이미지 설정 */
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
          url(${hisTory})
        `,
        /* 꽉 채우기 위한 강제 설정 */
        width: '100vw',        // 화면 가로 100% 강제
        height: '100vh',       // 화면 세로 100% 강제
        backgroundSize: 'cover',   // 비율 깨짐 방지하며 꽉 채움
        backgroundPosition: 'center', // 중앙 기준
        backgroundRepeat: 'no-repeat',
        margin: '0',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',   // 부모 요소가 좁아도 화면 끝까지 강제로 늘리는 트릭
        marginRight: '-50vw'
      }}
    >
      <h2 className='section h2'>제주에서 온 가장 달콤한 귤</h2>
      <p className='sub-title'>
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