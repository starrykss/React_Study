import { Outlet, useNavigation } from 'react-router-dom';

import { Copyright, Header, Loading, Navbar } from '../components';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      <Header /> {/* 헤더 */}
      <Navbar /> {/* 네비게이션바 */}
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet /> {/* 본문 */}
        </section>
      )}
      <Copyright />
    </>
  );
};

export default HomeLayout;
