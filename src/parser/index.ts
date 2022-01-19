import { validate } from "../validators";

export const parseEquation = (equation: string) => {
  const parsedEquation = equation.trim().split(" ");
  if (!validate(parsedEquation)) {
    throw new Error("Invalid equation.");
  }

  return parsedEquation;
};
