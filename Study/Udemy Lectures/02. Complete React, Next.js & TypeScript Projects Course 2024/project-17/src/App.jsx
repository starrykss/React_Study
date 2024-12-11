// components
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Copyright from './components/Copyright';

import { useGlobalContext } from './contexts/context';

function App() {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <main>
        <div className="loading" style={{ marginTop: '6rem' }}></div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <CartContainer />
      <Copyright />
    </main>
  );
}

export default App;
