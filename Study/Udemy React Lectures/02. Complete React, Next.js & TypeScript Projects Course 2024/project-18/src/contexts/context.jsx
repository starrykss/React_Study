import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// 현재 다크 모드일 경우, 기본으로 다크 모드 설정하기
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches;
  const storedDarkMode = localStorage.getItem('darkTheme');

  if (storedDarkMode === null) {
    return prefersDarkMode;
  }

  // console.log(prefersDarkMode);
  return storedDarkMode === 'true';
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode()); // 다크 모드
  const [searchTerm, setSearchTerm] = useState('orangutan'); // 검색어

  // 다크 모드 전환 기능
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;

    setIsDarkTheme(newDarkTheme);

    // VanillaJS를 사용하여 클래스 추가/삭제(토글)
    // const body = document.querySelector('body');
    // body.classList.toggle('dark-theme', newDarkTheme);

    // 로컬 스토리지에 저장하기
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  // 다크 모드 기본값 설정하기
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  // 전역으로 관리할 상태 모음
  const data = {
    isDarkTheme,
    toggleDarkTheme,
    searchTerm,
    setSearchTerm,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

// 커스텀 훅
export const useGlobalContext = () => useContext(AppContext);
