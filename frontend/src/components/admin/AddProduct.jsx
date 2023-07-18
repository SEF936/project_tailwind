import axios from "axios";
import { useRef, useState } from "react";
import { PropTypes } from "prop-types";

function AddProduct({ setShowAddProduct }) {
  const inputRef = useRef();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState(0);
  const [productColor, setProductColor] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productPromotionalPrice, setProductPromotionalPrice] = useState(0);

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
                promotionalPrice: productCategory || "",
              },
            })

            .catch((err) => {
              console.info(err);
            });
        }
      });
    setShowAddProduct(false);
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
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          <input
            id="category"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
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
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          <input
            id="size"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="size"
            value={productSize}
            onChange={(e) => {
              setProductSize(e.target.value);
            }}
            required
          />
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
};

export default AddProduct;
