import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import Navbar from "./components/Navbar";
import "./index.css";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Panel from "./pages/Panel";
import ProtectedLayout from "./layouts/ProtectedLayout";
import NavLayout from "./layouts/NavLayout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/panier" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Home />} />
        {/* <Route path="panel" element={<Panel />} /> */}

        {/* private routes  */}
        <Route element={<ProtectedLayout />}>
          <Route path="/admin/loged" element={<NavLayout />}>
            <Route path="panel" element={<Panel />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
