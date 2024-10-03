import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';

import { toggleTheme } from '../features/user/userSlice';

import NavLinks from './NavLinks';

import logoImg from '../assets/store.png';

const Navbar = () => {
  const dispatch = useDispatch();

  // 테마 변경하기
  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  // 장바구니 상품 개수
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element ">
        {/* [1] 첫 번째 부분 */}
        <div className="navbar-start">
          {/* 홈페이지 로고 : 클릭 시 홈페이지 이동 */}
          {/* large 사이즈에서만 보여주기 */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center px-2"
          >
            <img src={logoImg} className="w-10" alt="logo" />
          </NavLink>

          {/* 드롭다운 메뉴 아이콘 */}
          <div className="dropdown">
            {/* large 사이즈에서 숨기기 */}
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>

        {/* [2] 가운데 부분 */}
        {/* large 사이즈에서 보여주기 */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal ">
            <NavLinks />
          </ul>
        </div>

        {/* [3] 끝 부분 */}
        <div className="navbar-end">
          {/* 다크/라이트 모드 토글 버튼 */}
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />
            {/* Sun*/}
            <BsSunFill className="swap-on h-4 w-4" />
            {/* Moon */}
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>

          {/* 장바구니 링크*/}
          <NavLink to="cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numItemsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
