import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ShopHome from "./pages/ShopHome.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { useUserStore } from "./stores/useUserStore.js";
import Navbar from "./components/Home/Navbar";
import ScrollToSection from "./components/Home/ScrollToSection.jsx";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";
  const isSignup = pathname === "/signup";
  //const user = false;
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <>
      <div className="overflow-hidden">
        <div>
          <ScrollToSection />
          {isLogin || isSignup ? <></> : <Navbar />}

          <Routes>
            <Route path="/shop" element={<ShopHome />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/signup"
              element={!user ? <AuthPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <AuthPage /> : <Navigate to="/" />}
            />
            <Route
              path="/secret-dashboard"
              element={
                user?.role === "admin" ? (
                  <AdminPage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route
              path="/cart"
              element={user ? <CartPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/purchase-success"
              element={
                user ? <PurchaseSuccessPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/purchase-cancel"
              element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
