import { spawn } from 'node:child_process';
const args = process.argv.slice(2)
  .filter(arg => arg !== '--strictPort')
  .map(arg => arg === '--host' ? '--hostname' : arg);
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', ...args], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.kill(signal));
server.on('exit', code => { process.exitCode = code ?? 0; });
