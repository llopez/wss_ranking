window.App = {
  Models: {},
  Collections: {},
  Views: {},
  init: function(){
    var skaters = new App.Collections.Skaters();
    var results = new App.Collections.Results();
    skaters.fetch();

    new App.Views.List({collection: results});
    
    skaters.on('sync', function(){
      filtered = skaters.where({country: 'BRA'});
      results.add(filtered);
    });
  }
}

App.Models.Skater = Backbone.Model.extend({});

App.Collections.Skaters = Backbone.Collection.extend({
  model: App.Models.Skater,
  url: '/data/skaters.json'
});

App.Collections.Results = Backbone.Collection.extend({
  model: App.Models.Skater
});

App.Views.List = Backbone.View.extend({
  el: 'table',
  initialize: function(){
    this.collection.on('add', this.addItem, this);
  },
  addItem: function(m){
    row = _.template($('#item-template').html());

    this.$el.find('tbody').append(row(m.toJSON()));
  }
});



