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
var css = "body,html{height:100%;margin:0;background:#333}ul{margin:0;padding:1px}.app{height:100%}.app ul{display:flex;flex-wrap:wrap}.app li{box-sizing:border-box;flex:1;min-width:80px;max-width:25%;padding:2px;list-style:none}.app li>img{width:100%;height:100%;object-fit:cover;opacity:0;box-shadow:0 2px 10px rgba(0,0,0,.5);transform:scale(3);transition:all 400ms}.app li>img.loaded{transform:scale(1);opacity:1}"; (require("browserify-css").createStyle(css, { "href": "lib/app.css"})); module.exports = css;
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanNvbiIsImluZGV4LmpzIiwibGliL2FwcC5jc3MiLCJsaWIvYXBwLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnktY3NzL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInNlcnZpY2VfdXJsXCI6IFwiaHR0cHM6Ly90ZW5nYW0ub3JnL3Bob3Rvd2FsbC9hcGkvdjFcIlxufSIsIlxuLyoqXG4gKiBEZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgQXBwID0gcmVxdWlyZSgnLi9saWIvYXBwJyk7XG5cbi8vIGNyZWF0ZSBhbmQgaW5qZWN0IGFwcFxudmFyIGFwcCA9IG5ldyBBcHAoKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwLmVsKTtcbiIsInZhciBjc3MgPSBcImJvZHksaHRtbHtoZWlnaHQ6MTAwJTttYXJnaW46MDtiYWNrZ3JvdW5kOiMzMzN9dWx7bWFyZ2luOjA7cGFkZGluZzoxcHh9LmFwcHtoZWlnaHQ6MTAwJX0uYXBwIHVse2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcH0uYXBwIGxpe2JveC1zaXppbmc6Ym9yZGVyLWJveDtmbGV4OjE7bWluLXdpZHRoOjgwcHg7bWF4LXdpZHRoOjI1JTtwYWRkaW5nOjJweDtsaXN0LXN0eWxlOm5vbmV9LmFwcCBsaT5pbWd7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtvYmplY3QtZml0OmNvdmVyO29wYWNpdHk6MDtib3gtc2hhZG93OjAgMnB4IDEwcHggcmdiYSgwLDAsMCwuNSk7dHJhbnNmb3JtOnNjYWxlKDMpO3RyYW5zaXRpb246YWxsIDQwMG1zfS5hcHAgbGk+aW1nLmxvYWRlZHt0cmFuc2Zvcm06c2NhbGUoMSk7b3BhY2l0eToxfVwiOyAocmVxdWlyZShcImJyb3dzZXJpZnktY3NzXCIpLmNyZWF0ZVN0eWxlKGNzcywgeyBcImhyZWZcIjogXCJsaWIvYXBwLmNzc1wifSkpOyBtb2R1bGUuZXhwb3J0cyA9IGNzczsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGVwZW5kZW5jaWVzXG4gKi9cblxudmFyIFNFUlZJQ0VfVVJMID0gcmVxdWlyZSgnLi4vY29uZmlnJykuc2VydmljZV91cmw7XG5yZXF1aXJlKCcuL2FwcC5jc3MnKTtcblxuLyoqXG4gKiBFeHBvcnRzXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7XG5cbmZ1bmN0aW9uIEFwcCgpIHtcbiAgdGhpcy5pdGVtcyA9IFtdO1xuICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRoaXMuZWwuY2xhc3NOYW1lID0gJ2FwcCc7XG5cbiAgdGhpcy5saXN0ZW4odGhpcy5vbk5ld0l0ZW0uYmluZCh0aGlzKSk7XG5cbiAgdGhpcy5mZXRjaCgpXG4gICAgLnRoZW4oaXRlbXMgPT4ge1xuICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zLnNvcnQoKGEsIGIpID0+IGEgPCBiKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfSk7XG59XG5cbkFwcC5wcm90b3R5cGUgPSB7XG4gIGZldGNoOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICB4aHIub3BlbignR0VUJywgYCR7U0VSVklDRV9VUkx9L2ltYWdlc2AsIHRydWUpO1xuICAgICAgeGhyLnNlbmQoKTtcblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZW1wdHkoKTtcblxuICAgIHRoaXMudWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIHZhciBpdGVtcyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIHRoaXMuaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW1zLmFwcGVuZENoaWxkKHRoaXMucmVuZGVySXRlbShpdGVtKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnVsLmFwcGVuZENoaWxkKGl0ZW1zKTtcbiAgICB0aGlzLmVsLmFwcGVuZENoaWxkKHRoaXMudWwpO1xuICB9LFxuXG4gIHJlbmRlckl0ZW06IGZ1bmN0aW9uKGZpbGVuYW1lKSB7XG4gICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICB2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1nLnNyYyA9IGAke1NFUlZJQ0VfVVJMfS9pbWFnZXMvJHtmaWxlbmFtZX1gO1xuICAgIGltZy5vbmxvYWQgPSAoKSA9PiBzZXRUaW1lb3V0KCgpID0+IGltZy5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKSwgMzAwKTtcbiAgICBsaS5hcHBlbmRDaGlsZChpbWcpO1xuICAgIHJldHVybiBsaTtcbiAgfSxcblxuICBhZGRJdGVtOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgdGhpcy5pdGVtcy51bnNoaWZ0KGl0ZW0pO1xuICAgIHZhciBlbCA9IHRoaXMucmVuZGVySXRlbShpdGVtKTtcbiAgICB0aGlzLnVsLmluc2VydEJlZm9yZShlbCwgdGhpcy51bC5maXJzdENoaWxkKTtcbiAgfSxcblxuICBlbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5lbC5pbm5lckhUTUwgPSAnJztcbiAgfSxcblxuICBsaXN0ZW46IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgY29uc29sZS5sb2coJ2Nvbm5lY3QnKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0cnkge1xuICAgICAgdmFyIGV2ZW50U291cmNlID0gbmV3IEV2ZW50U291cmNlKGAke1NFUlZJQ0VfVVJMfS9pbWFnZXNgKTtcblxuICAgICAgZXZlbnRTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgc2V0VGltZW91dChzZWxmLmxpc3Rlbi5iaW5kKHNlbGYsIGNhbGxiYWNrKSwgNDAwMCk7XG4gICAgICB9KTtcblxuICAgICAgZXZlbnRTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignbmV3aW1hZ2UnLCBldmVudCA9PiB7XG4gICAgICAgIGNhbGxiYWNrKGV2ZW50LmRhdGEpO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgIHNldFRpbWVvdXQodGhpcy5saXN0ZW4uYmluZCh0aGlzLCBjYWxsYmFjayksIDQwMDApO1xuICAgIH1cbiAgfSxcblxuICBvbk5ld0l0ZW06IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBjb25zb2xlLmxvZygnbmV3IGl0ZW0nLCBpdGVtKTtcbiAgICB0aGlzLmFkZEl0ZW0oaXRlbSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBicm93c2VyIGZpZWxkLCBjaGVjayBvdXQgdGhlIGJyb3dzZXIgZmllbGQgYXQgaHR0cHM6Ly9naXRodWIuY29tL3N1YnN0YWNrL2Jyb3dzZXJpZnktaGFuZGJvb2sjYnJvd3Nlci1maWVsZC5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gQ3JlYXRlIGEgPGxpbms+IHRhZyB3aXRoIG9wdGlvbmFsIGRhdGEgYXR0cmlidXRlc1xuICAgIGNyZWF0ZUxpbms6IGZ1bmN0aW9uKGhyZWYsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICAgIGxpbmsuaHJlZiA9IGhyZWY7XG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBpZiAoICEgYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS0nICsga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH0sXG4gICAgLy8gQ3JlYXRlIGEgPHN0eWxlPiB0YWcgd2l0aCBvcHRpb25hbCBkYXRhIGF0dHJpYnV0ZXNcbiAgICBjcmVhdGVTdHlsZTogZnVuY3Rpb24oY3NzVGV4dCwgYXR0cmlidXRlcykge1xuICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgICAgIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKCAhIGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgc3R5bGUuc2V0QXR0cmlidXRlKCdkYXRhLScgKyBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHN0eWxlLnNoZWV0KSB7IC8vIGZvciBqc2RvbSBhbmQgSUU5K1xuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gY3NzVGV4dDtcbiAgICAgICAgICAgIHN0eWxlLnNoZWV0LmNzc1RleHQgPSBjc3NUZXh0O1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3R5bGUuc3R5bGVTaGVldCkgeyAvLyBmb3IgSUU4IGFuZCBiZWxvd1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NUZXh0O1xuICAgICAgICB9IGVsc2UgeyAvLyBmb3IgQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpXG4gICAgICAgICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NUZXh0KSk7XG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXX0=
