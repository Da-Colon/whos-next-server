import debugLib from 'debug';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import omg from 'ohmigrate';
import path from 'path';

import { Migration, lookupMigration, saveMigration } from '../models/migration';

dotenv.config();

const debug = debugLib('whos-next:database');

export const database = name => {
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || 27017;
  const dbName = name || process.env.DB_NAME || 'development';
  const dbUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;
  
  const options = { 
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
  };

  const exit = message => {
    debug(message);
    process.exit(1);
  }

  const db = mongoose.createConnection(dbUrl, options);
  db.on('connected', () => debug(`Connected to ${db.name} database`));
  db.on('disconnected', () => debug(`Disconnected from ${db.name} database`));
  db.on('error', error => exit(`Error with connection to ${db.name} database: ${error}`));

  return db;
};

export const storage = (app, db) => {
  migrate(db);

  app.use((req, _res, next) => {
    req.db = db
    next();
  });
}

export const addPlugins = schema => {
  schema.plugin(mongoosePaginate);
  schema.set('timestamps', true);
}

export const migrate = db => {
  let count = 0;
  omg({
    should: function (name, cb) {
      Promise.resolve()
        .then(() => Migration(db))
        .then(template => lookupMigration(template, { name }))
        .then(migration => cb(null, !migration))
        .catch(err => cb(err, false));
    },

    did: function (name, cb) {
      saveMigration(new Migration(db)({ name }))
        .then(() => {
          debug("performed migration", name);
          count++;
         cb()
        })
        .catch(debug);
    },

    done: function (err) {
      if (err) debug(err)
      else if (count > 0) debug(`finished with ${count} migrations!`)
      else debug("no migrations!")
    },

    ctx: { db, debug },
    dir: path.resolve(__dirname, './migrations')
  });
};
