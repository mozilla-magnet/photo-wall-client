'use strict';

/**
 * Dependencies
 */

var SERVICE_URL = require('../config').service_url;
require('./app.css');

/**
 * Exports
 */

module.exports = App;

function App() {
  this.items = [];
  this.el = document.createElement('div');
  this.el.className = 'app';

  this.listen(this.onNewItem.bind(this));

  this.fetch()
    .then(items => {
      this.items = items.sort((a, b) => a < b);
      this.render();
    });
}

App.prototype = {
  fetch: function() {
    return new Promise(resolve => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', `${SERVICE_URL}/images`, true);
      xhr.send();

      xhr.onload = function() {
        resolve(JSON.parse(xhr.responseText));
      };
    });
  },

  render: function() {
    this.empty();

    this.ul = document.createElement('ul');
    var items = document.createDocumentFragment();

    this.items.forEach(item => {
      items.appendChild(this.renderItem(item));
    });

    this.ul.appendChild(items);
    this.el.appendChild(this.ul);
  },

  renderItem: function(filename) {
    var li = document.createElement('li');
    var img = document.createElement('img');
    img.src = `${SERVICE_URL}/images/${filename}`;
    img.onload = () => setTimeout(() => img.classList.add('loaded'), 300);
    li.appendChild(img);
    return li;
  },

  addItem: function(item) {
    this.items.unshift(item);
    var el = this.renderItem(item);
    this.ul.insertBefore(el, this.ul.firstChild);
  },

  empty: function() {
    this.el.innerHTML = '';
  },

  listen: function(callback) {
    console.log('connect');
    var self = this;

    try {
      var eventSource = new EventSource(`${SERVICE_URL}/images`);

      eventSource.addEventListener('error', function(err) {
        console.log('error', err);
        setTimeout(self.listen.bind(self, callback), 4000);
      });

      eventSource.addEventListener('newimage', event => {
        callback(event.data);
      });
    } catch(err) {
      setTimeout(this.listen.bind(this, callback), 4000);
    }
  },

  onNewItem: function(item) {
    console.log('new item', item);
    this.addItem(item);
  }
};
