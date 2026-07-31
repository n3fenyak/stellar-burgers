import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import {
  ingredientsReducer,
  userReducer,
  constructorReducer,
  orderReducer,
<<<<<<< HEAD
  profileOrdersReducer
=======
  profileOrdersReducer,
  feedReducer,
  orderInfoReducer
>>>>>>> ccba09a (upd: устранены замечания)
} from '@slices';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
<<<<<<< HEAD
  profileOrders: profileOrdersReducer
=======
  profileOrders: profileOrdersReducer,
  feed: feedReducer,
  orderInfo: orderInfoReducer
>>>>>>> ccba09a (upd: устранены замечания)
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
