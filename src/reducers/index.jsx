import { configureStore } from '@reduxjs/toolkit'

import authReducer from "./auth";
import todoReducer from "./todo";

// https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#using-configurestore
const store = configureStore({
    reducer: {
      auth: authReducer,
      todo: todoReducer,
    }
});

export default store;
