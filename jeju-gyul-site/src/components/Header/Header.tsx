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
          귤 소개
          <ul>
            <li><a href="mainHalla">한라봉</a></li>
            <li>레드향</li>
            <li>천혜향</li>
          </ul>
         </li>

          <li>주문</li>
          
          <li>AS
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
