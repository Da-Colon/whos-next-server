import childProcess from 'child_process';
import listEndpoints from 'express-list-endpoints';

import packageJson from '../../package.json';

const environment = process.env.NODE_ENV;
const gitHash = 'git rev-parse --short HEAD';
const revision = childProcess.execSync(gitHash).toString().trim();
const version = `${packageJson.name} ${packageJson.version}+${revision}`

export const getRoot = app => {
  return (_, res) => {
    res.status(200).send(
      {
        '👋': '🌍',
        environment,
        version,
        endpoints: listEndpoints(app)
      }
    )
  }
}