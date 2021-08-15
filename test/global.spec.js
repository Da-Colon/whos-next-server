import app from '../src/app';
import { database } from '../src/database';
import { set } from '../src/models'

let _testDb;
let _testApp;

before(async () => {
  _testDb = database('whos-next-test');
  _testApp = await app(_testDb);
  
  for (let model of set()) {
    await model.deleteMany({})
  }
});

after(() => _testDb.close());

export const testApp = () => _testApp;
export const testDb = () => _testDb;