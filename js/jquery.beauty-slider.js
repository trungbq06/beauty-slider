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
      effect: 'fade',
      debug: true,
      speed: 500,
      delay: 3000,
      pager: true,
      controls: true,
      toggleControls: false,
      auto: true,
      captions: true,
      infinite: true,
      pause: 4000
    };

    // Interval to animate between images
    self.interval = null;

    // Settings of this class
    self.settings = $.extend({}, self.defaults, options);

    // DOM element
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

    /**
    * We need to preload all images in order to setup the right things
    */
    function loadImages(elements, callback) {
      var count = elements.find('img').length;
      if (count == 0) {
        return;
      }

      var total = 0;
      elements.find('img').each(function () {
        $(this).on('load', function() {
          total++;
          if (total == count) callback();
        }).each(function() {
          if (this.complete) $(this).load();
        });
      });
    }

    /**
    * Initialize function
    */
    self.init = function (options) {
      // preload images here
      loadImages(self.context.children(), function() {
        // Set the height for parent
        var height = self.context.children().eq(self.current).height();

        self.context.css({height: height + 'px'});

        // Setup dozen things
        self.setup();

        // Animate the first image
        self.animate(0, 'next');
      });
    }

    /**
    * Setup everything need
    */
    self.setup = function() {
      // Get all children elements
      self.slides = self.context.children();

      self.slides.show().css({opacity: 0.0});

      self.total = self.slides.length;

      // Allow to hide controls
      if (self.settings.toggleControls) {
        self.context.on('mouseover', self.mouseover);
        self.context.on('mouseout', self.mouseout);
      }

      // Add wrapper
      self.context.wrap('<div class="bt-wrapper"></div>');

      // Create next and previous button
      self.createControls();

      // Create paging dots
      self.createPager();

      // Auto start animation if auto settings is true
      self.settings.auto && self.start();
    }

    /**
    * Create next and previous buttons
    */
    self.createControls = function () {
      var wrapper = self.context.parent();

      self.controls = $('<div class="bt-direction">' + 
        '<a class="prev"></a>' + 
        '<a class="next"></a>' +
      '</div>');

      // Add button direction and pager
      wrapper.append(self.controls);

      if (self.settings.toggleControls) {
        self.controls.fadeOut(2000);
      }

      // Attach event click to our controls
      self.controls.children().each(function () {
        $(this).on('click', function() {
          self.stop();
          self[$(this).attr('class')]();
        });
      });
    }

    /**
    * Create paging dots
    */
    self.createPager = function() {
      var wrapper = self.context.parent();

      var paging = '<div class="bt-pager">';

      for (var i = 0;i < self.total;i++) {
        paging += '<a class="bt-control">' + (i + 1) + '</a>';
      }
      paging += '</div>';

      // Add pager
      wrapper.append(paging);

      self.pager = wrapper.find('.bt-pager').first();

      self.pager.children().each(function() {
        $(this).on('click', function() {
          var newPage = $(this).text() - 1;

          if (newPage != self.current) {
            self.stop().animate(newPage, 'next');
          }
        });
      });
    }

    /**
    * Handle mouse over event
    */
    self.mouseover = function(event) {
      var currentTarget = document.elementFromPoint(event.pageX, event.pageY);
      if ($(currentTarget).parent().hasClass('btslider')) {
        self.controls.fadeIn('slow');
      }
    }

    /**
    * Handle mouse out event
    */
    self.mouseout = function(event) {
      var currentTarget = document.elementFromPoint(event.pageX, event.pageY);
      if (!$(currentTarget).parent().hasClass('btslider') && !$(currentTarget).parent().hasClass('bt-direction')) {
        self.controls.fadeOut('slow');
      }
    }

    /**
    * Auto start the animation
    */
    self.start = function() {
      if (self.interval) { return; }

      // Create interval to animate slide
      self.interval = setInterval(function() {
        self.next();
      }, self.settings.delay);

      return self;
    }

    /**
    * Stop the animation
    */
    self.stop = function() {
      clearTimeout(self.interval);

      self.interval = null;

      return self;
    }

    /**
    * Next slide
    */
    self.next = function() {
      return self.animate(self.current + 1, 'next');
    }

    /**
    * Previous slide
    */
    self.prev = function() {
      return self.animate(self.current - 1, 'prev');
    }

    /**
    * Animation between slide. Add new animation here
    */
    self.animate = function(pos, direction) {
      // In case position is valid
      if ((!self.settings.infinite && pos >= 0 && pos < self.total) || self.settings.infinite) {
        // Hide current slide
        self.slides.eq(self.current).animate({ opacity: 0.0 }, self.settings.speed);

        self.setPosition(pos);

        // Show new image with animation fade
        self.slides.eq(self.current).animate({ opacity: 1.0 }, self.settings.speed, self.start);
      } else {
        //　Start interval again
        self.start();
      }
    };

    /**
    * Active current page
    */
    self.active = function() {
      self.pager.children().removeClass('active');
      $('a:eq('+ self.current +')', self.pager).addClass('active');
    }

    /**
    * Set position for current page
    */
    self.setPosition = function(pos) {
      if (pos >= self.total) {
        pos = 0;
      }
      if (pos < 0) {
        pos = self.total - 1;
      }

      self.current = pos;
      self.active();

      return self;
    };

    /**
    * Use to debug the log
    */
    self.debug = function(log) {
      if (self.settings.debug) {
        if (window.console && window.console.log) {
          window.console.log(log);
        }
      }
    };

    return self.init(options);
  };

  /**
  * Attach our class to jQuery
  */
  $.fn.btSlider = function(options) {
    return this.each(function() {
      var $this = $(this);

      return $this.data('btSlider', new $.BtSlider($this, options));
    });
  };
 
}( jQuery ));