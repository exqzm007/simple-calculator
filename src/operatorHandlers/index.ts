import { hasUnaryOperator } from "../validators";
import { operators } from "../constants";

export type OperatorHandler = (
  a: number | string,
  b: number | string
) => number;
export type UnaryOperatorHandler = (a: number | string) => number;

export function convertOperands(
  a: number | string,
  b: number | string
): [number, number] {
  const hasUnaryA = hasUnaryOperator(String(a));
  const hasUnaryB = hasUnaryOperator(String(b));

  if (hasUnaryA) {
    if (isNaN(+hasUnaryA.value)) {
      throw new TypeError("Argument is not a valid number");
    }
    a = +(operators[hasUnaryA.operator].handler as UnaryOperatorHandler)(
      hasUnaryA.value
    );
  } else {
    a = Number(a);
  }

  if (hasUnaryB) {
    if (isNaN(+hasUnaryB.value)) {
      throw new TypeError("Argument is not a valid number");
    }
    b = +(operators[hasUnaryB.operator].handler as UnaryOperatorHandler)(
      hasUnaryB.value
    );
  } else {
    b = Number(b);
  }

  if (isNaN(a) || isNaN(b)) {
    throw new TypeError("Argument is not a valid number");
  }
  return [a, b];
}

export const mul: OperatorHandler = (a, b) => {
  [a, b] = convertOperands(a, b);
  return a * b;
};

export const div: OperatorHandler = (a, b) => {
  [a, b] = convertOperands(a, b);
  return a / b;
};

export const add: OperatorHandler = (a, b) => {
  [a, b] = convertOperands(a, b);
  return a + b;
};

export const sub: OperatorHandler = (a, b) => {
  [a, b] = convertOperands(a, b);
  return a - b;
};

export const pow: OperatorHandler = (a, b) => {
  [a, b] = convertOperands(a, b);
  return Math.pow(a, b);
};

export const factorial: UnaryOperatorHandler = (a) => {
  if (+a < 1) {
    throw new Error("Invalid factorial value");
  } else if (+a === 1) {
    return 1;
  } else {
    return +a * factorial(+a - 1);
  }
};

export const square: UnaryOperatorHandler = (a) => {
  return +a * +a;
};
