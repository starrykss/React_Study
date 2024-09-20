import { useState, useTransition, lazy, Suspense } from 'react';

const SlowComponent = lazy(() => import('./components/SlowComponent'));

const UseTransitionSuspenseExample = () => {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);

  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setText(e.target.value);

    startTransition(() => {
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

      setItems(newItems);
    });
  };

  return (
    <div className="section">
      <h1>useTransition and Suspense Example</h1>
      <Suspense fallback={<h4>Loading...</h4>}>
        <section>
          <form className="form">
            <input
              type="text"
              className="form-input"
              value={text}
              onChange={handleChange}
            />
          </form>
          <h4>Items Below</h4>
          {/* 다 불러와지기 전에 Loading... 표시하기 */}
          {isPending ? (
            'Loading...'
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                marginTop: '2rem',
              }}
            >
              {items}
            </div>
          )}
          <button onClick={() => setShow(!show)} className="btn">
            toggle
          </button>
          {show && <SlowComponent />}
        </section>
      </Suspense>
    </div>
  );
};

export default UseTransitionSuspenseExample;
