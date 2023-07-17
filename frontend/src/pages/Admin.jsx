import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../contexts/userContext";

function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();
  const postUserInfos = (e) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setUser(res.data.user);
        setTimeout(() => {
          navigate("/admin/loged/panel");
        }, 500);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="w-full h-full">
      <form onSubmit={postUserInfos}>
        <div className="w-80 mx-auto h-80 py-8 items-center md:w-96 md:mx-auto flex-col bg-">
          <div className="flex flex-col w-64 mx-auto ">
            <label htmlFor="logInUsername">
              <p>Email</p>
            </label>
            <input
              className=" rounded-lg h-8 mt-2 bg-gray-200"
              autoComplete="nom d'utilisateur"
              id="logInUsername"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="logInPassword">
              <p>Mot de passe</p>
            </label>
            <input
              className="rounded-lg h-8 mt-2 bg-gray-200"
              autoComplete="mot de passe"
              id="logInPassword"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col h-32 w-64 pt-6 gap-4 mx-auto text-center justify-items-center ">
            <button
              className="rounded-full h-8 w-32 mx-auto bg-sky-500/100"
              type="submit"
            >
              <h2>Se connecter</h2>
            </button>
            <p>Mot de passe oublié ?</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Admin;
