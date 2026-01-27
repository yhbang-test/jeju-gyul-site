import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  userName: string | null;
  onLogout: () => void;
}

export default function Header({ userName, onLogout }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollMenu = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate(`/#${targetId}`);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-logo">
          <Link to="/">JEJU <span>GYUL</span></Link>
        </h1>
      </div>

      <nav className="header-nav">
        <ul>
          <li><a href="#home" onClick={(e) => handleScrollMenu(e, 'home')}>소개</a></li>
          <li><a href="#products" onClick={(e) => handleScrollMenu(e, 'products')}>귤 소개</a></li>
          <li><a href="#event" onClick={(e) => handleScrollMenu(e, 'event')}>이벤트</a></li>
          <li><Link to="/order">주문</Link></li>
          {/* 드롭다운 대신 직접 나열 */}
          <li><Link to="/board">게시판</Link></li>
          <li><Link to="/qa">Q&A</Link></li>
        </ul>
      </nav>

      <div className="header-right">
        {userName ? (
          <div className="user-info">
            <span className="welcome-msg"><strong>{userName}</strong>님</span>
            <button onClick={onLogout} className="logout-btn">로그아웃</button>
          </div>
        ) : (
          <Link to="/login" className="login-link">로그인</Link>
        )}
      </div>
    </header>
  );
}