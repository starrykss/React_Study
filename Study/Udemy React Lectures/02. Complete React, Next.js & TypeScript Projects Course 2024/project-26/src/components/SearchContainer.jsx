import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Wrapper from '../assets/wrappers/SearchContainer';

import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';

import { handleChange, clearFilters } from '../features/alljobs/allJobsSlice';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');

  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  // 검색 이벤트 처리
  const handleSearch = (e) => {
    // if (isLoading) {
    //   return;
    // }

    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  // 폼 제출 이벤트 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    setLocalSearch('');

    // 필터 내용 초기화
    dispatch(clearFilters());
  };

  // 디바운스 기능
  const debounce = () => {
    let timeoutID;

    return (e) => {
      setLocalSearch(e.target.value);

      clearTimeout(timeoutID); // 이미 있을 경우 제거

      timeoutID = setTimeout(() => {
        dispatch(
          handleChange({ name: e.target.name, value: e.target.value }),
          1000 // 1초 뒤에 검색 수행
        );
      });
    };
  };

  // 디바운스 기능 최적화
  const optimizedDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Form</h4>
        <div className='form-center'>
          {/* SEARCH (LOCAL) */}
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          {/* SEARCH (API) */}
          {/* <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          /> */}

          {/* STATUS */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />

          {/* TYPE */}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />

          {/* SORT */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />

          {/* CLEAR BUTTON */}
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
