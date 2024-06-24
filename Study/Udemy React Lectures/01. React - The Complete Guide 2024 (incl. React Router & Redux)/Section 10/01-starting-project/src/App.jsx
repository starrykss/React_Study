import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";

import Product from "./components/Product.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";

import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
      <p className="copyright" align="middle">
        Made By <a href="https://www.github.io/starrykss">@starrykss</a>
      </p>
    </CartContextProvider>
  );
}

export default App;
