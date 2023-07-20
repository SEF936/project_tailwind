import axios from "axios";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CardProduct from "../components/CardProduct";
import ModalProduct from "../components/ModalProduct";

function AllProducts({
  handleAddItem,
  setShowAlertProductAddToCart,
  showAlertProductAddToCart,
}) {
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
  }, [showAlertProductAddToCart]);

  const handleClose = () => {
    setShowAlertProductAddToCart(false);
  };
  setTimeout(handleClose, 3000);
  return (
    <div className="flex flex-wrap pb-20 gap-1 bg-yellow-50 h-fit lg:p-12">
      {showAlertProductAddToCart && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success" onClose={handleClose}>
            Produit ajouté au panier
          </Alert>
        </Stack>
      )}
      <h1 className="w-full text-center text-4xl my-4">Tout les produits</h1>
      {products.map((product) => {
        return (
          <CardProduct
            key={product.id_product}
            product={product}
            setOpenModal={setOpenModal}
            setCurrentProduct={setCurrentProduct}
          />
        );
      })}
      {openModal && (
        <ModalProduct
          setOpenModal={setOpenModal}
          setShowAlertProductAddToCart={setShowAlertProductAddToCart}
          currentProduct={currentProduct}
          handleAddItem={handleAddItem}
        />
      )}
    </div>
  );
}

AllProducts.propTypes = {
  handleAddItem: PropTypes.func,
  setShowAlertProductAddToCart: PropTypes.func,
  showAlertProductAddToCart: PropTypes.bool,
};
AllProducts.defaultProps = {
  handleAddItem: () => {},
  setShowAlertProductAddToCart: () => {},
  showAlertProductAddToCart: false,
};
export default AllProducts;
