import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import shoppingListReducer from "../features/shoppingList/shoppingListSlice";

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
