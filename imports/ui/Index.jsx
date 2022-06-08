import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import App from "./App";
import GlobalStyles from "./components/GlobalStyles";

function Index() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <GlobalStyles> */}
        <App />
        {/* </GlobalStyles> */}
      </PersistGate>
    </Provider>
  );
}

export default Index;
