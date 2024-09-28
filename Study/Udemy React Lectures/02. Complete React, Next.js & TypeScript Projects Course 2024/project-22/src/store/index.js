import { configureStore } from '@reduxjs/toolkit';

// (참고) export default로 내보내기 했기 때문에, import 할 때는 아무런 이름을 지정하여 가져올 수 있다.
import cartReducer from '../features/cart/cartSliceAPI';
import modalReducer from '../features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    // 외부에서 접근할 때 다음과 같이 사용한다.
    // -> const { value } = useSelector((state) => state.cart);
    cart: cartReducer,
    modal: modalReducer,
  },
});
