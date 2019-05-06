
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('inventoryCount', t => {
      t.bigIncrements('id');
      t.date('postingDate').notNullable();
      t.string('materialNum', 30).notNullable();
      t.string('plantNum', 30).notNullable();
      t.string('storageLocation', 30).notNullable();
      t.string('movementType', 30).notNullable();
      t.string('specialStock', 30);
      t.string('materialDoc', 30).notNullable();
      t.string('materialDocItem', 30).notNullable();
      t.string('orderNum', 30);
      t.integer('qntyOfOrder').notNullable();
      t.string('unitOfOrder', 30).notNullable();
      t.string('purchaseOrderNum', 30);
      t.timestamps(true, true);
      t.timestamp('deleted_at');
    })
    // knex.schema.createTableIfNotExists('twitter_ids', t => {
    //   t.bigIncrements('id');
    //   t.bigInteger('pg_tweet_id').notNullable().references('pg_tweets.id');
    //   t.bigInteger('twitter_id').notNullable();
    // })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('inventoryCount')
    // knex.schema.dropTable('pg_tweets')
  ]);
};
