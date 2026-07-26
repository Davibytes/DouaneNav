import test from 'node:test';
import assert from 'node:assert/strict';

import { connectMongo, closeMongo } from '../src/infrastructure/database/mongo.js';


test('MongoDB connection works', async () => {

  const database = await connectMongo();

  assert.ok(database);

  await closeMongo();

});