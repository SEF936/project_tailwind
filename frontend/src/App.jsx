import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AllProducts from "./pages/AllProducts";
import Navbar from "./components/Navbar";
import "./index.css";
import Admin from "./pages/Admin";
import Panel from "./pages/Panel";
import ProtectedLayout from "./layouts/ProtectedLayout";
import NavLayout from "./layouts/NavLayout";
import WrongPage from "./pages/WrongPage";
import Basket from "./pages/Basket";

function App() {
  const [carts, setCarts] = useState([]);

  const handleAddItem = (clickedItem) => {
    setCarts((prev) => {
      const isItemInCart = prev.find(
        (item) => item.id_product === clickedItem.id_product
      );
      if (isItemInCart) {
        return prev.map((item) =>
          item.id_product === clickedItem.id_product
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, quantity: 1 }];
    });
  };
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<AllProducts handleAddItem={handleAddItem} />}
        />
        <Route
          path="/panier"
          element={
            <Basket
              setCarts={setCarts}
              carts={carts}
              handleAddItem={handleAddItem}
            />
          }
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<AllProducts />} />
        <Route path="*" element={<WrongPage />} />

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
