import { useNavigate } from "react-router-dom";

export default function WrongPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="logo-container">
        <img src="{logo}" alt="logo" />
      </div>
      <div className="content-container">
        <img className="raccoon" src="{Img404}" alt="Raccoon" />
        <div className="text-container">
          <h1 className="wrongPage">Erreur de redirection</h1>
          <h2>Vous vous êtes surement tromper</h2>
          <p>
            Retournez sur la page d'accueil
            <button
              type="button"
              onClick={() => {
                setTimeout(() => {
                  navigate("/");
                }, 500);
              }}
            >
              Accueil
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
