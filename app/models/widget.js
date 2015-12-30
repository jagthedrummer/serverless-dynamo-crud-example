import DS from 'ember-data';

export default DS.Model.extend({
  sku: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string')
});
