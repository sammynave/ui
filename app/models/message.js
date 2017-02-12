import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr('string'),
  owner: DS.belongsTo('user'),
  room: DS.belongsTo('room'),
  insertedAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
