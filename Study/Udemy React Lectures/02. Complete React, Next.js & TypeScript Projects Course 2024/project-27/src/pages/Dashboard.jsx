import { useContext } from 'react';

import loadingImage from '../images/preloader.gif';

import { Info, Repos, User, Search, Navbar, Copyright } from '../components';
import { GithubContext } from '../context/context';

const Dashboard = () => {
  const { isLoading } = useContext(GithubContext);

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img
          src={loadingImage}
          className='loading-img'
          alt='Loading'
          style={{ width: '128px', height: '128px' }}
        />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
      <Copyright />
    </main>
  );
};

export default Dashboard;
