import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "./styles.css";
import { store } from "./redux/store.js"; // Видалити persistor

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
