import { operators, OperatorsType, PRIORITY_SCALE } from "../constants";

export const getFirstPriorityOperators = () => {
  const operatorsKeys = Object.keys(operators) as Array<OperatorsType>;
  return operatorsKeys.filter(
    (op) => operators[op].priority === PRIORITY_SCALE.FIRST
  );
};

export const getSecondPriorityOperators = () => {
  const operatorsKeys = Object.keys(operators) as Array<OperatorsType>;
  return operatorsKeys.filter(
    (op) => operators[op].priority === PRIORITY_SCALE.SECOND
  );
};

export const getUnaryOperators = () => {
  const operatorsKeys = Object.keys(operators) as Array<OperatorsType>;
  return operatorsKeys.filter((op) => operators[op].isUnary);
};
