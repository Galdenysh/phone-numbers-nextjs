import { FC } from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { wrapper } from "../services/store";
import "../styles/globals.css";

if (process.env.NODE_ENV !== "production") {
  console.warn(`App in ${process.env.NODE_ENV} mode!`);
}

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props} />;
    </Provider>
  );
};

export default App;
