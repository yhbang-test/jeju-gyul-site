export default function Header() {
  return (
    <header className="header">
      <h1 className="header-logo">JEJU GYUL</h1>

      <nav className="header-nav">
        <ul>
          <li>
            역사
            <ul>
              <li>브랜드 소개</li>
              <li>제주 이야기</li>
            </ul>
          </li>

         <li>
          <a>귤 소개</a>
          <ul>
            <li>한라봉</li>
            <li>레드향</li>
            <li>천혜향</li>
          </ul>
         
         </li>
          <li>주문</li>
          <li>AS</li>
          <li>추후추가</li>
        </ul>
      </nav>
    </header>
  )
}
