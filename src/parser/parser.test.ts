import { parseEquation } from "./index";

describe("Parse equation function", () => {
  test("10 + a to throw an error", () => {
    expect(() => parseEquation("10 + a")).toThrow("Invalid equation.");
  });

  test("10 + !5 * 3 + ( 2 + 3 ) to be ['10', '+', '!5', '*', '3', '+', '(', '2', '+', '3', ')']", () => {
    expect(parseEquation("10 + !5 * 3 + ( 2 + 3 )")).toStrictEqual([
      "10",
      "+",
      "!5",
      "*",
      "3",
      "+",
      "(",
      "2",
      "+",
      "3",
      ")",
    ]);
  });
});
