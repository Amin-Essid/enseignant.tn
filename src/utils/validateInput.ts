export const validateInput = (
  condition: any,
  inputName: string,
  msg: string
) => {
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
