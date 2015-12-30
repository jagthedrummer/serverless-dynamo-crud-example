import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('widgets', function() {
    this.route('new');

    this.route('edit', {
      path: ':widget_id/edit'
    });

    this.route('show', {
      path: ':widget_id'
    });
  });
});

export default Router;
