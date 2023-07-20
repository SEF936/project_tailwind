/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function Contact() {
  const [showAlertMessageSend, setShowAlertMessageSend] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.info(data);

  console.info(errors);

  const handleClose = () => {
    setShowAlertMessageSend(false);
  };
  setTimeout(handleClose, 3000);
  return (
    <div className=" h-96 overflow-scroll w-80 my-12 container mx-auto md:w-96 ">
      {showAlertMessageSend && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success" onClose={handleClose}>
            Message envoyé
          </Alert>
        </Stack>
      )}
      <h1 className="text-center text-3xl w-full mx-auto mb-4">
        Formulaire de contact
      </h1>
      <form
        className="flex flex-col mx-3 my-auto"
        onSubmit={() => {
          handleSubmit(onSubmit);
          setShowAlertMessageSend(true);
        }}
      >
        <label
          htmlFor="title"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Titre
          <br />
          <select
            className="appearance-none block w-24 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            {...register("Title", { required: true })}
          >
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
          </select>
        </label>
        <label
          htmlFor="firstname"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Prénom
          <br />
          <input
            type="text"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="First name"
            {...register("First name", { required: true, maxLength: 80 })}
          />
        </label>
        <label
          htmlFor="lastname"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Nom
          <br />
          <input
            type="text"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Last name"
            {...register("Last name", { required: true, maxLength: 100 })}
          />
        </label>
        <label
          htmlFor="email"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Email
          <br />
          <input
            type="text"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="Email"
            {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        </label>
        <label
          htmlFor="objet"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Objet de la demande
          <br />
          <input
            type="text"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="object de la demande"
            {...register("object de la demande", {})}
          />
        </label>
        <label
          htmlFor="message"
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        >
          Message
          <br />
          <textarea
            className="appearance-none resize-none block w-full h-36 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            {...register("message", {})}
          />
        </label>
        <input className="bg-indigo-400 w-24 mx-auto" type="submit" />
      </form>
    </div>
  );
}
export default Contact;
