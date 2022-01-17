import { getSuccessText, getErrorText } from "./formatter";
// import { getFirstPriorityOperators, getSecondPriorityOperators, getUnaryOperators } from "./getOperatorsByPriority";

describe("Test text formatters", () => {
  test("To return Result: 10", () => {
    expect(getSuccessText(10)).toBe("Result: 10.00");
  });

  test("Error message without arguments", () => {
    expect(getErrorText()).toBe("Error: Something went wrong");
  });

  test("Error message with argument", () => {
    expect(getErrorText("Custom error")).toBe("Error: Custom error");
  });
});
