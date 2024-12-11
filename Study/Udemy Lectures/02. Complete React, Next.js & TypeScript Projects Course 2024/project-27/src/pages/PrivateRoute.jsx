import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();

  // 인증 확인
  const isUser = isAuthenticated && user;

  // 인증이 안되었을 경우, 로그인 페이지(/login)로 이동
  if (!isUser) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default PrivateRoute;
