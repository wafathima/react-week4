import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import AuthPage from "./features/auth/AuthPage";
import CartPage from "./features/cart/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";
import OrderPage from "./features/orders/OrdersPage"
import CheckoutPage from "./pages/CheckoutPage";
import BagPage from "./features/bag/BagPage";
import SignUpPage from "./features/auth/SignUpPage";

function App() {
  return ( 
  <div className="pt-20">
    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/product/:id" element={<ProductDetail/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/auth" element={<AuthPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
      <Route path="/orders" element={<OrderPage/>}/>
      <Route path="/cart" element={
        
        <ProtectedRoute>
        <Layout>
        <CartPage/>
        </Layout>
        </ProtectedRoute>
        }/>
        <Route
         path="/checkout" element={
          <Layout>
         <CheckoutPage/>
         </Layout>
         }/>
        <Route path="/bag" element={
          <Layout>
          <BagPage/>
          </Layout>
          }/>

    </Routes>
   
   <Toaster position="top-center" reverseOrder={false}/>
    </div>
  );
}

export default App;

