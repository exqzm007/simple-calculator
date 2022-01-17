import {
  processEquation,
  calcByPriority,
  processWithBrackets,
  getPriorityValidator,
  getPriorityOperators,
} from "./index";

describe("Test processing of the equation", () => {
  test("2 + 2 * 3 to equal 8", () => {
    expect(processEquation("2 + 2 * 3")).toBe(8);
  });

  test("5 + 3 * ( 2 + 5 ) to equal 26", () => {
    expect(processEquation("5 + 3 * ( 2 + 5 )")).toBe(26);
  });

  test("!5 + 10 to equal 130", () => {
    expect(processEquation("!5 + 10")).toBe(130);
  });

  test("10 + **3 to equal 19", () => {
    expect(processEquation("10 + **3")).toBe(19);
  });

  test("4 + ( ( 2 + 3 ) * 2 ) to equal 14", () => {
    expect(processEquation("4 + ( ( 2 + 3 ) * 2 )")).toBe(14);
  });
});

describe("Test calc by priority function", () => {
  test("['2', '+', '2'] with second priority to equal [4]", () => {
    expect(calcByPriority(["2", "+", "2"], 2)).toStrictEqual(["4"]);
  });

  test("['2', '*', '2'] with second priority to equal ['2', '*', '2']", () => {
    expect(calcByPriority(["2", "*", "2"], 2)).toStrictEqual(["2", "*", "2"]);
  });

  test("['3', '+', '10'] with first priority to equal ['3', '+', '10']", () => {
    expect(calcByPriority(["3", "+", "10"], 1)).toStrictEqual(["3", "+", "10"]);
  });

  test("['3', '*', '10'] with first priority to equal ['30']", () => {
    expect(calcByPriority(["3", "*", "10"], 1)).toStrictEqual(["30"]);
  });
});

describe("Test Process with brackets function", () => {
  test("['2', '*', '(', '4', '+', '10', ')'] to equal '28'", () => {
    expect(processWithBrackets(["2", "*", "(", "4", "+", "10", ")"])).toBe(
      "28"
    );
  });
});

describe("Get priority handlers", () => {
  test("getPriorityValidator to throw", () => {
    expect(() => getPriorityValidator(3)).toThrow("Invalid priority type");
  });
  test("getPriorityValidator not to throw", () => {
    expect(getPriorityValidator(2)).toBeTruthy();
  });

  test("getPriorityOperators to throw", () => {
    expect(() => getPriorityOperators(3)).toThrow("Invalid priority type");
  });
  test("getPriorityOperators to equal ['+', '-']", () => {
    expect(getPriorityOperators(2)).toStrictEqual(["+", "-"]);
  });
});
