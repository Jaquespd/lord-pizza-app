import { combineReducers } from "redux";

import cart from "./cart/reducer";
import products from "./products/reducer";
import delivery from "./delivery/reducer";

export default combineReducers({
  cart,
  products,
  delivery
});
