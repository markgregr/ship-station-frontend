// ReduxProvider.tsx
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../../redux/store"; // Путь к вашему файлу store.ts

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
