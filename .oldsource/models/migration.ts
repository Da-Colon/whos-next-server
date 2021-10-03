import mongoose from "mongoose";
import { Database } from "../types/database.interface";

export const Migration = (db: Database) => db.model("Migration", MigrationSchema);
export default Migration;

const MigrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const lookupMigration = (migrationTemplate: mongoose.Model<any>, query: any) => {
  return new Promise((resolve, reject) => {
    return migrationTemplate.findOne(query).then(resolve).catch(reject);
  });
};

export const saveMigration = (migration: any, name: string) => {
  return new Promise((resolve, reject) => {
    return migration.save({ name }).then(resolve).catch(reject);
  });
};
