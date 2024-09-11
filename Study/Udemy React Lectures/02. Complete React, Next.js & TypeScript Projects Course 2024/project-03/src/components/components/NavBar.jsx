import { useState, createContext, useContext } from 'react';

import NavLinks from './NavLinks';

// 전역 상태 관리
export const NavbarContext = createContext();

// Custom Hook
export const useAppContext = () => useContext(NavbarContext);

const NavBar = () => {
  const [user, setUser] = useState({ name: 'something' });

  const logout = () => {
    setUser(null);
  };

  return (
    <NavbarContext.Provider value={{ user, logout }}>
      <nav className="navbar">
        <h5>CONTEXT API</h5>
        <NavLinks />
      </nav>
    </NavbarContext.Provider>
  );
};

export default NavBar;
