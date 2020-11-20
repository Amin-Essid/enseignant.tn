"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateInput_1 = require("./validateInput");
exports.validateRegister = (options) => {
    let errors = [];
    errors.push(validateInput_1.validateInput(!options.email.includes("@"), "email", "invalid email"));
    errors.push(validateInput_1.validateInput(options.username.length <= 2, "username", "length must be greater than 2"));
    errors.push(validateInput_1.validateInput(options.username.includes("@"), "username", "cannot include an @"));
    errors.push(validateInput_1.validateInput(options.password.length <= 2, "password", "length must be greater than 2"));
    errors.push(validateInput_1.validateInput(options.school === "", "school", "add your school"));
    errors.push(validateInput_1.validateInput(options.state === "", "state", "add your state"));
    errors.push(validateInput_1.validateInput(options.birthDate === "", "birthDate", "add your birth date"));
    for (const er of errors) {
        if (er !== null) {
            return er;
        }
    }
    return null;
};
//# sourceMappingURL=validateRegister.js.map