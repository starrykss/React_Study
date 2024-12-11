import Title from './components/Title';
import FirstRequest from './components/FirstRequest';
import Headers from './components/Headers';
import PostRequest from './components/PostRequest';
import GlobalInstance from './components/GlobalInstance';
import CustomInstance from './components/CustomInstance';
import Interceptors from './components/Intercepters';

import './axios/global';

function App() {
  return (
    <main>
      <Title />
      <FirstRequest />
      <Headers />
      <PostRequest />
      <GlobalInstance />
      <CustomInstance />
      <Interceptors />
    </main>
  );
}

export default App;
