import { Routes, Route, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateOutlet from "./utils/PrivateOutlet";
import "./App.css";
import { AiOutlineSearch } from "react-icons/ai";
import { SpotlightProvider } from "@mantine/spotlight";
import {
  RegisterPage,
  LoginPage,
  LandingPage,
  DashboardPage,
  SettingsPage,
  AddListingPage,
  CategoryPage,
  AddCategoryPage,
  UsersPage,
  AboutPage,
} from "./views";
import { useEffect } from "react";
import { authUserAction } from "./actions/Auth.action";
import { connect } from "react-redux";

function App({ authUserAction }) {
  useEffect(() => {
    authUserAction();
  }, []);
  return (
    <>
      <SpotlightProvider
        actions={[]}
        searchIcon={<AiOutlineSearch size={22} color="#ff5a3c" />}
        searchPlaceholder="Search for home now..."
        shortcut="mod + shift + S"
      >
        <ToastContainer newestOnTop theme="light" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="/*" element={<PrivateOutlet />}>
              <>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="category" element={<CategoryPage />} />
                <Route path="category/add" element={<AddCategoryPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route
                  path="category/:id/edit"
                  element={<AddCategoryPage edit />}
                />
                <Route path="add-listing" element={<AddListingPage />} />
              </>
            </Route>
          </Routes>
        </BrowserRouter>
      </SpotlightProvider>
    </>
  );
}

export default connect(null, { authUserAction })(App);
