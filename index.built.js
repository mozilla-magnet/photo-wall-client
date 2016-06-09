(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "service_url": "https://tengam.org/photowall/api/v1"
}
},{}],2:[function(require,module,exports){

/**
 * Dependencies
 */

var App = require('./lib/app');

// create and inject app
var app = new App();
document.body.appendChild(app.el);

},{"./lib/app":4}],3:[function(require,module,exports){
var css = "body,html{height:100%;margin:0;background:#333}ul{margin:0;padding:0}.app{height:100%}.app ul{display:flex;flex-wrap:wrap}.app li{flex:1;min-width:50px;max-width:25%;list-style:none}.app li>img{width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 2000ms}.app li>img.loaded{opacity:1}"; (require("browserify-css").createStyle(css, { "href": "lib/app.css"})); module.exports = css;
},{"browserify-css":5}],4:[function(require,module,exports){
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
      this.items = items;
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
    var eventSource = new EventSource(`${SERVICE_URL}/images`);
    eventSource.addEventListener('newimage', event => {
      callback(event.data);
    });
  },

  onNewItem: function(item) {
    console.log('new item', item);
    this.addItem(item);
  }
};

},{"../config":1,"./app.css":3}],5:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }
        
        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            head.appendChild(style);
        } else if (style.styleSheet) { // for IE8 and below
            head.appendChild(style);
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            head.appendChild(style);
        }
    }
};

},{}]},{},[2]);
