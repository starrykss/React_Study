import { useNavigation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

const HomeLayout = () => {
  const navigation = useNavigation(); // 'idle', 'loading'
  const isPageLoading = navigation.state === 'loading';
  const value = 'some value';

  return (
    <>
      <Navbar />
      <section className="page">
        {isPageLoading ? (
          <div className="loading"></div>
        ) : (
          <Outlet context={{ value }} /> // 전역 컨텍스트로 전달
        )}
      </section>
    </>
  );
};
export default HomeLayout;
