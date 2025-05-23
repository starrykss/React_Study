import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

import loadingGif from '../images/preloader.gif';

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <Wrapper>
        <img src={loadingGif} alt='Loading' />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }

  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;

  img {
    width: 150px;
  }
`;

export default AuthWrapper;
