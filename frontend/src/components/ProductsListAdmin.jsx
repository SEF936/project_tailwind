import { useEffect, useState } from "react";
import axios from "axios";
import oeil from "../assets/view.png";

function ProductsList() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpdateProdcut, setShowUpdateProduct] = useState(false);
  const [products, setProducts] = useState([]);
  // const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, [showAddProduct, setShowUpdateProduct, showUpdateProdcut]);

  return (
    <div className="display">
      {/* {showAddUser && <AddUser setShowAddUser={setShowAddUser} />}
      {showUpdateUser && (
        <ModifyUser
          setShowUpdateUser={setShowUpdateUser}
          currentUser={currentUser}
        />
      )} */}
      <button
        type="button"
        className="addBtn"
        onClick={() => setShowAddProduct(true)}
      >
        Ajouter un produit
      </button>
      <table className="border-spacing-2 border border-collapse border-slate-500 hover:border-collapse table-auto">
        <caption className="caption-top">Table des produits</caption>
        <thead>
          <tr>
            <th className=" p-4 border border-slate-600 ...">Nom</th>
            <th className=" p-4 border border-slate-600 ...">Prénom</th>
            <th className=" p-4 border border-slate-600 ...">Email</th>
            <th className=" p-4 border border-slate-600 ...">Admin</th>
            <th className=" p-4 border border-slate-600 ...">Crée le</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product.id}>
                <div className="picture-container w-16 h-16 p-1">
                  <img
                    className="h-full w-full"
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                      product.image
                    }`}
                    alt="profil"
                  />
                </div>
                <td className=" p-2 border border-slate-700">
                  {product.id_product}
                </td>
                <td className=" p-2 border border-slate-700">{product.name}</td>
                <td className="p-2 border border-slate-700">
                  {product.description}
                </td>
                <td className="p-2 border border-slate-700">
                  {product.category_id}
                </td>
                <td className="p-2 border border-slate-700">{product.image}</td>
                <td className="p-2 border border-slate-700">{product.color}</td>
                <td className="p-2 border border-slate-700">{product.size}</td>
                <td className="p-2 border border-slate-700">{product.price}</td>
                <td className="p-2 border border-slate-700">
                  {product.promotional_date}
                </td>
                <td className="p-2 border border-slate-700">
                  {product.adding_date}
                </td>
                <td className="p-2 border border-slate-700">
                  <button
                    type="button"
                    className="viewBtn"
                    onClick={() => {
                      // eslint-disable-next-line no-sequences
                      return setShowUpdateProduct(true);
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
