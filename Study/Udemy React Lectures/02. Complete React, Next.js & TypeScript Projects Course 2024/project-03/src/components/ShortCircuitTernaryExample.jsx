import { useState } from 'react';

const ShortCircuitTernaryExample = () => {
  // falsy
  const [text, setText] = useState('');
  // truthy
  const [name, setName] = useState('susan');
  const [user, setUser] = useState({ name: 'john' });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="section">
      <h1>Short Circuit Example</h1>
      <div>
        <h4>Falsy OR : {text || 'hello world'}</h4>
        <h4>Falsy AND {text && 'hello world'}</h4>
        <h4>Truthy OR {name || 'hello world'}</h4>
        <h4>Truthy AND {name && 'hello world'}</h4>
      </div>
      <br />
      <div>
        <h2>{text || 'default value'}</h2>
        {text && (
          <div>
            <h2> whatever return</h2>
            <h2>{name}</h2>
          </div>
        )}
        {/* more info below */}
        {!text && (
          <div>
            <h2> whatever return</h2>
            <h2>{name}</h2>
          </div>
        )}
        {user && <SomeComponent name={user.name} />}
        <br />
        <h1 style={{ margin: '1rem 0' }}>Ternary Operator</h1>
        <button className="btn">{isEditing ? 'edit' : 'add'}</button>
        {user ? (
          <div>
            <h4>hello there user {user.name}</h4>
          </div>
        ) : (
          <div>
            <h2>please login</h2>
          </div>
        )}
      </div>
    </div>
  );
};

const SomeComponent = ({ name }) => {
  return (
    <div>
      <h4>hello there, {name}</h4>
      <button className="btn">log out</button>
    </div>
  );
};

export default ShortCircuitTernaryExample;
