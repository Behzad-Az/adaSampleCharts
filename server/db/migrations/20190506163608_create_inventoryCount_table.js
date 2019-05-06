
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('inventoryCount', t => {
      t.bigIncrements('id');
      t.string('materialMaster', 15).notNullable();
      // t.string('company_hashtag', 20).notNullable();
      // t.string('company_id', 20).notNullable();
      // t.string('work_location_hashtag', 15).notNullable();
      // t.string('work_enviro', 20).notNullable();
      // t.string('content', 500).notNullable();
      // t.integer('like_count').notNullable().defaultTo(0);
      // t.integer('flag_count').notNullable().defaultTo(0);
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
