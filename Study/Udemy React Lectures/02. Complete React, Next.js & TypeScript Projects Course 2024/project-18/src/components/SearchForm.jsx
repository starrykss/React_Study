import { useGlobalContext } from '../contexts/context';
import Copyright from './Copyright';

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();

  // 폼 제출 이벤트
  const handleSubmit = (e) => {
    e.preventDefault();
    // 요소의 name 속성을 이용하여 접근
    const searchValue = e.target.elements.search.value;

    // 검색어가 없을 경우 종료
    if (!searchValue) return;

    setSearchTerm(searchValue);
  };

  // 타이틀 클릭 시 이벤트 처리
  const handleTitleClick = () => {
    window.location.reload(); // 새로고침
  };

  return (
    <section>
      <h1 className="title" onClick={handleTitleClick}>
        unsplash images
      </h1>
      <Copyright />
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input search-input"
          name="search"
          placeholder="orangutan"
        />
        <button type="submit" className="btn">
          search
        </button>
      </form>
    </section>
  );
};

export default SearchForm;
