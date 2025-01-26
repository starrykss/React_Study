import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';

// 에러 처리 미들웨어 (GraphQL과 네트워크 에러에 대한 자세한 정보 제공)
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  // 네트워크 레벨 에러 처리
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// HTTP 연결 관련 설정
const httpLink = new HttpLink({
  uri: GITHUB_GRAPHQL_API,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

// Apollo Link 생성 (errorLink가 httpLink 보다 먼저 실행됨.)
const link = ApolloLink.from([errorLink, httpLink]);

// Apollo Client 초기화
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
