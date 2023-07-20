import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import oeil from "../assets/view.png";
import AddUser from "./admin/AddUser";
import UpdateUser from "./admin/UpdateUser";

function UsersList() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [showAlertAddUser, setShowAlertAddUser] = useState(false);
  const [showAlertUpdateUser, setShowAlertUpdateUser] = useState(false);
  const [showAlertDeleteUser, setShowAlertDeleteUser] = useState(false);
  const [showAlertEmailNotDispo, setShowAlertEmailNotDispo] = useState(false);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, [showAlertAddUser, showAlertUpdateUser, showAlertDeleteUser]);

  const handleClose = () => {
    setShowAlertAddUser(false);
    setShowAlertUpdateUser(false);
    setShowAlertDeleteUser(false);
    setShowAlertEmailNotDispo(false);
  };
  setTimeout(handleClose, 3000);
  return (
    <div className="display">
      {showAlertEmailNotDispo && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error" onClose={handleClose}>
            Email déjà utilisé
          </Alert>
        </Stack>
      )}
      {showAlertAddUser && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success" onClose={handleClose}>
            Utilisateur ajouté
          </Alert>
        </Stack>
      )}
      {showAlertUpdateUser && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success" onClose={handleClose}>
            Utilisateur modifié
          </Alert>
        </Stack>
      )}
      {showAlertDeleteUser && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success" onClose={handleClose}>
            Utilisateur supprimé
          </Alert>
        </Stack>
      )}
      {showAddUser && (
        <AddUser
          setShowAddUser={setShowAddUser}
          setShowAlertAddUser={setShowAlertAddUser}
          setShowAlertEmailNotDispo={setShowAlertEmailNotDispo}
        />
      )}
      {showUpdateUser && (
        <UpdateUser
          setShowUpdateUser={setShowUpdateUser}
          setShowAlertUpdateUser={setShowAlertUpdateUser}
          setShowAlertDeleteUser={setShowAlertDeleteUser}
          currentUser={currentUser}
        />
      )}
      {!showAddUser && (
        <button
          type="button"
          className="addBtn"
          onClick={() => setShowAddUser(true)}
        >
          Ajouter un utilisateur
        </button>
      )}
      <table className="border-spacing-2 border border-collapse border-slate-500 hover:border-collapse table-auto mx-auto">
        <caption className="caption-top">Table des utilisateurs</caption>
        <thead>
          <tr>
            <th className=" p-4 border border-slate-600 ...">Nom</th>
            <th className=" p-4 border border-slate-600 ...">Prénom</th>
            <th className="hidden md:table-cell p-4 border border-slate-600 ...">
              Email
            </th>
            <th className=" p-4 border border-slate-600 ...">Admin</th>
            <th className="hidden md:table-cell p-4 border border-slate-600 ...">
              Crée le
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id_user}>
                <td className=" p-2 border border-slate-700">
                  {user.lastname}
                </td>
                <td className=" p-2 border border-slate-700">
                  {user.firstname}
                </td>
                <td className="hidden md:table-cell p-2 border border-slate-700">
                  {user.email}
                </td>
                <td className="p-2 border border-slate-700">{user.title}</td>
                <td className="hidden md:table-cell p-2 border border-slate-700">
                  {user.creation_date}
                </td>
                <td className="p-2 border border-slate-700">
                  <button
                    type="button"
                    className="viewBtn"
                    onClick={() => {
                      setShowUpdateUser(true);
                      setCurrentUser(user);
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
