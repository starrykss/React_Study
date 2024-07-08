import { useEffect } from 'react';
import {
  Outlet,
  useNavigation,
  useLoaderData,
  useSubmit,
} from 'react-router-dom';

import { getTokenDuration } from '../util/auth';

import MainNavigation from '../components/MainNavigation';
import Copyright from '../components/Copyright';

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();
  // const navigation = useNavigation();

  useEffect(() => {
    return () => {
      if (!token) {
        return;
      }

      if (token === 'EXPIRED') {
        submit(null, {
          action: '/logout',
          method: 'post',
        });
      }

      const tokenDuration = getTokenDuration();
      console.log(tokenDuration); // 토큰 인증 만료 시간 출력

      setTimeout(() => {
        submit(null, {
          action: '/logout',
          method: 'post',
        });
      }, tokenDuration);
    };
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
      <Copyright />
    </>
  );
}

export default RootLayout;
