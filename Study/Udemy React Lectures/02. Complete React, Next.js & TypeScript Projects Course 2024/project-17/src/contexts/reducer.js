import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from './actions';

// Reducer
export const reducer = (state, action) => {
  // 카트 비우기
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }

  // 아이템 삭제하기
  if (action.type === REMOVE) {
    const newCart = new Map(state.cart); // 맵 객체로 변환
    const itemId = action.payload.id; // 인자로 넘겨준 id 가져오기

    newCart.delete(itemId); // id를 이용하여 삭제

    return { ...state, cart: newCart };
  }

  // 아이템 개수 증가시키기
  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);

    const newItem = { ...item, amount: item.amount + 1 }; // 수량 1 증가시키기
    newCart.set(itemId, newItem);

    return { ...state, cart: newCart };
  }

  // 아이템 개수 감소시키기
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);

    // 아이템 개수가 1개 있을 경우
    if (item.amount === 1) {
      newCart.delete(itemId); // 아이템 삭제
      return { ...state, cart: newCart };
    }

    // 아이템 개수가 2개 이상 있을 경우
    const newItem = { ...item, amount: item.amount - 1 }; // 수량 1 감소시키기
    newCart.set(itemId, newItem);

    return { ...state, cart: newCart };
  }

  // 데이터를 불러오는 중일 경우 로딩 화면 표시하기
  if (action.type === LOADING) {
    return { ...state, loading: true };
  }

  // 데이터 보여주기
  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(action.payload.cart.map((item) => [item.id, item]));

    return { ...state, loading: false, cart: newCart };
  }

  throw new Error(`no matching action type ${action.type}`);
};

export default reducer;
