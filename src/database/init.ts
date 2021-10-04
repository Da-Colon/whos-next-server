import debugLib from 'debug';
import dotenv from 'dotenv';
import express from 'express'

dotenv.config();
const debug = debugLib('whos-next:database');

export const database = async (name: string) => {
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || 27017;
  const dbName = name;
  const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;
  
  const options = { 
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
  };

  const exit = (message: string) => {
    debug(message);
    process.exit(1);
  }

  // const db = mongoose.createConnection(dbUrl, options);
  // db.on('connected', () => debug(`Connected to ${db.name} database`));
  // db.on('disconnected', () => debug(`Disconnected from ${db.name} database`));
  // db.on('error', error => exit(`Error with connection to ${db.name} database: ${error}`));

  return await Database;
};
