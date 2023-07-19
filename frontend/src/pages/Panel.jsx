import ProductsList from "../components/admin/ProductsListAdmin";
import UsersList from "../components/UsersList";

function Panel() {
  return (
    <div className="px-4 md:container md:mx-auto flex-col py-24 px-8">
      <details className="mt-6 group cursor-pointer">
        <summary className="text-2xl group-open:text-red-700">
          Gestion des utilisateurs
          <hr />
        </summary>
        <UsersList />
      </details>
      <details className="mt-6 group cursor-pointer">
        <summary className="text-2xl group-open:text-red-700">
          Gestion des produits
          <hr />
        </summary>
        <ProductsList />
      </details>
    </div>
  );
}

export default Panel;
