"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
exports.validateInput = (condition, inputName, msg) => {
    if (condition) {
        return [
            {
                field: inputName,
                message: msg,
            },
        ];
    }
    return null;
};
//# sourceMappingURL=validateInput.js.map