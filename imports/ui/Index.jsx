import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import GlobalStyles from "../components/GlobalStyles";
import store, { persistor } from "../redux/store";
import App from "./App";

function Index() {
  return (
    <GlobalStyles>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <App />
          </Router>
        </PersistGate>
      </Provider>
    </GlobalStyles>
  );
}

export default Index;
