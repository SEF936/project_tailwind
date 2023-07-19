import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import inputValidationRules from "../../services/inputValidationRules";

export default function UpdateUser({ setShowUpdateUser, currentUser }) {
  const [firstname, setFirstname] = useState(" ");
  const [lastname, setLastname] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [role, setRole] = useState(0);

  const [rolesData, setRolesData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/role`, {
        withCredentials: true,
      })
      .then((response) => setRolesData(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleUpdateUser = (event) => {
    event.preventDefault();

    const isValidForm = Object.values(
      inputValidationRules(firstname, lastname, email)
    ).every((key) => key);

    if (isValidForm) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/users/${currentUser.id_user}`,
          {
            user: {
              firstname: firstname !== " " ? firstname : currentUser.firstname,
              lastname: lastname !== " " ? lastname : currentUser.lastname,
              email: email !== " " ? email : currentUser.email,
              role: role !== 0 ? role : currentUser.id_role,
            },
          }
        )
        .catch((err) => {
          console.info(err);
        });
      setShowUpdateUser(false);
    } else console.info("une erreur est survenue");
  };
  const handleDeleteUser = (e) => {
    e.preventDefault();
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/users/${currentUser.id_user}`,
        currentUser.id_user
      )
      .then((res) => {
        if (res.status === 204) {
          console.info(res.data);
        }
      })

      .catch((err) => {
        console.info(err);
      });
    setShowUpdateUser(false);
  };

  return (
    <div className="sm:container mx-auto px-8">
      <button
        className="text-black text-xl place-self-end mr-2"
        type="button"
        onClick={() => setShowUpdateUser(false)}
      >
        X
      </button>
      <form className="flex flex-col mx-3 my-auto" onSubmit={handleUpdateUser}>
        <div className="add-user-title-container">
          <h2 className="add-user-title">Modification d'un utilisateur</h2>
        </div>
        <div className="user-management-container">
          <div className="input-container">
            <div className="input-fields">
              <div className="input-fields name-inputs-container">
                <label
                  htmlFor="lastname"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Nom <br />
                  <input
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="lastname"
                    placeholder={currentUser.lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </label>
                <label
                  htmlFor="firstname"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Prénom <br />
                  <input
                    type="text"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="firstname"
                    placeholder={currentUser.firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </label>
              </div>
              <label
                htmlFor="email"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Email <br />
                <input
                  type="email"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="email"
                  placeholder={currentUser.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <div className="mb-2">
                <p>rôle actuel: {currentUser.title}</p>
              </div>
              <label
                htmlFor="role"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Rôle
                <br />
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="role"
                  defaultValue="rôle"
                  onClick={(e) => setRole(parseInt(e.target.value, 10))}
                >
                  <option value="--">--</option>
                  {rolesData.map((r) => (
                    <option key={r.id_role} value={r.id_role}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
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
            onClick={handleDeleteUser}
          >
            Supprimer
          </button>
        </div>
      </form>
    </div>
  );
}

UpdateUser.propTypes = {
  setShowUpdateUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape().isRequired,
};
