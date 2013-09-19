/*jslint browser: true, evil: false, plusplus: true, white: true, indent: 2, nomen: true */
/*global moj, $ */

// Tabs modules for MOJ
// Dependencies: moj, jQuery

(function(){

  "use strict";

  // Define the class
  var Tabs = function (el, options) {
    this.settings = $.extend({}, this.defaults, options);
    this._cacheEls(el);
    this._bindEvents();
    if (this.settings.activatefirst) {
      this._activateFirstLink();
    };
  };

  Tabs.prototype = {

    defaults: {
      activatefirst: true,
      focusfirst: false,
      activetabclass: 'is-active',
      activepaneclass: 'is-active'
    },

    _cacheEls: function (wrap) {
      this.$tabNav = $('.js-tabs-nav', wrap).first();
      this.$tabs = $('a', this.$tabNav);
      this.$tabPanes = $('.js-tabs-content', wrap).first().children();
    },

    _bindEvents: function () {
      // store a reference to obj before 'this' becomes jQuery obj
      var self = this;

      this.$tabs.on('click', function (e) {
        e.preventDefault();
        self._activateTab($(this));
        self._activatePane($(this).attr('href'));
      });
    },

    _activateTab: function (el) {
      this
        .$tabs.removeClass(this.settings.activetabclass)
        .filter(el).addClass(this.settings.activetabclass);
    },

    _activatePane: function (hash) {
      var shown = this
                    .$tabPanes.removeClass(this.settings.activepaneclass)
                    .filter(hash).addClass(this.settings.activepaneclass);
      
      if (this.settings.focusfirst) {
        this._focusFirstElement(shown);
      };
    },

    _activateFirstLink: function () {
      // activate first tab
      this.$tabNav.find('li').first().find('a').click();
    },

    _focusFirstElement: function (el) {
      el.find('a, input, textarea, select, button, [tabindex]').not(':disabled').first().focus();
    }

  };

  // Add module to MOJ namespace
  moj.Modules.tabs = {
    init: function () {
      $('.js-tabs').each(function () {
        $(this).data('moj.tabs', new Tabs($(this), $(this).data()));
      });
    }
  };

}());