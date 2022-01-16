import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (): Promise<null> =>
  new Promise((resolve) => {
    rl.question("> ", (answer: string) => {
      console.log(answer);

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
