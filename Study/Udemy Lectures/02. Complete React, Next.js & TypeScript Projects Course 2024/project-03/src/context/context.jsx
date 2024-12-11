import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

// Custom Hook
export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [name, setName] = useState('peter');

  return (
    <GlobalContext.Provider value={{ name, setName }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;

//
// #. 사용법
//

// [1] 최상위 파일(main.jsx)에서 AppContext를 import 한 후, <App /> 컴포넌트를 <AppContext> 태그로 감싸준다.

// > ./src/main.jsx

// import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';

// import AppContext from './context/context.jsx';

// createRoot(document.getElementById('root')).render(
//   <AppContext>
//     <App />
//   </AppContext>
// );

// [2] 전역 상태 변수를 사용하고자 하는 컴포넌트에서 useGlobalContext 커스텀 훅을 불러와서 사용한다.

// > ./src/App.jsx (예)

// import { useGlobalContext } from '/context/context'
//
// const { name, setName } = useGlobalContext();
// console.log(name);
