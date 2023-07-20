import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AddProducts from "./AddProduct";
import oeil from "../../assets/view.png";
import UpdateProduct from "./UpdateProduct";

function ProductsList() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [showAlertAddProduct, setShowAlertAddProduct] = useState(false);
  const [showAlertUpdateProduct, setShowAlertUpdateProduct] = useState(false);
  const [showAlertDeleteProduct, setShowAlertDeleteProduct] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        withCredentials: true,
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, [showAlertAddProduct, showAlertUpdateProduct, showAlertDeleteProduct]);
  const handleClose = () => {
    setShowAlertAddProduct(false);
    setShowAlertUpdateProduct(false);
    setShowAlertDeleteProduct(false);
  };

  // Automatically close the alert after 3000 milliseconds (3 seconds)
  setTimeout(handleClose, 3000);
  return (
    <div className="display">
      {showAlertAddProduct && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success" onClose={handleClose}>
            Produit ajouté
          </Alert>
        </Stack>
      )}
      {showAlertUpdateProduct && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success" onClose={handleClose}>
            Produit modifié
          </Alert>
        </Stack>
      )}
      {showAlertDeleteProduct && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success" onClose={handleClose}>
            Produit supprimé
          </Alert>
        </Stack>
      )}
      {showAddProduct && (
        <AddProducts
          setShowAddProduct={setShowAddProduct}
          showAddProduct={showAddProduct}
          setShowAlertAddProduct={setShowAlertAddProduct}
        />
      )}
      {showUpdateProduct && (
        <UpdateProduct
          setShowUpdateProduct={setShowUpdateProduct}
          showUpdateProduct={showUpdateProduct}
          setShowAlertUpdateProduct={setShowAlertUpdateProduct}
          setShowAlertDeleteProduct={setShowAlertDeleteProduct}
          currentProduct={currentProduct}
        />
      )}
      {!showAddProduct && (
        <button
          type="button"
          className="addBtn"
          onClick={() => setShowAddProduct(true)}
        >
          Ajouter un produit
        </button>
      )}
      <table className="w-11/12 mx-auto border-spacing-2 border border-collapse border-slate-500 hover:border-collapse table-auto md:w-auto">
        <caption className="caption-top">Table des produits</caption>
        <thead>
          <tr>
            <th className=" p-4 text-center border border-slate-600 ...">
              preview
            </th>
            <th className=" p-4 text-center border border-slate-600 ...">id</th>
            <th className=" p-4 text-center border border-slate-600 ...">
              nom
            </th>
            <th className="hidden md:table-cell p-4 text-center border border-slate-600 ...">
              description
            </th>
            <th className="hidden md:table-cell p-4 text-center border border-slate-600 ...">
              categorie
            </th>
            <th className="hidden xl:table-cell p-4 text-center border border-slate-600 ...">
              image
            </th>
            <th className="hidden lg:table-cell p-4 text-center border border-slate-600 ...">
              couleurs
            </th>
            <th className="hidden lg:table-cell p-4 text-center border border-slate-600 ...">
              tailles
            </th>
            <th className="hidden md:table-cell p-4 text-center border border-slate-600 ...">
              prix
            </th>
            <th className="hidden md:table-cell p-4 text-center border border-slate-600 ...">
              prix promo
            </th>
            <th className="hidden xl:table-cell p-4 text-center border border-slate-600 ...">
              date d'ajout
            </th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product.id_product}>
                <td className=" p-2 flex justify-center items-center border-slate-700">
                  <img
                    className="h-24 w-10 md:h-32 w-28 "
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                      product.image
                    }`}
                    alt="profil"
                  />
                </td>
                <td className=" p-2 text-center border border-slate-700">
                  {product.id_product}
                </td>
                <td className=" p-2 text-center border border-slate-700">
                  {product.name}
                </td>
                <td className="hidden md:table-cell p-2 text-center border border-slate-700">
                  {product.description}
                </td>
                <td className="hidden md:table-cell p-2 text-center border border-slate-700">
                  {product.title}
                </td>
                <td className="hidden xl:table-cell p-2 text-center border border-slate-700">
                  {product.image}
                </td>
                <td className="hidden lg:table-cell p-2 text-center border border-slate-700">
                  {product.color}
                </td>
                <td className="hidden lg:table-cell p-2 text-center border border-slate-700">
                  {product.size}
                </td>
                <td className="hidden md:table-cell p-2 text-center border border-slate-700">
                  {product.price}
                </td>
                <td className="hidden md:table-cell p-2 text-center border border-slate-700">
                  {product.promotionalPrice}
                </td>
                <td className="hidden xl:table-cell p-2 text-center border border-slate-700">
                  {product.adding_date}
                </td>
                <td className="w-16 mx-auto p-2 border text-center border-slate-700">
                  <button
                    type="button"
                    className="text-center"
                    onClick={() => {
                      setShowUpdateProduct(true);
                      setCurrentProduct(product);
                      // , setCurrentUser(user);
                    }}
                  >
                    <img src={oeil} alt="" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsList;
