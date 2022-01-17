import {
  hasBrackets,
  hasFirstPriorityOperators,
  hasSecondPriorityOperators,
  hasUnaryOperator,
  isBracket,
  isNumber,
  isValidBrackets,
  isValidBracketsPosition,
  isValidFirstAndLastSymbol,
  isValidLength,
  validate,
} from "./index";

describe("Test validators", () => {
  test("Is number to return false", () => {
    expect(isNumber("asd")).toBeFalsy();
  });
  test("Isnumber to return true", () => {
    expect(isNumber(123)).toBeTruthy();
  });

  test("IsBracket to return false", () => {
    expect(isBracket("12")).toBeFalsy();
  });
  test("IsBracket to return true", () => {
    expect(isBracket(")")).toBeTruthy();
  });

  test("hasBrackets to return false", () => {
    expect(hasBrackets(["1", "+", "3"])).toBeFalsy();
  });
  test("hasBracket to return true", () => {
    expect(hasBrackets(["1", "+", "(", "1", "+", "4", ")"])).toBeTruthy();
  });

  test("isValidBracketsPosition to return false", () => {
    expect(isValidBracketsPosition(["10", "+", "3", ")", "("])).toBeFalsy();
  });
  test("isValidBracketsPosition to return true", () => {
    expect(
      isValidBracketsPosition(["3", "+", "(", "2", "+", "4", ")"])
    ).toBeTruthy();
  });

  test("isValidBrackets to return false", () => {
    expect(isValidBrackets(["4", "+", "(", "3", ")", ")"])).toBeFalsy();
  });
  test("isValidBrackets to return true", () => {
    expect(isValidBrackets(["(", "2", "+", "4", ")"])).toBeTruthy();
  });

  test("isValidFirstAndLastSymbol to return false", () => {
    expect(isValidFirstAndLastSymbol(["*", "2", "+", "10"])).toBeFalsy();
  });
  test("isValidFirstAndLastSymbol to return false", () => {
    expect(isValidFirstAndLastSymbol([])).toBeFalsy();
  });
  test("isValidFirstAndLastSymbol to return true", () => {
    expect(isValidBrackets(["10", "*", "**10"])).toBeTruthy();
  });

  test("isValidLength to return false", () => {
    expect(isValidLength(["2", "+"])).toBeFalsy();
  });
  test("isValidLength to return true", () => {
    expect(isValidLength(["11", "+", "100", "*", "1"])).toBeTruthy();
  });

  test("validate to return false", () => {
    expect(validate(["7", "+", "11", "/", ")"])).toBeFalsy();
  });
  test("validate to return true", () => {
    expect(validate(["8", "+", "!10", "*", "2"])).toBeTruthy();
  });

  test("hasFirstPriorityOperators to return false", () => {
    expect(hasFirstPriorityOperators(["2", "+", "10"])).toBeFalsy();
  });
  test("hasFirstPriorityOperators to return true", () => {
    expect(hasFirstPriorityOperators(["2", "*", "10"])).toBeTruthy();
  });

  test("hasSecondPriorityOperators to return false", () => {
    expect(hasSecondPriorityOperators(["13", "/", "9"])).toBeFalsy();
  });
  test("hasSecondPriorityOperators to return true", () => {
    expect(hasSecondPriorityOperators(["7", "+", "!4"])).toBeTruthy();
  });

  test("hasUnaryOperator to return false", () => {
    expect(hasUnaryOperator("123")).toBeFalsy();
  });
  test("hasUnaryOperator to return true", () => {
    expect(hasUnaryOperator("**6")).toBeTruthy();
  });
  test("hasUnaryOperator to return true", () => {
    expect(hasUnaryOperator("!5")).toBeTruthy();
  });
});
