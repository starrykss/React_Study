import Copyright from '../components/Copyright';
import Layout from '../components/layout/Layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Copyright />
    </Layout>
  );
}

export default MyApp;
