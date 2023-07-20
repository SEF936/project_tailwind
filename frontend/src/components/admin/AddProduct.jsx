import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";

function AddProduct({ setShowAddProduct, setShowAlertAddProduct }) {
  const inputRef = useRef();
  const [categoriesData, setCategoriesData] = useState([]);
  const [sizesDatas, setSizesData] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState(0);
  const [productColor, setProductColor] = useState("");
  const [productSize, setProductSize] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productPromotionalPrice, setProductPromotionalPrice] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/category`, {
        withCredentials: true,
      })
      .then((response) => setCategoriesData(response.data))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/size`, {
        withCredentials: true,
      })
      .then((response) => setSizesData(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("photo", inputRef.current.files[0]);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/image`, formData)
      .then((result) => {
        if (result.status === 201) {
          console.info(result.data);
          axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/products`, {
              product: {
                name: productName,
                description: productDescription,
                category: productCategory,
                image: result.data,
                color: productColor,
                size: productSize,
                price: productPrice,
                promotionalPrice: productCategory,
              },
            })
            .then((res) => {
              if (res.status === 201) {
                setShowAddProduct(false);
                setShowAlertAddProduct(true);
              }
            })

            .catch((err) => {
              console.info(err);
            });
        }
      });
  };
  return (
    <div className="sm:container mx-auto px-8">
      <button
        className="text-black text-xl place-self-end mr-2"
        type="button"
        onClick={() => setShowAddProduct(false)}
      >
        X
      </button>
      <form
        className="flex flex-col mx-3 my-auto"
        id="my_Form"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleAddProduct}
      >
        <h1 className="title-product-form">Ajout d'un produit</h1>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          <input
            id="name"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="titre"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            required
          />
        </label>
        <textarea
          id="text_Area"
          className="textaera"
          placeholder="Add description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />
        <label
          htmlFor="category"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Categorie
          <br />
          <select
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            name="category"
            defaultValue="categorie"
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="--">Choisissez une catégorie</option>
            {categoriesData.map((c) => (
              <option key={c.id_category} value={c.id_category}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          <input
            id="image"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="file"
            name="photo"
            ref={inputRef}
            required
          />
        </label>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          <input
            id="color"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="color"
            value={productColor}
            onChange={(e) => {
              setProductColor(e.target.value);
            }}
            required
          />
        </label>
        <label
          htmlFor="size"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Taille
          <br />
          <select
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            name="size"
            defaultValue="categorie"
            onChange={(e) => setProductSize(e.target.value)}
          >
            <option value="--">Choisissez une taille</option>
            {sizesDatas.map((s) => (
              <option key={s.id_size} value={s.id_size}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          <input
            id="price"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </label>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          <input
            id="promotionalPrice"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="promotionalPrice"
            value={productPromotionalPrice}
            onChange={(e) => setProductPromotionalPrice(e.target.value)}
          />
        </label>
        <button
          className="button-add-product"
          id="button_add_product"
          type="submit"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
AddProduct.propTypes = {
  setShowAddProduct: PropTypes.func.isRequired,
  setShowAlertAddProduct: PropTypes.func.isRequired,
};

export default AddProduct;
