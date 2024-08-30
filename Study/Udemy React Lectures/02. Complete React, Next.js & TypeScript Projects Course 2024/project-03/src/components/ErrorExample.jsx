const ErrorExample = () => {
  let count = 0;

  const handleClick = () => {
    count += 1;
    console.log(count);
  };

  return (
    <div className="section">
      <h1>Error Example</h1>
      <h2>{count}</h2>
      <button type="button" className="btn" onClick={handleClick}>
        increase
      </button>
      <p>
        <br />
        <span>
          "버튼을 클릭하면, 개발자 도구에서 변경된 값이 표시되지만, UI는
          변경되지 않는다."
        </span>
      </p>
    </div>
  );
};

export default ErrorExample;
