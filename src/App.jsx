import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./features/auth/AuthPage";
import CartPage from "./features/cart/CartPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return ( 
  <div>
  <Navbar/>
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={
       <ProtectedRoute>
        <CartPage/>
       </ProtectedRoute>}/>
    </Routes>
    </div>
  );
}

export default App;

