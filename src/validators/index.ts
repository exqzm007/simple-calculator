import { operators, OperatorsType } from "../constants";
import {
  getFirstPriorityOperators,
  getSecondPriorityOperators,
  getUnaryOperators,
} from "../utils/getOperatorsByPriority";

type ValidatorFunc = (parsedEquation: Array<string>) => boolean;

export const isNumber = (val: string | number) => {
  return !isNaN(Number(val));
};

export function isBracket(str: string) {
  return ["(", ")"].includes(str);
}

export const hasBrackets = (parsedEquation: Array<string>) => {
  return ["(", ")"].some((x) => parsedEquation.includes(x));
};

export const isValidBracketsPosition: ValidatorFunc = (parsedEquation) => {
  let isValid = true;
  for (let i = 1; i < parsedEquation.length - 1; i++) {
    const x = parsedEquation[i];
    const prev = parsedEquation[i - 1];
    const next = parsedEquation[i + 1];
    if (
      (isBracket(x) && isBracket(prev) && prev !== x) ||
      (isBracket(x) && isBracket(next) && next !== x)
    ) {
      isValid = false;
      break;
    }
  }

  return isValid;
};

export const isValidBrackets: ValidatorFunc = (parsedEquation) => {
  const brackets = parsedEquation.filter((x) => x === "(" || x === ")");
  const isValidPosition = isValidBracketsPosition(parsedEquation);
  if (brackets.length === 0) {
    return true;
  } else
    return !(
      brackets.length % 2 !== 0 ||
      brackets[0] === ")" ||
      brackets[brackets.length - 1] === "(" ||
      !isValidPosition
    );
};

export const isValidFirstAndLastSymbol: ValidatorFunc = (parsedEquation) => {
  const invalidOperators = Object.keys(operators);
  const first = parsedEquation[0];
  const last = parsedEquation[parsedEquation.length - 1];
  if (!first || !last) {
    return false;
  } else if (
    invalidOperators.includes(first) ||
    invalidOperators.includes(last)
  ) {
    return false;
  } else if (
    (first !== "(" && !isNumber(first) && !hasUnaryOperator(first)) ||
    (last !== ")" && !isNumber(last) && !hasUnaryOperator(last))
  ) {
    return false;
  } else {
    return true;
  }
};

export const isValidLength: ValidatorFunc = (parsedEquation) => {
  return parsedEquation && parsedEquation.length > 2;
};

export const validate: ValidatorFunc = (parsedEquation) => {
  const validators: Array<ValidatorFunc> = [
    isValidLength,
    isValidBrackets,
    isValidFirstAndLastSymbol,
  ];
  return validators.every((f) => f(parsedEquation));
};

const firstPrioritySymbols = getFirstPriorityOperators();
export const hasFirstPriorityOperators: ValidatorFunc = (parsedEquation) => {
  return parsedEquation.some((x) =>
    firstPrioritySymbols.includes(x as OperatorsType)
  );
};

const secondPrioritySymbols = getSecondPriorityOperators();
export const hasSecondPriorityOperators: ValidatorFunc = (parsedEquation) => {
  return parsedEquation.some((x) =>
    secondPrioritySymbols.includes(x as OperatorsType)
  );
};

const unaryOperators = getUnaryOperators();
export const hasUnaryOperator = (a: string) => {
  const withUnary = unaryOperators.find((x) => a.indexOf(x) === 0);
  if (withUnary) {
    const numberToCalc = a.substring(withUnary.length);
    return {
      operator: withUnary,
      number: numberToCalc,
    };
  } else {
    return false;
  }
};
