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
      delay: 4000,
      pager: true,
      controls: true,
      toggleControls: false,
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
      self.setup();

      self.settings.auto && self.start();


    };

    // Setup everything need
    self.setup = function() {
      // Get all children elements
      self.slides = self.context.children();

      self.slides.show().css({opacity: 0.0});

      self.total = self.slides.length;

      if (self.settings.toggleControls) {
        self.context.on('mouseover', self.mouseover);
        self.context.on('mouseout', self.mouseout);
      }

      // Add wrapper
      self.context.wrap('<div class="bt-wrapper"></div>');

      var height = '600'; //self.slides.eq(0).height();
      self.context.css({height: height + 'px'});

      self.createControls();

      self.createPager();

      // Animate first slide
      self.animate(0, 'next');
    };

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

          self.stop().animate(newPage, 'next');
        });
      });
    }

    self.mouseover = function(event) {
      var currentTarget = document.elementFromPoint(event.pageX, event.pageY);
      if ($(currentTarget).parent().hasClass('btslider')) {
        self.controls.fadeIn('slow');
      }
    }

    self.mouseout = function(event) {
      var currentTarget = document.elementFromPoint(event.pageX, event.pageY);
      if (!$(currentTarget).parent().hasClass('btslider') && !$(currentTarget).parent().hasClass('bt-direction')) {
        self.controls.fadeOut('slow');
      }
    }

    // Auto start the animation
    self.start = function() {
      if (self.interval) { return; }

      // Create interval to animate slide
      self.interval = setInterval(function() {
        self.next();
      }, self.settings.delay);

      return self;
    };

    // Stop the animation
    self.stop = function() {
      clearTimeout(self.interval);

      self.interval = null;

      return self;
    }

    self.next = function() {
      return self.animate(self.current + 1, 'next');
    }

    self.prev = function() {
      return self.animate(self.current - 1, 'prev');
    }

    self.animate = function(pos, direction) {
      // Hide current slide
      self.slides.eq(self.current).animate({ opacity: 0.0 }, self.settings.speed);

      self.setPosition(pos);

      self.slides.eq(self.current).animate({ opacity: 1.0 }, self.settings.speed, self.start);
    };

    self.active = function() {
      self.pager.children().removeClass('active');
      $('a:eq('+ self.current +')', self.pager).addClass('active');
    }

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

  $.fn.btSlider = function(options) {
    return this.each(function() {
      var $this = $(this);

      return $this.data('btSlider', new $.BtSlider($this, options));
    });
  };
 
}( jQuery ));