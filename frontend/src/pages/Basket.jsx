import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";

function Basket({ setCarts, carts, handleAddItem }) {
  const handleRemoveItem = (clickedItem) => {
    setCarts((prev) =>
      prev.reduce((ack, item) => {
        if (item.id_product === clickedItem.id_product) {
          if (item.quantity === 1) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        }
        return [...ack, item];
      }, [])
    );
  };
  const [totalItemsQuantity, setTotalItemsQuantity] = useState(0);
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  useEffect(() => {
    if (carts) {
      const totalQuantity = carts.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
      setTotalItemsQuantity(totalQuantity);
      const totalPrice = carts.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      setTotalItemsPrice(totalPrice);
    }
  }, [carts, totalItemsQuantity, totalItemsPrice]);

  return (
    <div className="w-full h-screen">
      <article className="flex flex-col gap-8 w-full h-full jusify-between px-8 ">
        {carts.map((cart) => (
          <div
            className="flex flex-col border-solid border-2 border-zinc-600 items-center md:flex-row md:h-36 md:justify-between md:items-center "
            key={cart.id_product}
          >
            <div className="flex flex-col items-center md:flex-row p-2 gap-2 ">
              <img
                className="h-32 w-24"
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                  cart.image
                }`}
                alt="img category"
              />
              <p className="w-120 h-12">{cart.name}</p>
            </div>
            <div className="flex">
              <button
                className="w-24 bg-green-100 rounded-lg"
                type="submit"
                onClick={() => handleAddItem(cart)}
              >
                Add to cart
              </button>

              <span
                className="w-6 flex items-center justify-center"
                type="button"
              >
                {cart.quantity}
              </span>
              <button
                className="w-24 bg-red-100 rounded"
                type="submit"
                onClick={() => handleRemoveItem(cart)}
              >
                Remove
              </button>
            </div>
            <div className="w-12 flex items-center justify-center pr-2">
              <span>
                {cart.price * cart.quantity} {cart.currency}
              </span>
            </div>
          </div>
        ))}
        <div className="flex">
          <p className="">
            {" "}
            <span className="">Total du panier: </span>
            {Math.round(totalItemsPrice * 100) / 100} €
          </p>
        </div>
      </article>
    </div>
  );
}
Basket.propTypes = {
  carts: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  setCarts: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
  // resetCarts: PropTypes.func.isRequired,
};

export default Basket;
