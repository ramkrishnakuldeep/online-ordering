import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "../slices/menuSlice";
import orderHistory from "../slices/orderHistorySlice";
import cartSlice from "../slices/cartSlice";

export default configureStore({
   reducer: {
      menu: menuReducer,
      myCart: cartSlice,
      orderHistory: orderHistory
   }
})