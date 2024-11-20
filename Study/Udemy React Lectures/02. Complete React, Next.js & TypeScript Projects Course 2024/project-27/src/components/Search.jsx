import { useContext, useState } from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';

import { GithubContext } from '../context/context';

const Search = () => {
  const [user, setUser] = useState('');

  const { requests, error, searchGithubUser, isLoading } =
    useContext(GithubContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user) {
      searchGithubUser(user);

      // <input> 요소 내부 비우기
      setUser('');
    }
  };

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {/* 에러 메시지가 있을 경우, 보여주기 */}
        {error.show && (
          <ErrorWrapper>
            <p>{error.msg}</p>
          </ErrorWrapper>
        )}

        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <MdSearch />
            <input
              type='text'
              placeholder='Enter GitHub User'
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <button className='submit' disabled={requests <= 0 || isLoading}>
              Search
            </button>
          </div>
        </form>
        <h3 className='requests' title='60 requests/hour'>
          Requests : {requests} / 60
        </h3>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;

    h3 {
      padding: 0 0.5rem;
    }
  }

  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;

    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }

    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }

    button {
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;

      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
    }

    button:disabled {
      background-color: #ccc;
      color: #999;
      cursor: not-allowed;
      opacity: 0.6;
    }

    svg {
      color: var(--clr-grey-5);
    }

    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }

  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }

  .requests {
    display: flex;
    font-size: 1rem;
    border: 1px solid var(--clr-grey-6);
    border-radius: 0.8rem;
    padding: 8px 10px;
    background-color: var(--clr-grey-6);
    color: var(--clr-grey-10);
    cursor: pointer;
    transition: all 0.3s;
    justify-content: center;
    align-items: center;

    &:hover {
      filter: brightness(1.1);
    }
  }
`;

const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;

  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`;

export default Search;
