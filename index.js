var okiePub = (function() {
  'use strict';
  var publisher = {
    subscribers: {
      any: []
    },
    on: function(type, fn, context) {
      type = type || 'any';
      fn = typeof fn === 'function' ? fn : context[fn];

      if (typeof this.subscribers[type] === 'undefined') {
        this.subscribers[type] = [];
      }
      this.subscribers[type].push({
        fn: fn,
        context: context || this
      });
    },
    remove: function(type, fn, context) {
      this.visitSubscribers('unsubscribe', type, fn, context);
    },
    fire: function(type, publication) {
      this.visitSubscribers('publish', type, publication);
    },
    visitSubscribers: function(action, type, arg, context) {
      var pubtype = type || 'any',
          subscribers = this.subscribers[pubtype],
          max = subscribers ? subscribers.length : 0,
          i;

      for (i=0; i<max; i++) {
        if (action === 'publish') {
          subscribers[i].fn.call(subscribers[i].context, arg)
        }
        else if (subscribers[i].fn === arg && subscribers[i].context === context) {
          subscribers.splice(i, 1);
        };
      }
    }

  }; // end publisher

  return {
    makePublisher: function(object) {
      for (var i in publisher) {
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
          object[i] = publisher[i];
        }
      }
      object.subscribers = {any: []};
    }
  }
}());


/*
 * Testing instances
 */
var paper = {
  daily: function() {
    debugger;
    this.fire('daily', 'big news today!');
  },
  monthly: function() {
    this.fire('monthly', 'interesting analysis', 'monthly');
  }
}

var joe = {
  readPaper: function(paper) {
    console.log('Just read', paper);
  },
  readMonthly: function(monthly) {
    console.log('About to fall asleep reading this ' +monthly);
  }
}

okiePub.makePublisher(paper);
paper.on('daily', joe.readPaper);
paper.on('monthly', joe.readMonthly);
