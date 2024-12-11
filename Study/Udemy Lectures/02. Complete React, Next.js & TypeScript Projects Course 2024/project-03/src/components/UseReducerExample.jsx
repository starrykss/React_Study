import { useReducer } from 'react';

import { data } from '../data';

import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from '../reducers/reducer';
import reducer from '../reducers/action';

// 리듀서 함수 생성
const defaultState = {
  people: data,
  isLoading: false,
};

const UseReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const removeItem = (id) => {
    // payload를 통해 필요한 인자를 넘겨준다.
    dispatch({ type: REMOVE_ITEM, payload: { id } });
    // let newPeople = people.filter((person) => person.id !== id);
    // setPeople(newPeople);
  };

  const clearList = () => {
    dispatch({ type: CLEAR_LIST });
    // setPeople([]);
  };

  const resetList = () => {
    dispatch({ type: RESET_LIST });
    // setPeople(data);
  };

  return (
    <div className="section">
      <h1>useReducer Example</h1>
      <div>
        {state.people.map((person) => {
          const { id, name } = person;
          return (
            <div key={id} className="item">
              <h4>{name}</h4>
              <button className="btn" onClick={() => removeItem(id)}>
                remove
              </button>
            </div>
          );
        })}

        {state.people.length < 1 ? (
          <button
            className="btn"
            style={{ marginTop: '2rem', padding: '0.5rem 1rem' }}
            onClick={() => resetList()}
          >
            reset items
          </button>
        ) : (
          <button
            className="btn"
            style={{ marginTop: '2rem', padding: '0.5rem 1rem' }}
            onClick={() => clearList()}
          >
            clear items
          </button>
        )}
      </div>
    </div>
  );
};

export default UseReducerExample;
