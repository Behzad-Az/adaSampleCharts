
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('mtrlMetaInfo', t => {
      t.bigIncrements('id');
      t.string('mtrlNum', 30).notNullable();
      t.string('header', 200).notNullable();
      t.string('longText', 1000).notNullable().defaultTo('No long text information available');
      t.decimal('reorderQnty').notNullable();
      t.decimal('maxQnty').notNullable();
      t.decimal('movingPrice').notNullable();
      t.string('replenishTo', 30).notNullable().defaultTo('Max');
      t.integer('plannedDelivTime').notNullable();
      t.string('plannedDelivUoM', 30).notNullable();
      t.decimal('currentQnty').notNullable();
      t.string('unitOfMeasure', 30).notNullable();
      t.string('subArea', 30).notNullable();
      t.date('lastUpdateDate').notNullable();
      t.date('chartLowerBound').notNullable();
      t.string('storageLoc', 30).notNullable();
      t.timestamps(true, true);
      t.timestamp('deleted_at');
    }),

    knex.schema.createTableIfNotExists('mtrlMovements', t => {
      t.bigIncrements('id');
      t.bigInteger('mtrlMetaInfoId').notNullable().references('mtrlMetaInfo.id');
      t.date('postingDate').notNullable();
      t.string('plantNum', 30).notNullable();
      t.string('moveType', 30).notNullable();
      t.string('specialStock', 30);
      t.string('mtrlDoc', 30).notNullable();
      t.string('mtrlDocItem', 30).notNullable();
      t.string('orderNum', 30);
      t.decimal('qntyMoved').notNullable();
      t.string('purchaseOrderNum', 30);
      t.string('storageLoc', 30).notNullable();
      t.timestamps(true, true);
      t.timestamp('deleted_at');
    }),

    knex.schema.createTableIfNotExists('mtrlComments', t => {
      t.bigIncrements('id');
      t.bigInteger('mtrlMetaInfoId').notNullable().references('mtrlMetaInfo.id');
      t.string('createdBy', 30).notNullable().defaultTo('ADA');
      t.date('postingDate').notNullable();
      t.string('content', 1000).notNullable();
      t.boolean('acknowledgeable').notNullable().defaultTo(false);
      t.boolean('acknowledged').notNullable().defaultTo(false);
      t.timestamp(true, true);
      t.timestamp('deleted_at');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mtrlComments'),
    knex.schema.dropTable('mtrlMovements'),
    knex.schema.dropTable('mtrlMetaInfo')
  ]);
};
