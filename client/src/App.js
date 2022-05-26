import { Routes, Route, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateOutlet from "./utils/PrivateOutlet";
import { RegisterPage, LoginPage } from "./views";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer newestOnTop theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Landing</div>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/*" element={<PrivateOutlet />}>
            <>
              <Route path="dashboard" element={<div>Dashboard</div>} />
            </>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
