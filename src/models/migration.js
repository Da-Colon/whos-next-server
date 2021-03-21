import mongoose from 'mongoose';

export const Migration = db => db.model('Migration', MigrationSchema);
export default Migration;

const MigrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    }
  }
);

export const lookupMigration = (migrationTemplate, query) => {
  return new Promise((resolve, reject) => {
    return migrationTemplate
      .findOne(query)
      .then(resolve)
      .catch(reject);
  });
}

export const saveMigration = migration => {
  return new Promise((resolve, reject) => {
    return migration
      .save()
      .then(resolve)
      .catch(reject);
  });
};
