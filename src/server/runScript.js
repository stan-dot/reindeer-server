
import { spawn } from 'child_process';
const myPath = './src/server/scripts/script.py';

export const logOutput = (name) => (message) => console.log(`[${name}] ${message}`)

export default function run(args) {
  console.log("args: ", args);
  // console.log("args type ", typeof args);
  const values = Object.values(args)
  console.log("args values ", values);
  const str = JSON.stringify(args)
  console.log("stringifed: ", str);
  return new Promise((resolve, reject) => {
    const process = spawn('python', [myPath, str]);

    const out = []
    process.stdout.on(
      'data', data => {
        out.push(data.toString());
        logOutput('stdout')(data);
      }
    );

    const err = []
    process.stderr.on(
      'data', data => {
        err.push(data.toString());
        logOutput('stderr')(data);
      }
    );

    process.on('exit', (code, signal) => {
      logOutput('exit')(`${code} (${signal})`)
      if (code !== 0) {
        reject(new Error(err.join('\n')))
        return
      }
      try {
        resolve(JSON.parse(out[0]));
      } catch (e) {
        reject(e);
      }
    });
  });
}