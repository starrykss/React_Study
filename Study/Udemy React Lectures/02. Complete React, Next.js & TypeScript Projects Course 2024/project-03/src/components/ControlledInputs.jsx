import { useState, useRef } from 'react';

import { data as d } from '../data';

export const ControlledInputs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [challengeName, setChallengeName] = useState('');
  const [data, setData] = useState(d);

  const addUserButtonRef = useRef(null);

  // const handleChange = (e) => {
  //   e.preventDefault();

  //   setName(e.target.name);
  //   setEmail(e.target.email);
  // };

  const handleSubmit1 = (e) => {
    e.preventDefault();

    // do something
    if (name && email) {
      console.log(name, email);
      alert(`${name}\n${email}`);
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();

    if (!challengeName) {
      return;
    }

    setData([...data, { id: Date.now(), name: challengeName }]);

    // 초기화
    addUserButtonRef.current.value = '';
    setChallengeName('');
  };

  // 아이템 삭제 기능
  const itemRemoveHandler = (id) => {
    const filteredData = data.filter((item) => item.id !== id);

    setData(filteredData);
  };

  return (
    <div className="section">
      <h1>Controlled Inputs</h1>
      <form className="form" onSubmit={handleSubmit1}>
        <h4>controlled inputs</h4>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="text"
            className="form-input"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
      <form className="form" onSubmit={handleSubmit2}>
        <h4>Add User</h4>
        <div className="form-row">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            type="text"
            className="form-input"
            id="name"
            ref={addUserButtonRef}
            onChange={(e) => setChallengeName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
      <h5>Users</h5>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>{' '}
            <button
              style={{ padding: '2px 5px' }}
              onClick={() => itemRemoveHandler(item.id)}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ControlledInputs;
