import { combineReducers, configureStore } from "@reduxjs/toolkit";
import menuReducer from "../slices/menuSlice";
import orderHistory from "../slices/orderHistorySlice";
import cartSlice from "../slices/cartSlice";

const rootReducer = combineReducers({
    menu: menuReducer,
    myCart: cartSlice,
    orderHistory: orderHistory
})

export function setupStore(preloadedState?: Partial<IRootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type IRootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']