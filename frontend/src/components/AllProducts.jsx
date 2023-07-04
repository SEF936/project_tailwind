import products from "../Datas/productsAllThree.json";
import CardProduct from "./CardProduct";

function AllProducts() {
  console.info(products);
  return (
    <div className="flex flex-wrap md:container md:mx-auto">
      {products.map((product) => {
        return <CardProduct key={product.id} product={product} />;
      })}
    </div>
  );
}

export default AllProducts;
