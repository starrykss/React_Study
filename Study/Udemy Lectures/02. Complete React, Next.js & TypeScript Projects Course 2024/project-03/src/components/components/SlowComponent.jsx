import { useState } from 'react';

const newItems = Array.from({ length: 200 }, (_, index) => {
  return (
    <div key={index}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s"
        alt=""
      />
    </div>
  );
});

const SlowComponent = () => {
  const [items, setItems] = useState(newItems);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        marginTop: '2rem',
      }}
    >
      {items}
    </div>
  );
};
export default SlowComponent;
