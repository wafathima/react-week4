import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import AuthPage from "./features/auth/AuthPage";
import CartPage from "./features/cart/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import ProductDetail from "./pages/ProductDetail";
import ProfilePage from "./pages/ProfilePage";
import OrderPage from "./features/orders/OrdersPage";
import CheckoutPage from "./pages/CheckoutPage";
import BagPage from "./features/bag/BagPage";
import SignUpPage from "./features/auth/SignUpPage";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import WishlistPage from "./features/wishlist/WishlistPage";
import UserProfilePage from "./pages/UserProfilePage";

// {admin}
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./pages/Admin/AdminLayout";

function App() {
  return (
    <div>
      <Navbar/>
    <div className="pt-20">
      <Routes>
       
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout/>
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="/admin/users/:userId" element={<UserProfilePage/>}/>

        </Route>

       
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/wishlist" element={<WishlistPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
                <CartPage />
            </ProtectedRoute>
          }
        />

        <Route path="/bag" element={
          <ProtectedRoute>
          <BagPage />
          </ProtectedRoute>
          } />

          <Route path="/wishlist" element={
            <ProtectedRoute>
            <WishlistPage/>
            </ProtectedRoute>
            }/>
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
      
    </div>
    <Footer/>
    </div>
  );
}

export default App;

