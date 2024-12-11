import { useState } from 'react';

const Form = ({ addPerson }) => {
  const [name, setName] = useState('');

  // 불필요한 리랜더링을 막기 위해 Form 컴포넌트를 분리한 후, 폼 제출 이벤트를 이 파일 안에 추가한다.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Please Provide Name Value');
      return;
    }
    addPerson(name);
    setName('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button className="btn btn-block" type="submit">
        submit
      </button>
    </form>
  );
};
export default Form;
