import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./config/axios.config";
import ErrorNotFoundPage from "./components/404/ErrorNotFoundPage";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:category" element={<App />} />
        <Route path="/404" element={<ErrorNotFoundPage />} />
      </Routes>
    </Router>
    <ReactQueryDevtools initialIsOpen />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
