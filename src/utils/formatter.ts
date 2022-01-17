export const getSuccessText = (answer: string | number) => {
  answer = Number(answer).toFixed(2);
  return `Result: ${answer}`;
};

export const getErrorText = (error = "Something went wrong") => {
  return `Error: ${error}`;
};
