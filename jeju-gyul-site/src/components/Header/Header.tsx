import { Link,useLocation,useNavigate } from 'react-router-dom';

interface HeaderProps {
  userName: string | null;
  onLogout: () => void;
}

export default function Header({ userName, onLogout }: HeaderProps) {
  
  const location = useLocation();
  const navigate = useNavigate();

  // 💡 방어 코드 함수: 클릭 시 현재 위치를 파악해서 동작함
  const handleScrollMenu = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // 만약 현재 경로가 메인이 아니라면?
    if (location.pathname !== '/') {
      e.preventDefault(); // 기본 앵커 동작 막기
      navigate(`/#${targetId}`); // 메인 페이지의 해당 위치로 이동 시킴
    }
    // 메인 페이지라면 기존처럼 <a> 태그의 href="#id"가 자연스럽게 동작함
  };

  return (
    <header className="header">
      {/* 1. 왼쪽: 로고 영역 */}
      <div className="header-left">
        <h1 className="header-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>JEJU GYUL</Link>
        </h1>
      </div>

      {/* 2. 가운데: 메인 메뉴 영역 */}
      <nav className="header-nav">
        <ul>
          {/* onClick에 방어 함수를 연결합니다 */}
          <li>
            <a href="#home" onClick={(e) => handleScrollMenu(e, 'home')}>소개</a>
          </li>
          <li>
            <a href="#products" onClick={(e) => handleScrollMenu(e, 'products')}>귤 소개</a>
          </li>
          <li>
            <a href="#event" onClick={(e) => handleScrollMenu(e, 'event')}>이벤트</a>
          </li>
          <li><Link to="/order">주문</Link></li>
          <li className="dropdown">
            소통해요
            <ul>
              <li><Link to="/board">게시판</Link></li>
              <li>QA</li>
            </ul>
          </li> 
        </ul>
      </nav>

      {/* 3. 오른쪽: 로그인/사용자 정보 영역 (하나로 통합) */}
      <div className="header-right">
        {userName ? (
        /* 1) userName이 있을 때 (로그인 된 경우) */
          <div className="user-info">
            <span className="welcome-msg">
              <strong>{userName}</strong>님 환영해요!
            </span>
          <button onClick={onLogout} className="logout-btn">로그아웃</button>
          </div>
        ) : (
      /* 2) userName이 없을 때 (로그인 안 된 경우) */
        <Link to="/login" className="login-link">로그인</Link>
        )}
      </div>
    </header>
  );
}