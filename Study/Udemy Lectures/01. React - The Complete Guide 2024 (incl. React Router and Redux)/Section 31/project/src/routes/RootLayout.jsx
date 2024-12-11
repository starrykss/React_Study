import { Outlet } from 'react-router-dom';

import MainHeader from '../components/MainHeader';
import Copyright from '../components/Copyright';

function RootLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
      <Copyright />
    </>
  );
}

export default RootLayout;
