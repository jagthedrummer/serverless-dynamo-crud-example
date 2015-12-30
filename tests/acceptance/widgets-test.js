import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Widget', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /widgets without data', function(assert) {
  visit('/widgets');

  andThen(function() {
    assert.equal(currentPath(), 'widgets.index');
    assert.equal(find('#blankslate').text().trim(), 'No Widgets found');
  });
});

test('visiting /widgets with data', function(assert) {
  server.create('widget');
  visit('/widgets');

  andThen(function() {
    assert.equal(currentPath(), 'widgets.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new widget', function(assert) {
  visit('/widgets');
  click('a:contains(New Widget)');

  andThen(function() {
    assert.equal(currentPath(), 'widgets.new');

    fillIn('label:contains(Sku) input', 'MyString');
    fillIn('label:contains(Title) input', 'MyString');
    fillIn('label:contains(Description) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing widget', function(assert) {
  server.create('widget');
  visit('/widgets');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'widgets.edit');

    fillIn('label:contains(Sku) input', 'MyString');
    fillIn('label:contains(Title) input', 'MyString');
    fillIn('label:contains(Description) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing widget', function(assert) {
  server.create('widget');
  visit('/widgets');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'widgets.show');

    assert.equal(find('p strong:contains(Sku:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Title:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Description:)').next().text(), 'MyString');
  });
});

test('delete a widget', function(assert) {
  server.create('widget');
  visit('/widgets');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'widgets.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});
