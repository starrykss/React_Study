import { useRef } from 'react';

import { useGlobalContext } from '../context';

import sublinks from '../data';

const Submenu = () => {
  const { pageId, setPageId } = useGlobalContext();
  const submenuContainer = useRef(null);

  // 현재 메뉴 찾기
  const currentPage = sublinks.find((item) => item.pageId === pageId);

  // 서브메뉴 숨기기 기능
  const handleMouseLeave = (event) => {
    const submenu = submenuContainer.current;

    const { left, right, bottom } = submenu.getBoundingClientRect();
    const { clientX, clientY } = event; // 마우스 커서 위치

    // 영역을 벗어날 경우 메뉴 숨기기
    if (clientX < left + 1 || clientX > right - 1 || clientY > bottom - 1) {
      setPageId(null);
    }
  };

  return (
    <div
      className={currentPage ? 'submenu show-submenu' : 'submenu'}
      onMouseLeave={handleMouseLeave}
      ref={submenuContainer}
    >
      <h5>{currentPage?.page}</h5>
      <div
        className="submenu-links"
        style={{
          gridTemplateColumns:
            currentPage?.links?.length > 3 ? '1fr 1fr' : '1fr',
        }}
      >
        {currentPage?.links?.map((link) => {
          const { id, url, label, icon } = link;

          return (
            <a key={id} href={url}>
              {icon}
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
};
export default Submenu;
