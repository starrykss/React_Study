import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authContext = useContext(AuthContext);

  // 회원가입 이벤트 처리
  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);

      authContext.authenticate(token);
    } catch (error) {
      console.log(
        'Authentication failed:',
        error.response?.data || error.message
      );
      Alert.alert(
        'Authentication failed',
        'Could not create user. Please check your input or try again later!'
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  // 로딩 스피너 표시
  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user...' />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
