import axios from "axios";
import { useEffect, useState } from "react";
import CardProduct from "./CardProduct";

function AllProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-wrap md:container md:mx-auto">
      {products.map((product) => {
        return <CardProduct key={product.id} product={product} />;
      })}
    </div>
  );
}

export default AllProducts;
