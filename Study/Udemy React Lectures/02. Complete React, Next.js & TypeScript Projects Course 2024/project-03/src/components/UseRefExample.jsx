import { useState, useRef, useEffect } from 'react';

//
// useRef 훅의 특징
// - useRef 훅은 리렌더링을 촉발시키지 않는다.
// - useRef는 랜더링 간에 데이터를 유지시킨다.
//

const UseRefExample = () => {
  const [value, setValue] = useState(0);
  const refContainer = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    // 요소에 포커스 효과 주기
    refContainer.current.focus();
  });

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    console.log('re-render');
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = refContainer.current.value;
    console.log(name);
  };

  return (
    <div className="section">
      <h1>useRef Example</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            ref={refContainer}
          />
        </div>
        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
      <h4>value : {value}</h4>
      <button onClick={() => setValue(value + 1)} className="btn">
        increase
      </button>
    </div>
  );
};

export default UseRefExample;
