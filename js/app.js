$(function(){
  var Position = Backbone.Model.extend({});
  
  var Ranking = Backbone.Collection.extend({
    model: Position,
    url: '/data/ranking.json'
  });

  ranking = new Ranking;

  var List = Backbone.View.extend({
    el: 'table',
    initialize: function(){
      this.collection.on('add', this.addItem, this);
      this.collection.fetch();
    },
    addItem: function(m){
      row = _.template($('#item-template').html());

      this.$el.find('tbody').append(row(m.toJSON()));
    },
    filter: function(name){
      this.clear();
      regexp = new RegExp(name, 'i');
      results = this.collection.filter(function(m){
        return m.get('name').match(regexp);
      });

      _.each(results, function(m){
        this.addItem(m);
      }, this);
    },
    clear: function(){
      this.$el.find('tbody').html('');
    }
  });

  list = new List({collection: ranking});
  
  var Search = Backbone.View.extend({
    el: 'form#search',
    events: {
      'keyup input':'filter'
    },
    filter: function(e){
      name = e.target.value;
      list.filter(name);
    }
  });
  
  search = new Search;
});

