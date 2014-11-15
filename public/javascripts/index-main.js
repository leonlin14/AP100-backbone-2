/**
* SETUP
**/
var app = app || {};

/**
* MODELS
**/
app.Users = Backbone.Model.extend({
  url: function() {
    return '/1/user/age' + this.filter;
  },
  filter: '/30/40/',
  defaults: {
    errors: [],
    errfor: {},
    users: []
  }
});

/**
* VIEWS
**/
app.ListView = Backbone.View.extend({
	el: '#userList',
  template: _.template( $('#tmpl-user-list').html() ),
  events: {
    'click #20': 'age20'
  },
  initialize: function() {
    this.model = new app.Users();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'change', this.render);
    this.model.fetch();
  },
  render: function() {
    this.$el.html(this.template( this.model.attributes ));
  },
  age20: function() {
    this.model.filter = '/20/29';
    this.model.fetch();
  },
});

/**
* BOOTUP
**/
$(document).ready(function() {
  app.listView = new app.ListView();
});