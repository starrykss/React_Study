import { NavLink } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Navbar';

import logo from '../assets/cocktail.svg';

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <NavLink to="/" className="logo">
          <img src={logo} alt="logo" className="logo-icon" />
          <span>MixMaster</span>
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/newsletter" className="nav-link">
            Newsletter
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
