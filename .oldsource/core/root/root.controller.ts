import childProcess from "child_process";
import listEndpoints from "express-list-endpoints";
import express from "express";
import packageJson from "../../../package.json";
import { Request } from "../../types/express.interface";

const environment = process.env.NODE_ENV;
const gitHash = "git rev-parse --short HEAD";
const revision = childProcess.execSync(gitHash).toString().trim();
const version = `${packageJson.name} ${packageJson.version}+${revision}`;

export const getRoot = (app: any) => {
  return (_: Request, res: express.Response) => {
    res.status(200).send({
      "👋": "🌍",
      environment,
      version,
      endpoints: listEndpoints(app),
    });
  };
};
