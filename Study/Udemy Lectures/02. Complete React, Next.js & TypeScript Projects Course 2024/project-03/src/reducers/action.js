import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from './reducer';

import { data } from '../data';

const reducer = (state, action) => {
  if (action.type === CLEAR_LIST) {
    return { ...state, people: [] };
  }

  if (action.type === RESET_LIST) {
    return { ...state, people: data };
  }

  if (action.type === REMOVE_ITEM) {
    const id = action.payload.id;

    let newPeople = state.people.filter((person) => person.id !== id);

    return { ...state, people: newPeople };
  }

  // 정의 되어 있지 않는 action이 전달되었을 경우 에러 표시
  throw new Error(`No matching "${action.type}" - action type`);
};

export default reducer;
