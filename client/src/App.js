import {
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateOutlet from "./utils/PrivateOutlet";
import "./App.css";
import { AiOutlineSearch } from "react-icons/ai";
import {
  SpotlightProvider,
  registerSpotlightActions,
} from "@mantine/spotlight";
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
  ListingDetailsPage,
  ListingsPage,
  SearchPage,
  ContactPage,
  FaqPage,
  BookingRequestPage,
  CommingSoonPage,
  ContactListPage,
  SubscribersPage,
  ReportPage,
  ReqDetails,
  RequestForApproval,
  MyRequsetsPage,
} from "./views";
import { useEffect } from "react";
import { authUserAction } from "./actions/Auth.action";
import { connect } from "react-redux";
import { searchListingLanding } from "./actions/Listing.action";

function App({ authUserAction, searchListingLanding, searchResult }) {
  const navigate = useNavigate();
  useEffect(() => {
    authUserAction();
  }, [searchResult]);

  const handleSearch = async (text) => {
    let check = await searchListingLanding(text);
    if (check !== null) {
      registerSpotlightActions(
        check.map((listing) => ({
          id: listing.id,
          title: listing.title,
          description: listing.description,
          onTrigger: () => navigate(`/listing/${listing.slug}`),
        }))
      );
    }
  };
  return (
    <>
      <SpotlightProvider
        actions={[]}
        searchIcon={<AiOutlineSearch size={22} color="#ff5a3c" />}
        searchPlaceholder="Search for home now..."
        shortcut="mod + shift + S"
        onChange={(e) => handleSearch(e.target.value)}
        zIndex={100}
        styles={{
          overlay: {
            background: "rgba(0, 0, 0, .7)",
          },
        }}
      >
        <ToastContainer newestOnTop theme="light" />

        <Routes>
          <Route path="*" element={<CommingSoonPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />

          <Route path="/listing/:slug" element={<ListingDetailsPage />} />

          <Route path="/booking/:id" element={<BookingRequestPage />} />
          <Route path="/report/:id" element={<ReportPage />} />
          <Route path="/*" element={<PrivateOutlet />}>
            <>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="contact-list" element={<ContactListPage />} />
              <Route path="newsletter" element={<SubscribersPage />} />
              <Route path="my-requests" element={<MyRequsetsPage />} />
              <Route
                path="requests-received"
                element={<RequestForApproval />}
              />
              <Route
                path="requests-received/:status"
                element={<RequestForApproval />}
              />

              <Route
                path="requests-received/details/:id"
                element={<ReqDetails />}
              />
              <Route
                path="my-requests/:id"
                element={<ReqDetails my={true} />}
              />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="category/add" element={<AddCategoryPage />} />
              <Route path="listings" element={<ListingsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route
                path="category/:id/edit"
                element={<AddCategoryPage edit />}
              />
              <Route path="add-listing" element={<AddListingPage />} />
            </>
          </Route>
        </Routes>
      </SpotlightProvider>
    </>
  );
}

const mapStateToProps = (state) => ({
  searchResult: state.listing.search_listings,
});

export default connect(mapStateToProps, {
  authUserAction,
  searchListingLanding,
})(App);
