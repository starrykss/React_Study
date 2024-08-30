import { useEffect, useState } from 'react';

const url = 'https://api.github.com/users/starrykss';

const MultipleReturnsFetchData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resp = await fetch(url);
        // console.log(resp);

        // fetchAPI는 40x, 50x 번대 오류를 잡아내지 못한다.
        // 하지만 ok 프로퍼티를 이용하여, 데이터가 정상적으로 가져왔는지 체크할 수 있다.
        if (!resp.ok) {
          setIsError(true);
          setIsLoading(false);
          return;
        }

        const user = await resp.json();
        setUser(user);
      } catch (error) {
        setIsError(true);
        console.log(error);
      }
      setIsLoading(false);
    };

    setTimeout(fetchUser, 6000); // 6초 뒤에 함수 실행
  }, []);

  // if (isLoading) {
  //   return <h2>Loading...</h2>;
  // }

  // if (isError) {
  //   return <h2>ERROR</h2>;
  // }

  return (
    <div className="section">
      <h1>Fetch Data with Multiple Returns</h1>
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2>ERROR!</h2>}
      <br />
      {!isLoading && !isError && (
        <div>
          <img
            src={user.avatar_url}
            alt={user.name}
            style={{ width: '150px', borderRadius: '25px' }}
          />
          <h2>{user.name}</h2>
          <h4>works at {user.company ? user.company : 'Somewhere'}</h4>
          <p>{user.bio ? user.bio : 'There is no Bio.'}</p>
        </div>
      )}
      <p>
        <br />
        <span>
          "6초 뒤에 데이터가 불러와진다. 에러가 발생할 경우 'ERROR!'가 출력된다.
          "
        </span>
      </p>
    </div>
  );
};
export default MultipleReturnsFetchData;
