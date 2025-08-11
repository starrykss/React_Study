import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import { login } from '../util/auth';
import { AuthContext } from '../store/auth-context';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authContext = useContext(AuthContext);

  // 로그인 이벤트 처리
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      token = await login(email, password);

      authContext.authenticate(token);
    } catch (error) {
      console.log(
        'Authentication failed:',
        error.response?.data || error.message
      );
      Alert.alert(
        'Authentication failed',
        'Could not login you in. Please check your credentials or try again later!'
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  // 로딩 스피너 표시
  if (isAuthenticating) {
    return <LoadingOverlay message='Logging user...' />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
