import { Outlet } from 'react-router-dom';

import Wrapper from '../../assets/wrappers/SharedLayout';

import { BigSidebar, Navbar, SmallSidebar, Copyright } from '../../components';

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
            <Copyright />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
