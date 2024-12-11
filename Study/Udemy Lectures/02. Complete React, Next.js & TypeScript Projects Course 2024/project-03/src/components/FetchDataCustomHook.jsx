import useFetchPerson from '../hooks/useFetchPerson';
import useFetch from '../hooks/useFetch';

const url = 'https://api.github.com/users/QuincyLarson';

const FetchDataCustomHook = () => {
  // const { isLoading, isError, user } = useFetchPerson(url);
  const { isLoading, isError, data: user } = useFetch(url);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>There was an error...</h2>;
  }

  const { avatar_url, name, company, bio } = user;

  return (
    <div className="section">
      <h1>Fetch Data Custom Hook</h1>
      <div>
        <img
          style={{ width: '100px', borderRadius: '25px' }}
          src={avatar_url}
          alt={name}
        />
        <h2>{name}</h2>
        <h4>works at {company}</h4>
        <p>{bio}</p>
      </div>
    </div>
  );
};

export default FetchDataCustomHook;
