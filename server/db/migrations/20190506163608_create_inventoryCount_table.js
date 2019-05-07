
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('inventoryCount', t => {
      t.bigIncrements('id');
      t.date('postingDate').notNullable();
      t.string('mtrlNum', 30).notNullable();
      t.string('plantNum', 30).notNullable();
      t.string('storageLocation', 30).notNullable();
      t.string('movementType', 30).notNullable();
      t.string('specialStock', 30);
      t.string('mtrlDoc', 30).notNullable();
      t.string('mtrlDocItem', 30).notNullable();
      t.string('orderNum', 30);
      t.decimal('qntyOfOrder').notNullable();
      t.string('unitOfOrder', 30).notNullable();
      t.string('purchaseOrderNum', 30);
      t.timestamps(true, true);
      t.timestamp('deleted_at');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('inventoryCount')
  ]);
};
