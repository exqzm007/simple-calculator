import { sub, add, mul, div, pow, factorial, square } from "./index";

describe("Add handler", () => {
  test("Add 5 + 7 to equal 12", () => {
    expect(add(5, 7)).toBe(12);
  });

  test("Add 20 + -7 to equal 13", () => {
    expect(add(20, -7)).toBe(13);
  });
});

describe("Sub handler", () => {
  test("Sub 10 - 22 to equal -12", () => {
    expect(sub(10, 22)).toBe(-12);
  });

  test("Sub 10 - 10 to equal 0", () => {
    expect(sub(10, 10)).toBe(0);
  });
});

describe("Div handler", () => {
  test("Div 40 / 2 to equal 20", () => {
    expect(div(40, 2)).toBe(20);
  });

  test("Div 9 / 2 to equal 4.50", () => {
    expect(div(9, 2)).toBe(4.5);
  });
});

describe("Mul handler", () => {
  test("Mul 13 * 3 to equal 39", () => {
    expect(mul(13, 3)).toBe(39);
  });

  test("Mul 44 * -2", () => {
    expect(mul(44, -2)).toBe(-88);
  });
});

describe("Pow handler", () => {
  test("Pow 2 ^ 3 to equal 8", () => {
    expect(pow(2, 3)).toBe(8);
  });

  test("Pow 5 ^ 3 to equal 125", () => {
    expect(pow(5, 3)).toBe(125);
  });
});

describe("Factorial handler", () => {
  test("Factorial !5 to equal 120", () => {
    expect(factorial(5)).toBe(120);
  });

  test("Factorial !0 to throw", () => {
    expect(() => factorial(0)).toThrow("Invalid factorial value");
  });

  test("Factorial !1 to equal 1", () => {
    expect(factorial(1)).toBe(1);
  });
});

describe("Square handler", () => {
  test("Square **5 to equal 25", () => {
    expect(square(5)).toBe(25);
  });

  test("Square **7 to equal 49", () => {
    expect(square(7)).toBe(49);
  });
});
