import { Meteor } from 'meteor/meteor';
import { RedisOplog } from 'meteor/cultofcoders:redis-oplog'
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


Meteor.startup(() => {
  // code to run on server at startup


});


export const collectionCallback = new ValidatedMethod({
  name: 'test.collectionCallback',

  validate: null,

  run() {
    Tests.insert({
      test: Random.id(),
    }, { selector: { type: 'test' } }, (error, response) => {
      console.log('TEST RESULT (CALLBACK): ', error, response);
    });
  },
});
