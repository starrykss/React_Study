import reactLogo from '../assets/react.svg';

const TitleUI = () => {
  return (
    <>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <h1 className="project-title">
        <b>Advanced React</b>
      </h1>
      <p>
        <span className="project-description">
          리액트의 핵심 내용을 공부하면서 정리한 페이지
        </span>
      </p>
      <p>
        <span className="copyright">
          <a href="https://www.github.com/starrykss" target="_blank">
            ⓒstarrykss
          </a>
        </span>
      </p>
    </>
  );
};

export default TitleUI;
