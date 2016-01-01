/*!
 * Beauty Slider jQuery plugin
 * http://add_address_here
 *
 * Copyright 2016, Trung Bui
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: Wed Dec 30 16:52:21 2015
 */

(function ( $ ) {

  $.BtSlider = function( context, options ) {
    // Modify this to self
    var self = this;

    // Default options
    self.defaults = {
        debug: true,
        speed: 500,
        delay: 2000,
        pager: true,
        controls: true,
        auto: true,
        captions: true,
        pause: 4000
    };

    // Declare variables
    self.interval = null;

    self.settings = $.extend({}, self.defaults, options);

    self.context = context;

    // Total of slides
    self.total = 0;

    // Current displaying slide
    self.current = 0;

    // Check if slider is already initialized
    if (self.context.data('btSlider')) { return; }

    // Get the window width and height
    self.windowWidth = $(window).width();
    self.windowHeight = $(window).height();

    self.init = function (options) {
      // Init the container
      self._setup();

      self.settings.auto && self._start();


    };

    // Setup everything need
    self._setup = function() {
      // Get all children elements
      self.slides = self.context.children();

      self.slides.show().css({opacity: 0.0});

      self.total = self.slides.length;

      console.log('Total ' + self.total + ' slides');

      // Add wrapper
      self.context.wrap('<div class="bt-wrapper"></div>');

      var wrapper = self.context.parent();

      var height = '600'; //self.slides.eq(0).height();
      self.context.css({height: height + 'px'});

      // Add button direction and pager
      wrapper.append('<div class="bt-direction">' + 
        '<a class="bt-prev">Prev</a>' + 
        '<a class="bt-next">Next</a>' +
      '</div>');

      // Add pager
      wrapper.append('<div class="bt-pager">' +
        '<a class="bt-control active" rel="0">1</a>' +
        '<a class="bt-control" rel="1">2</a>' +
        '<a class="bt-control" rel="2">3</a>' +
        '<a class="bt-control" rel="3">4</a>' +
      '</div>');

      // Animate first slide
      self._animate(0, 'next');
    };

    // Auto start the animation
    self._start = function() {
      if (self.interval) { return; }

      // Create interval to animate slide
      self.interval = setInterval(function() {
        self._next();
      }, self.settings.delay);

      return self;
    };

    // Stop the animation
    self._stop = function() {
      clearTimeout(self.interval);

      return self;
    }

    self._next = function() {
      return self._animate(self.current + 1, 'next');
    }

    self._prev = function() {
      return self._animate(self.current - 1, 'prev');
    }

    self._animate = function(pos, direction) {
      console.log('Current position ' + pos);

      // Hide current slide
      self.slides.eq(self.current).animate({ opacity: 0.0 }, self.settings.speed, 'linear');

      self._setPosition(pos);

      self.slides.eq(self.current).animate({ opacity: 1.0 }, self.settings.speed, 'linear');
    }

    self._setPosition = function(pos) {
      if (pos >= self.total) {
        pos = 0;
      }
      if (pos < 0) {
        pos = self.total - 1;
      }

      self.current = pos;

      return self;
    };

    return self.init(options);
  };

  $.fn.btSlider = function(options) {
    return this.each(function() {
      var $this = $(this);

      return $this.data('btSlider', new $.BtSlider($this, options));
    });
  };

  /**
  * Use to debug the log
  */
  function debug(object, log) {
    if (object.settings.debug) {
      if (window.console && window.console.log) {
        window.console.log(log);
      }
    }
  }
 
}( jQuery ));