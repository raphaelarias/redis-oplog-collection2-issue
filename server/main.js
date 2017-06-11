
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Tests = new Mongo.Collection('tests');

Tests.schema = new SimpleSchema({
  test: {
    type: String,
  }
});

// Attach to collection
Tests.attachSchema(Tests.schema, { selector: { type: 'test' } });

export const collectionCallback = new ValidatedMethod({
  name: 'test.collectionCallback',

  validate: null,

  run() {
    console.log('Running method...');
    Tests.insert({
      test: Random.id(),
    }, { selector: { type: 'test' } }, (error, response) => {
      console.log('TEST RESULT (CALLBACK): ', error, response);
    });
  },
});
