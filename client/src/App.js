import { Routes, Route, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateOutlet from "./utils/PrivateOutlet";
import "./App.css";
import { AiOutlineSearch } from "react-icons/ai";
import { SpotlightProvider } from "@mantine/spotlight";
import { RegisterPage, LoginPage, LandingPage } from "./views";

function App() {
  return (
    <>
      <SpotlightProvider
        actions={[]}
        searchIcon={<AiOutlineSearch size={22} color="#ff5a3c" />}
        searchPlaceholder="Search for home now..."
        shortcut="mod + shift + S"
      >
        <ToastContainer newestOnTop theme="dark" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/*" element={<PrivateOutlet />}>
              <>
                <Route path="dashboard" element={<div>Dashboard</div>} />
              </>
            </Route>
          </Routes>
        </BrowserRouter>
      </SpotlightProvider>
    </>
  );
}

export default App;
