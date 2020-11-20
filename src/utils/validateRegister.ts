import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";
import { validateInput } from "./validateInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  let errors = [];
  errors.push(
    validateInput(!options.email.includes("@"), "email", "invalid email")
  );
  errors.push(
    validateInput(
      options.username.length <= 2,
      "username",
      "length must be greater than 2"
    )
  );
  errors.push(
    validateInput(
      options.username.includes("@"),
      "username",
      "cannot include an @"
    )
  );
  errors.push(
    validateInput(
      options.password.length <= 2,
      "password",
      "length must be greater than 2"
    )
  );
  errors.push(
    validateInput(options.school === "", "school", "add your school")
  );
  errors.push(validateInput(options.state === "", "state", "add your state"));
  errors.push(
    validateInput(options.birthDate === "", "birthDate", "add your birth date")
  );
  for (const er of errors) {
    if (er !== null) {
      return er;
    }
  }

  return null;
};
