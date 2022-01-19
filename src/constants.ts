import {
  add,
  div,
  factorial,
  mul,
  OperatorHandler,
  pow,
  square,
  sub,
  UnaryOperatorHandler,
} from "./operatorHandlers";

export enum PRIORITY_SCALE {
  FIRST = 1,
  SECOND,
  THIRD,
}

export type OperatorsType = "*" | "/" | "+" | "^" | "-" | "**" | "!";

export type IOperator = {
  [key in OperatorsType]: {
    priority: PRIORITY_SCALE;
    handler: OperatorHandler | UnaryOperatorHandler;
    isUnary: boolean;
  };
};

export const operators: IOperator = {
  "*": {
    priority: PRIORITY_SCALE.FIRST,
    handler: mul,
    isUnary: false,
  },
  "/": {
    priority: PRIORITY_SCALE.FIRST,
    handler: div,
    isUnary: false,
  },
  "^": {
    priority: PRIORITY_SCALE.FIRST,
    handler: pow,
    isUnary: false,
  },
  "+": {
    priority: PRIORITY_SCALE.SECOND,
    handler: add,
    isUnary: false,
  },
  "-": {
    priority: PRIORITY_SCALE.SECOND,
    handler: sub,
    isUnary: false,
  },
  "**": {
    priority: PRIORITY_SCALE.THIRD,
    handler: square,
    isUnary: true,
  },
  "!": {
    priority: PRIORITY_SCALE.THIRD,
    handler: factorial,
    isUnary: true,
  },
};
