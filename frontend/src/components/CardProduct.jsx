import { PropTypes } from "prop-types";

function CardProduct({ product, setOpenModal, setCurrentProduct }) {
  return (
    <button
      className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg"
      type="button"
      onClick={() => {
        setOpenModal(true);
        setCurrentProduct(product);
      }}
    >
      <div className="h-120">
        <img
          className="h-96 w-full object-cover object-center"
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${product.image}`}
          alt="Product"
        />
        <div className="p-4">
          <h2 className="mb-2 text-xl font-medium text-black">
            {product.name}
          </h2>
          <div className="flex justify-center mx-auto">
            <p className="mr-2 text-3xl font-semibold text-black">
              {product.price} €
            </p>
            {product.promotionalPrice && (
              <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
                {product.promotionalPrice}
              </p>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
CardProduct.propTypes = {
  product: PropTypes.shape().isRequired,
  setOpenModal: PropTypes.func.isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
};

export default CardProduct;
