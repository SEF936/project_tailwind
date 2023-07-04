import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/panier" element={<Home />} />
        <Route path="/admin" element={<Home />} />
        <Route path="/contact" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
