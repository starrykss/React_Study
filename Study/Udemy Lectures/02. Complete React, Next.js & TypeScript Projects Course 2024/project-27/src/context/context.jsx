import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState({ show: false, msg: '' });

  // 에러 메시지 표시 토글
  const toggleError = (show = false, msg = '') => {
    setError({
      show,
      msg,
    });
  };

  // 사용자 검색하기
  const searchGithubUser = async (user) => {
    setIsLoading(true);

    try {
      const response = await axios(`${rootUrl}/users/${user}`);

      if (response) {
        const data = response.data;

        // 전역 상태 업데이트
        setGithubUser(data);

        const { login, followers_url } = data;

        // // (1) 레포지토리 정보 가져오기
        // try {
        //   const response = await axios(
        //     `${rootUrl}/users/${login}/repos?per_page=100`
        //   );

        //   // 전역 상태 업데이트
        //   setRepos(response.data);
        // } catch (error) {
        //   console.log(error);
        // }

        // // (2) 팔로워 정보 가져오기
        // try {
        //   const response = await axios(`${followers_url}?per_page=100`);

        //   // 전역 상태 업데이트
        //   setFollowers(response.data);
        // } catch (error) {
        //   console.log(error);
        // }

        // 데이터 모두 불러온 후, 한꺼번에 표시하기
        await Promise.allSettled([
          axios(`${rootUrl}/users/${login}/repos?per_page=100`),
          axios(`${followers_url}?per_page=100`),
        ]).then((results) => {
          // console.log(results);
          const [repos, followers] = results;
          const status = 'fulfilled';

          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        });
      }
    } catch (error) {
      if (error.status === 404) {
        toggleError(true, 'There is no user with that username.');
      }
      console.log(error);
    }

    setIsLoading(false);
  };

  // GithubProvider.js (변경된 부분)
  useEffect(() => {
    checkRequests(); // 컴포넌트 마운트 시 API 호출 횟수 확인
  }, []);

  // API 호출 횟수 확인 후, requests 상태 업데이트
  const checkRequests = async () => {
    try {
      const {
        data: {
          rate: { remaining },
        },
      } = await axios(`${rootUrl}/rate_limit`);

      setRequests(remaining); // requests 상태 업데이트

      if (remaining === 0) {
        toggleError(true, 'Sorry you exceeded your hourly rate limit!');
      }
    } catch (error) {
      toggleError(true, 'Failed to fetch rate limit data.');
      console.error(error);
    }
  };

  // API 요청 횟수 확인하기
  useEffect(() => {
    const checkRequests = async () => {
      try {
        // [DEBUG] 요청 횟수 초과
        // remaining = 0;

        const {
          data: {
            rate: { remaining },
          },
        } = await axios(`${rootUrl}/rate_limit`);

        // 전역 상태 업데이트
        setRequests(remaining);

        // API 호출 횟수 제한 범위를 초과할 경우 (60회 / 시간)
        if (remaining === 0) {
          toggleError(true, 'Sorry you exceeded your hourly rate limit!');
        }
      } catch (error) {
        toggleError(true, 'Failed to fetch rate limit data.');
        console.error(error);
      }
    };

    checkRequests();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
