// 사용자 정보 로컬 스토리지에 넣기
export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// 사용자 정보 로컬 스토리지에서 지우기
export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

// 로컬 스토리지에서 사용자 정보 가져오기
export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  const user = result ? JSON.parse(result) : null;

  return user;
};
