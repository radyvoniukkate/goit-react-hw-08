import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "./styles.css";
import { store, persistor } from "./redux/store.js"; 
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
