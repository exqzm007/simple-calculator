import { parseEquation } from "../parser";
import {
  hasBrackets,
  hasFirstPriorityOperators,
  hasSecondPriorityOperators,
} from "../validators";
import {
  getFirstPriorityOperators,
  getSecondPriorityOperators,
} from "../utils/getOperatorsByPriority";
import { operators, OperatorsType, PRIORITY_SCALE } from "../constants";
import { getErrorText } from "../utils/formatter";

const firstPriorityOperators = getFirstPriorityOperators();
const secondPriorityOperators = getSecondPriorityOperators();

export const getPriorityValidator = (priority: PRIORITY_SCALE) => {
  switch (priority) {
    case PRIORITY_SCALE.FIRST:
      return hasFirstPriorityOperators;
    case PRIORITY_SCALE.SECOND:
      return hasSecondPriorityOperators;
    default:
      throw new Error("Invalid priority type");
  }
};

export const getPriorityOperators = (priority: PRIORITY_SCALE) => {
  switch (priority) {
    case PRIORITY_SCALE.FIRST:
      return firstPriorityOperators;
    case PRIORITY_SCALE.SECOND:
      return secondPriorityOperators;
    default:
      throw new Error("Invalid priority type");
  }
};

export const calcByPriority = (
  parsedEquation: Array<string>,
  priority: PRIORITY_SCALE
) => {
  const priorityValidator = getPriorityValidator(priority);
  const priorityOperators = getPriorityOperators(priority);

  const simplifiedEquation: Array<string> = [...parsedEquation];

  if (priorityValidator(simplifiedEquation)) {
    for (let i = 0; i < simplifiedEquation.length - 1; i++) {
      if (priorityOperators.includes(simplifiedEquation[i] as OperatorsType)) {
        const operator = simplifiedEquation[i] as OperatorsType;
        const prev = simplifiedEquation[i - 1];
        const next = simplifiedEquation[i + 1];
        const result = operators[operator].handler(prev, next);
        simplifiedEquation.splice(i - 1, 3, String(result));
        i -= 1;
      }
    }
  }

  return simplifiedEquation;
};

const processFirstPriority = (parsedEquation: Array<string>) => {
  return calcByPriority(parsedEquation, PRIORITY_SCALE.FIRST);
};

const processSecondPriority = (parsedEquation: Array<string>) => {
  return calcByPriority(parsedEquation, PRIORITY_SCALE.SECOND);
};

export const processWithBrackets = (parsedEquation: Array<string>) => {
  if (!hasBrackets(parsedEquation)) {
    return calc(parsedEquation);
  } else {
    const simplifiedEquation = [...parsedEquation];

    do {
      let openBracketIndex: number;
      let closeBracketIndex: number;
      simplifiedEquation.forEach((x, index) => {
        if (x === "(") {
          openBracketIndex = index;
        }
        if (x === ")") {
          closeBracketIndex = index;
          const newEquationToProcess = simplifiedEquation.slice(
            openBracketIndex + 1,
            closeBracketIndex
          );
          const calculatedEquation = calc(newEquationToProcess);
          simplifiedEquation.splice(
            openBracketIndex,
            newEquationToProcess.length + 2,
            calculatedEquation
          );
        }
      });
    } while (hasBrackets(simplifiedEquation));

    return calc(simplifiedEquation);
  }
};

const calc = (parsedEquation: Array<string>) => {
  let answer;

  const filteredByFirstPriority = processFirstPriority(parsedEquation);
  if (filteredByFirstPriority.length > 1) {
    answer = processSecondPriority(filteredByFirstPriority)[0];
  } else {
    answer = filteredByFirstPriority[0];
  }

  return answer;
};

export const processEquation = (equation: string) => {
  try {
    const parsedEquation = parseEquation(equation);
    return Number(processWithBrackets(parsedEquation));
  } catch (e) {
    if (e instanceof Error || e instanceof TypeError) {
      console.error(getErrorText(e.message));
    } else {
      console.error(getErrorText());
    }
  }
};
