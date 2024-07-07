import { Outlet, useNavigation } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import Copyright from '../components/Copyright';

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
      <Copyright />
    </>
  );
}

export default RootLayout;
