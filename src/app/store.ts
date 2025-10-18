// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () =>
  configureStore({
    reducer: {}, // add slices later
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
