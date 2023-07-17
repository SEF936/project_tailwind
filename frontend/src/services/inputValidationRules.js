const isValidEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(String(email).toLowerCase());
};

export default function inputValidationRules(
  firstname,
  lastname,
  email,
  password,
  role
) {
  return {
    firstname: !!firstname && firstname.match(/^ *$/) === null,
    lastname: !!lastname && lastname.match(/^ *$/) === null,
    email: isValidEmail(email),
    password:
      !!password && password.length > 8 && password.match(/^ *$/) === null,
    role: role !== "",
  };
}
