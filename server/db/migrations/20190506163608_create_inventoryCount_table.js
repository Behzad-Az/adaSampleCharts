
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('mtrlMovements', t => {
      t.bigIncrements('id');
      t.date('date').notNullable();
      t.string('mtrlNum', 30).notNullable();
      t.string('plantNum', 30).notNullable();
      t.string('storageLoc', 30).notNullable();
      t.string('moveType', 30).notNullable();
      t.string('specialStock', 30);
      t.string('mtrlDoc', 30).notNullable();
      t.string('mtrlDocItem', 30).notNullable();
      t.string('orderNum', 30);
      t.decimal('qntyMoved').notNullable();
      t.string('unitOfMeasure', 30).notNullable();
      t.string('purchaseOrderNum', 30);
      t.timestamps(true, true);
      t.timestamp('deleted_at');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mtrlMovements')
  ]);
};
