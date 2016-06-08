(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "service_url": "http://localhost:3003/api/v1"
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanNvbiIsImluZGV4LmpzIiwibGliL2FwcC5jc3MiLCJsaWIvYXBwLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnktY3NzL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJzZXJ2aWNlX3VybFwiOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMy9hcGkvdjFcIlxufSIsIlxuLyoqXG4gKiBEZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgQXBwID0gcmVxdWlyZSgnLi9saWIvYXBwJyk7XG5cbi8vIGNyZWF0ZSBhbmQgaW5qZWN0IGFwcFxudmFyIGFwcCA9IG5ldyBBcHAoKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwLmVsKTtcbiIsInZhciBjc3MgPSBcImJvZHksaHRtbHtoZWlnaHQ6MTAwJTttYXJnaW46MDtiYWNrZ3JvdW5kOiMzMzN9dWx7bWFyZ2luOjA7cGFkZGluZzowfS5hcHB7aGVpZ2h0OjEwMCV9LmFwcCB1bHtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXB9LmFwcCBsaXtmbGV4OjE7bWluLXdpZHRoOjUwcHg7bWF4LXdpZHRoOjI1JTtsaXN0LXN0eWxlOm5vbmV9LmFwcCBsaT5pbWd7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtvYmplY3QtZml0OmNvdmVyO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgMjAwMG1zfS5hcHAgbGk+aW1nLmxvYWRlZHtvcGFjaXR5OjF9XCI7IChyZXF1aXJlKFwiYnJvd3NlcmlmeS1jc3NcIikuY3JlYXRlU3R5bGUoY3NzLCB7IFwiaHJlZlwiOiBcImxpYi9hcHAuY3NzXCJ9KSk7IG1vZHVsZS5leHBvcnRzID0gY3NzOyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgU0VSVklDRV9VUkwgPSByZXF1aXJlKCcuLi9jb25maWcnKS5zZXJ2aWNlX3VybDtcbnJlcXVpcmUoJy4vYXBwLmNzcycpO1xuXG4vKipcbiAqIEV4cG9ydHNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcblxuZnVuY3Rpb24gQXBwKCkge1xuICB0aGlzLml0ZW1zID0gW107XG4gIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGhpcy5lbC5jbGFzc05hbWUgPSAnYXBwJztcblxuICB0aGlzLmxpc3Rlbih0aGlzLm9uTmV3SXRlbS5iaW5kKHRoaXMpKTtcblxuICB0aGlzLmZldGNoKClcbiAgICAudGhlbihpdGVtcyA9PiB7XG4gICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH0pO1xufVxuXG5BcHAucHJvdG90eXBlID0ge1xuICBmZXRjaDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgeGhyLm9wZW4oJ0dFVCcsIGAke1NFUlZJQ0VfVVJMfS9pbWFnZXNgLCB0cnVlKTtcbiAgICAgIHhoci5zZW5kKCk7XG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmVtcHR5KCk7XG5cbiAgICB0aGlzLnVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB2YXIgaXRlbXMgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICB0aGlzLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtcy5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlckl0ZW0oaXRlbSkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy51bC5hcHBlbmRDaGlsZChpdGVtcyk7XG4gICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLnVsKTtcbiAgfSxcblxuICByZW5kZXJJdGVtOiBmdW5jdGlvbihmaWxlbmFtZSkge1xuICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltZy5zcmMgPSBgJHtTRVJWSUNFX1VSTH0vaW1hZ2VzLyR7ZmlsZW5hbWV9YDtcbiAgICBpbWcub25sb2FkID0gKCkgPT4gc2V0VGltZW91dCgoKSA9PiBpbWcuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyksIDMwMCk7XG4gICAgbGkuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICByZXR1cm4gbGk7XG4gIH0sXG5cbiAgYWRkSXRlbTogZnVuY3Rpb24oaXRlbSkge1xuICAgIHRoaXMuaXRlbXMudW5zaGlmdChpdGVtKTtcbiAgICB2YXIgZWwgPSB0aGlzLnJlbmRlckl0ZW0oaXRlbSk7XG4gICAgdGhpcy51bC5pbnNlcnRCZWZvcmUoZWwsIHRoaXMudWwuZmlyc3RDaGlsZCk7XG4gIH0sXG5cbiAgZW1wdHk6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gJyc7XG4gIH0sXG5cbiAgbGlzdGVuOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHZhciBldmVudFNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZShgJHtTRVJWSUNFX1VSTH0vaW1hZ2VzYCk7XG4gICAgZXZlbnRTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignbmV3aW1hZ2UnLCBldmVudCA9PiB7XG4gICAgICBjYWxsYmFjayhldmVudC5kYXRhKTtcbiAgICB9KTtcbiAgfSxcblxuICBvbk5ld0l0ZW06IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBjb25zb2xlLmxvZygnbmV3IGl0ZW0nLCBpdGVtKTtcbiAgICB0aGlzLmFkZEl0ZW0oaXRlbSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBGb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCBicm93c2VyIGZpZWxkLCBjaGVjayBvdXQgdGhlIGJyb3dzZXIgZmllbGQgYXQgaHR0cHM6Ly9naXRodWIuY29tL3N1YnN0YWNrL2Jyb3dzZXJpZnktaGFuZGJvb2sjYnJvd3Nlci1maWVsZC5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gQ3JlYXRlIGEgPGxpbms+IHRhZyB3aXRoIG9wdGlvbmFsIGRhdGEgYXR0cmlidXRlc1xuICAgIGNyZWF0ZUxpbms6IGZ1bmN0aW9uKGhyZWYsIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gICAgICAgIGxpbmsuaHJlZiA9IGhyZWY7XG4gICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBpZiAoICEgYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZGF0YS0nICsga2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBoZWFkLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH0sXG4gICAgLy8gQ3JlYXRlIGEgPHN0eWxlPiB0YWcgd2l0aCBvcHRpb25hbCBkYXRhIGF0dHJpYnV0ZXNcbiAgICBjcmVhdGVTdHlsZTogZnVuY3Rpb24oY3NzVGV4dCwgYXR0cmlidXRlcykge1xuICAgICAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgICAgIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgICAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgaWYgKCAhIGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgc3R5bGUuc2V0QXR0cmlidXRlKCdkYXRhLScgKyBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHN0eWxlLnNoZWV0KSB7IC8vIGZvciBqc2RvbSBhbmQgSUU5K1xuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gY3NzVGV4dDtcbiAgICAgICAgICAgIHN0eWxlLnNoZWV0LmNzc1RleHQgPSBjc3NUZXh0O1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3R5bGUuc3R5bGVTaGVldCkgeyAvLyBmb3IgSUU4IGFuZCBiZWxvd1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NUZXh0O1xuICAgICAgICB9IGVsc2UgeyAvLyBmb3IgQ2hyb21lLCBGaXJlZm94LCBhbmQgU2FmYXJpXG4gICAgICAgICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NUZXh0KSk7XG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iXX0=
