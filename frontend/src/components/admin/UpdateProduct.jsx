import axios from "axios";
import { useState } from "react";
import { PropTypes } from "prop-types";

function UpdateProduct({
  setShowUpdateProduct,
  setShowAlertUpdateProduct,
  setShowAlertDeleteProduct,
  currentProduct,
}) {
  const [productPrice, setProductPrice] = useState(0);
  const [productPromotionalPrice, setProductPromotionalPrice] = useState(0);

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/products/${
          currentProduct.id_product
        }`,
        {
          product: {
            price: productPrice !== 0 ? productPrice : currentProduct.price,
            promotionalPrice:
              productPromotionalPrice !== 0
                ? productPromotionalPrice
                : currentProduct.promotionalPrice,
            id_product: currentProduct.id_product,
          },
        }
      )
      .then((res) => {
        if (res.status === 204) {
          setShowAlertUpdateProduct(true);
        }
      })
      .catch((err) => {
        console.info(err);
      });
    setShowUpdateProduct(false);
  };

  const handleDeleteProduct = (e) => {
    e.preventDefault();
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/products/${
          currentProduct.id_product
        }`,
        currentProduct.id_product
      )
      .then((res) => {
        if (res.status === 204) {
          setShowAlertDeleteProduct(true);
        }
      })

      .catch((err) => {
        console.info(err);
      });
    setShowUpdateProduct(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-11/12 overflow-scroll md:max-w-3xl h-5/6 flex flex-col bg-white scroll-smooth hover:scroll-auto">
        <button
          className="text-black text-xl place-self-end mr-2"
          type="button"
          onClick={() => setShowUpdateProduct(false)}
        >
          X
        </button>

        <form
          className="flex flex-col w-full p-4 h-auto my-auto"
          id="my_Form"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleUpdateProduct}
        >
          <h1 className="title-product-form mb-2 text-center text-xl">
            Modifier un produit
          </h1>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            nom
            <input
              id="name"
              disabled
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder={currentProduct.name}
              value={currentProduct.name}
            />
          </label>
          <label className="flex flex-col uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Description
            <textarea
              id="text_Area"
              disabled
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
              placeholder={currentProduct.description}
              value={currentProduct.description}
            />
          </label>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Catégorie
            <input
              id="category"
              disabled
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder={currentProduct.title}
              value={currentProduct.title}
            />
          </label>
          <div className="md:flex justify-center items-center md:mt-4 md:justify-between mt-2">
            <div className="flex flex-col md:items-center mb-2">
              <img
                className="h-25 w-10 md:h-32 w-28"
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                  currentProduct.image
                }`}
                alt="img current product"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                couleur
                <input
                  disabled
                  id="color"
                  className="appearance-none block w-full md:w-24 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder={currentProduct.color}
                  value={currentProduct.color}
                />
              </label>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                taille
                <input
                  id="size"
                  disabled
                  className="appearance-none block w-full md:w-24  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder={currentProduct.size}
                  value={currentProduct.size}
                />
              </label>
            </div>
            <div>
              <div className="mb-2">
                <p>Prix actuel: {currentProduct.price}</p>
              </div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Nouveau prix
                <input
                  id="price"
                  className="appearance-none block w-full md:w-24  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder={currentProduct.price}
                  onChange={(e) =>
                    setProductPrice(parseInt(e.target.value, 10))
                  }
                />
              </label>
              <div className="mb-2">
                <p>
                  Prix promo actuel: {currentProduct.productPromotionalPrice}
                </p>
              </div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Nouveau prix promo
                <input
                  id="promotionalPrice"
                  className="appearance-none block w-full md:w-24  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="saisir le nouveau prix"
                  onChange={(e) =>
                    setProductPromotionalPrice(parseInt(e.target.value, 10))
                  }
                />
              </label>
            </div>
          </div>
          <div className="flex justify-around md:justify-center space-x-3 py-4">
            <button
              className="w-32 h-6 md:w-48 h-8 rounded-md text-gray-700 text-xs font-bold bg-green-400"
              id="button_update_product"
              type="submit"
            >
              Valider
            </button>
            <button
              className="w-32 h-6 md:w-48 h-8 rounded-md text-gray-700 text-xs font-bold bg-red-400"
              id="button_delete_product"
              type="button"
              onClick={handleDeleteProduct}
            >
              Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

UpdateProduct.propTypes = {
  setShowUpdateProduct: PropTypes.func.isRequired,
  setShowAlertUpdateProduct: PropTypes.func.isRequired,
  setShowAlertDeleteProduct: PropTypes.func.isRequired,
  currentProduct: PropTypes.shape().isRequired,
};

export default UpdateProduct;
