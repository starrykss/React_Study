import { useState } from 'react';

const UncontrolledInputs = () => {
  const [value, setValue] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // FormData API 사용하기
    console.log(e.currentTarget); // DOM 요소 반환 (<form>...</form>)

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name'); // input 요소의 id 속성값
    console.log(name);

    console.log([...formData.entries()]);
    // [['name', value], ['email', value], ['password', value]]

    const newUser = Object.fromEntries(formData);

    // 불러온 데이터로 작업하기
    console.log(newUser);
    // { email: value, name: value, password: value }

    setValue(value + 1);

    // 폼의 내용 모두 비우기
    e.currentTarget.reset();
  };

  return (
    <div className="section">
      <h1>Form Data API</h1>
      <form className="form" onSubmit={handleSubmit}>
        {/* name */}
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input type="text" className="form-input" id="name" name="name" />
        </div>
        {/* email */}
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-input" id="email" name="email" />
        </div>
        {/* password */}
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </div>
  );
};
export default UncontrolledInputs;
