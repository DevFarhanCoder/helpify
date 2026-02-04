import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BusinessProvider } from "./context/BusinessContext";
import {
  ProtectedRoute,
  AdminRoute,
  BusinessOwnerRoute,
} from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";
import BusinessRegistration from "./pages/BusinessRegistration";
import SearchResults from "./pages/SearchResults";
import BusinessProfile from "./pages/BusinessProfile";
import AdminDashboard from "./pages/AdminDashboard";
import BusinessOwnerDashboard from "./pages/BusinessOwnerDashboard";
import Settings from "./pages/Settings";
import PricingPlans from "./pages/PricingPlans";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BusinessProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/business/:id" element={<BusinessProfile />} />
                <Route path="/pricing" element={<PricingPlans />} />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <BusinessOwnerRoute>
                      <BusinessOwnerDashboard />
                    </BusinessOwnerRoute>
                  }
                />
                <Route path="/register" element={<BusinessRegistration />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </BusinessProvider>
    </AuthProvider>
  );
}

export default App;
