import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import inputValidationRules from "../../services/inputValidationRules";

export default function AddUser({ setShowAddUser }) {
  // const [newUploadedFileName, setNewUploadedFileName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(parseInt("", 10));

  const [rolesData, setRolesData] = useState([]);
  // const [requireSelect, setRequiredSelect] = useState(false);

  // const [targetValues, setTargetValues] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   password: "",
  //   role: "",
  // });

  // const update = (event) => {
  //   const target = event.currentTarget;

  //   setTargetValues({
  //     ...targetValues,
  //     [target.name]: target.value,
  //   });
  // };

  // useEffect(() => {
  //   setTargetValues({
  //     ...targetValues,
  //   });
  // }, []);

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
        .catch((err) => {
          console.info(err);
        });
    } else console.info("une erreur");
  };

  return (
    <form className="add-user-management" onSubmit={submit}>
      <div className="add-user-title-container">
        <h2 className="add-user-title">Ajout d'utilisateur</h2>
        <div className="close-modal-button-container">
          <button
            type="button"
            className="close-modal-button"
            onClick={() => setShowAddUser(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      <div className="user-management-container">
        <div className="input-container">
          <div className="input-fields">
            <div className="input-fields name-inputs-container">
              <label htmlFor="lastname" className="lastName">
                Nom <br />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Insérez votre nom"
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </label>
              <label htmlFor="firstname" className="firstName">
                Prénom <br />
                <input
                  type="text"
                  name="firstname"
                  placeholder="Insérez votre prénom"
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </label>
            </div>
            <label htmlFor="email">
              Email <br />
              <input
                type="email"
                name="email"
                className="input-email"
                placeholder="Insérez votre email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label htmlFor="password">
              Mot de passe <br />
              <input
                type="password"
                name="password"
                placeholder="Insérez votre pmot de passe"
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
            </label>
            <label htmlFor="role">
              Rôle
              <br />
              <select
                className=""
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

      <div className="add-button-container">
        <button type="submit">Valider</button>
      </div>
    </form>
  );
}

AddUser.propTypes = {
  setShowAddUser: PropTypes.func.isRequired,
};
