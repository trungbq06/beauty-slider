/*!
 * Beauty Slider jQuery plugin
 * http://add_address_here
 *
 * Copyright 2015, Trung Bui
 *
 * Date: Wed Dec 30 16:52:21 2015
 */

(function ( $ ) {

  // Default options
  var defaults = {
      debug: true,
      speed: 0,
      pager: true,
      controls: true,
      auto: true,
      pause: 4000
  };

  $.fn.btSlider = function( options ) {
    if (this.length === 0) {
      return this;
    }

    // loop through elements
    if (this.length > 1) {
      this.each(function() {
        this.btSlider(options);
      });

      return this;
    }

    var slider = {};

    var element = $(this);

    // Get the window width and height
    windowWidth = $(window).width();
    windowHeight = $(window).height();

    // Check if slider is already initialized
    if (element.data('btSlider')) { return; }
  };
 
}( jQuery ));