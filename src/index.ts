import { createInterface } from "readline";
import { processEquation } from "./engine";
import { getSuccessText } from "./utils/formatter";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (): Promise<null> =>
  new Promise((resolve) => {
    rl.question("> ", (equation: string) => {
      const answer = processEquation(equation);
      if (answer) {
        console.log(getSuccessText(answer));
      }
      resolve(null);
    });
  });

async function start(): Promise<null> {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await question();
  }
}

start();
