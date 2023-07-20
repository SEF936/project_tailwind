import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import inputValidationRules from "../../services/inputValidationRules";

export default function AddUser({
  setShowAddUser,
  setShowAlertAddUser,
  setShowAlertEmailNotDispo,
}) {
  // const [newUploadedFileName, setNewUploadedFileName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(parseInt("", 10));

  const [rolesData, setRolesData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/role`, {
        withCredentials: true,
      })
      .then((response) => setRolesData(response.data))
      .catch((err) => console.error(err));
  }, []);

  const submit = (event) => {
    event.preventDefault();

    const isValidForm = Object.values(
      inputValidationRules(firstname, lastname, email, password, role)
    ).every((key) => key);

    if (isValidForm) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
          firstname,
          lastname,
          email,
          password,
          role,
        })
        .then((res) => {
          if (res.status === 201) {
            setShowAddUser(false);
            setShowAlertAddUser(true);
          }
        })

        .catch((err) => {
          setShowAlertEmailNotDispo(true);
          console.info(err);
        });
    } else console.info("error");
  };

  return (
    <div className="sm:container mx-auto px-8">
      <button
        className="text-black text-xl place-self-end mr-2"
        type="button"
        onClick={() => setShowAddUser(false)}
      >
        X
      </button>
      <form className="flex flex-col mx-3 my-auto" onSubmit={submit}>
        <div className="add-user-title-container">
          <h2 className="add-user-title">Ajout d'un utilisateur</h2>
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
                    placeholder="Insérez votre nom"
                    onChange={(e) => setLastname(e.target.value)}
                    required
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
                    placeholder="Insérez votre prénom"
                    onChange={(e) => setFirstname(e.target.value)}
                    required
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
                  placeholder="Insérez votre email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label
                htmlFor="password"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              >
                Mot de passe <br />
                <input
                  type="password"
                  name="password"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Insérez votre pmot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="8"
                />
              </label>
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
                  onClick={(e) => setRole(e.target.value)}
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

        <div className="flex w-full justify-center">
          <button type="submit">Valider</button>
        </div>
      </form>
    </div>
  );
}

AddUser.propTypes = {
  setShowAddUser: PropTypes.func.isRequired,
  setShowAlertAddUser: PropTypes.func.isRequired,
  setShowAlertEmailNotDispo: PropTypes.func.isRequired,
};
