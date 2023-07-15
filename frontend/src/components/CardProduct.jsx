import { PropTypes } from "prop-types";

function CardProduct({ product }) {
  return (
    <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <img
        className="h-96 w-full object-cover object-center"
        src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${product.image}`}
        alt="Product"
      />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
          {product.name}
        </h2>
        <p className="mb-2 text-base dark:text-gray-300 text-gray-700">
          {product.description}
        </p>
        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
            {product.price} €
          </p>
          {/* <p className="text-base  font-medium text-gray-500 line-through dark:text-gray-300">
            $25.00
          </p>
          <p className="ml-auto text-base font-medium text-green-500">
            20% off
          </p> */}
        </div>
      </div>
    </div>
  );
}
CardProduct.propTypes = {
  product: PropTypes.shape().isRequired,
};

export default CardProduct;
