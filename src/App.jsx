import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/shop";
import AuthPage from "./features/auth/AuthPage";
import CartPage from "./features/cart/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return ( 
  <div>
 
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/shop" element={<Shop/>}/>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/cart" element={
        <ProtectedRoute>
        <CartPage/>
        </ProtectedRoute>
        }/>
    </Routes>
    </div>
  );
}

export default App;

