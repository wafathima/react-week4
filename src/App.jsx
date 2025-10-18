import { BrowserRouter,Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthPage/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App;