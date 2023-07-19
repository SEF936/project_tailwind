import { PropTypes } from "prop-types";
import { useState } from "react";

function ModalProduct({ setOpenModal, currentProduct, handleAddItem }) {
  const [activeImage, setActiveImage] = useState(currentProduct.image);
  return (
    <div
      id="overlay"
      className="fixed z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center"
    >
      <div className="h-auto overflow-scroll w-full m-4 lg:m-36 bg-white md:flex flex-col md:my-auto">
        <div className="flex justify-end w-full">
          <button
            className="text-black text-xl place-self-end mr-2"
            type="button"
            onClick={() => setOpenModal(false)}
          >
            X
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 p-4 md:m-auto">
          <div className="flex flex-col md:flex-row gap-1 mb-2">
            <div className="flex justify-center">
              <img
                id="currentImg"
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/uploads/${activeImage}`}
                alt="product"
                className="w-48 h-68  md:w-38 md:h-50"
              />
            </div>
            <div className="flex justify-center md:flex-col md:justify-around">
              {currentProduct.image2 && (
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveImage(currentProduct.image2)}
                  >
                    <img
                      id="otherImg"
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        currentProduct.image2
                      }`}
                      alt="product"
                      className="w-16 h-18 md:w-16 md:h-24"
                    />
                  </button>
                </div>
              )}
              {currentProduct.image3 && (
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveImage(currentProduct.image4)}
                  >
                    <img
                      id="otherImg"
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        currentProduct.image4
                      }`}
                      alt="product"
                      className="w-16 h-18 md:w-16 md:h-24"
                    />
                  </button>
                </div>
              )}
              {currentProduct.image && (
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveImage(currentProduct.image)}
                  >
                    <img
                      id="otherImg"
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        currentProduct.image
                      }`}
                      alt="product"
                      className="w-16 h-18 md:w-16 md:h-24"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <h1 className="text-2xl font-semibold px-2">
                {currentProduct?.name}
              </h1>
              <div className="py-5 border-t border-b border-gray-300 px-2">
                <p>
                  <span className="font-bold">Description: </span>
                  {currentProduct.description}
                </p>
              </div>
              <div className="py-5 border-t border-b border-gray-300 px-2">
                <p>
                  <span className="font-bold">Catégorie: </span>
                  {currentProduct.title}
                </p>
                <p>
                  <span className="font-bold">Couleur: </span>
                  {currentProduct.color}
                </p>
                <p>
                  <span className="font-bold">Taille: </span>
                  {currentProduct.size}
                </p>
              </div>
            </div>
            <div className="flex justify-around mt-6 items-center">
              <div>
                {currentProduct.promotionalPrice && (
                  <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
                    {currentProduct.promotionalPrice} €
                  </p>
                )}
                <p className="font-bold text-3xl">{currentProduct.price} €</p>
              </div>
              <button
                id="addToCart"
                type="submit"
                className="px-5 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md"
                onClick={() => handleAddItem(currentProduct)}
              >
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalProduct.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  currentProduct: PropTypes.shape().isRequired,
  handleAddItem: PropTypes.func.isRequired,
};
export default ModalProduct;
