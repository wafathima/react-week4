import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/shop";
import AuthPage from "./features/auth/AuthPage";
import CartPage from "./features/cart/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import ProductDetail from "./pages/ProductDetail";


function App() {
  return ( 
  <div className="pt-20">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/product/:id" element={<ProductDetail/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/cart" element={
        <ProtectedRoute>
        <CartPage/>
        </ProtectedRoute>
        }/>
    </Routes>
   <Toaster position="top-center" reverseOrder={false}/>
    </div>
  );
}

export default App;

