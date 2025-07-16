import { configureStore, combineReducers } from "@reduxjs/toolkit";
import dataReducer from './slices/getDataSlice';

const rootReducer = combineReducers({
    data: dataReducer
});


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;