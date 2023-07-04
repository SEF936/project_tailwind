import { useEffect, useState } from "react";
import axios from "axios";
// import AddUser from "./AddUser";
import oeil from "../assets/view.png";
// import ModifyUser from "../GlobalComponents/ModifyUser";

function UsersList() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [users, setUsers] = useState([]);
  // const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, [showAddUser, setShowAddUser, showUpdateUser]);

  return (
    <div className="display">
      {/* {showAddUser && <AddUser setShowAddUser={setShowAddUser} />}
      {showUpdateUser && (
        <ModifyUser
          setShowUpdateUser={setShowUpdateUser}
          currentUser={currentUser}
        />
      )} */}
      <button
        type="button"
        className="addBtn"
        onClick={() => setShowAddUser(true)}
      >
        Ajouter un utilisateur
      </button>
      <table className="border-spacing-2 border border-collapse border-slate-500 hover:border-collapse table-auto">
        <caption className="caption-top">Table des utilisateurs</caption>
        <thead>
          <tr>
            <th className=" p-4 border border-slate-600 ...">Nom</th>
            <th className=" p-4 border border-slate-600 ...">Prénom</th>
            <th className=" p-4 border border-slate-600 ...">Email</th>
            <th className=" p-4 border border-slate-600 ...">Admin</th>
            <th className=" p-4 border border-slate-600 ...">Crée le</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                {/* <div className="picture-container">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                      user.photo
                    }`}
                    alt="profil"
                  />
                </div> */}
                <td className=" p-2 border border-slate-700">
                  {user.lastname}
                </td>
                <td className=" p-2 border border-slate-700">
                  {user.firstname}
                </td>
                <td className="p-2 border border-slate-700">{user.email}</td>
                <td className="p-2 border border-slate-700">{user.roles}</td>
                <td className="p-2 border border-slate-700">
                  {user.creation_date}
                </td>
                <td className="p-2 border border-slate-700">
                  <button
                    type="button"
                    className="viewBtn"
                    onClick={() => {
                      // eslint-disable-next-line no-sequences
                      return setShowUpdateUser(true);
                      // , setCurrentUser(user);
                    }}
                  >
                    <img src={oeil} alt="" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
