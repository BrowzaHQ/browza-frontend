'use client';

import { ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

export default function StoreProvider({ children }: { children: ReactNode }) {
  // Create the store once for this tree
  const store: AppStore = useMemo(() => makeStore(), []);
  return <Provider store={store}>{children}</Provider>;
}
