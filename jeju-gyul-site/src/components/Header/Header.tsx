import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className="header">
      <h1 className="header-logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>JEJU GYUL</Link>
      </h1>

      <nav className="header-nav">
        <ul>
          {/* href="#id" 형식을 사용하여 이동할 위치를 지정합니다 */}
          <li><a href="#home">소개</a></li>
          <li><a href="#products">귤 소개</a></li>
          <li><a href="#event">이벤트</a></li>
          <li><Link to="/order">주문</Link></li>
          <li className="dropdown">
            소통해요
            <ul>
              <li>게시판</li>
              <li>QA</li>
            </ul>
          </li> 
        </ul>
      </nav>
    </header>
  )
}