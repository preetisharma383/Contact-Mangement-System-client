export default function Validation(values) {
  let errors = {}

  const email_Pattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const password_Pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  // name
  if(values?.name){
    if (values.name === "") {
    errors.name = "Name should not be empty."
  } else if (values.name.length < 3 || values.name.length > 30) {
    errors.name = "Characters should be more than 3 and less than 30"
  }

  }
  
  // email
  if (values.email === "") {
    errors.email = "Email should not be empty."
  } else if (!email_Pattern.test(values.email)) {
    errors.email = "Invalid Email id!"
  }

  // password
  if (values.password === "") {
    errors.password = "Password should not be empty."
  } else if (!password_Pattern.test(values.password)) {
    errors.password = "Invalid Password!"
  }

  return errors; // 🔥 THIS WAS MISSING
}
 