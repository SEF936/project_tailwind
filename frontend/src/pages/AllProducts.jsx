import axios from "axios";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import CardProduct from "../components/CardProduct";
import ModalProduct from "../components/ModalProduct";

function AllProducts({ handleAddItem }) {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="flex flex-wrap pb-20 gap-1 bg-yellow-50 h-fit lg:p-12">
      {products.map((product) => {
        return (
          <CardProduct
            key={product.id}
            product={product}
            setOpenModal={setOpenModal}
            setCurrentProduct={setCurrentProduct}
          />
        );
      })}
      {openModal && (
        <ModalProduct
          setOpenModal={setOpenModal}
          currentProduct={currentProduct}
          handleAddItem={handleAddItem}
        />
      )}
    </div>
  );
}

AllProducts.propTypes = {
  handleAddItem: PropTypes.func.isRequired,
};
export default AllProducts;
