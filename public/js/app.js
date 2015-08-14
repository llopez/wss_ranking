window.App = {
  Models: {},
  Collections: {},
  Views: {},
  init: function(options){
    if(options.gender == 'men'){
      list = new App.Views.List({collection: men}, options.country);
    }
    else{
      list = new App.Views.List({collection: women}, options.country);
    }
    new App.Views.Search;
  }
}

App.Models.Position = Backbone.Model.extend({});

App.Collections.MenRanking = Backbone.Collection.extend({
  model: App.Models.Position,
  url: '/data/men.json',
  /*byCountry: function(name){
    result = this.filter(function(man){ return man.get('country') == name});
    return new App.Collections.MenRanking(result);
  }*/
});

App.Collections.WomenRanking = Backbone.Collection.extend({
  model: App.Models.Position,
  url: '/data/women.json'
});

App.Views.List = Backbone.View.extend({
  el: 'table',
  initialize: function(options, country){
    this.country = country;
    this.collection.on('add', this.addItem, this);
    this.collection.fetch();
  },
  addItem: function(m){
    if(this.country && m.get('country') != this.country)
      return;
    row = _.template($('#item-template').html());

    this.$el.find('tbody').append(row(m.toJSON()));
  },
  filter: function(name){
    this.clear();
    regexp = new RegExp(name, 'i');

    //arg = this.collection.byCountry('ARG');

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

App.Views.Search = Backbone.View.extend({
  el: 'form#search',
  events: {
    'keyup input':'filter'
  },
  filter: function(e){
    name = e.target.value;
    list.filter(name);
  }
});
 
$(function(){
  men = new App.Collections.MenRanking();
  women = new App.Collections.WomenRanking();
});

