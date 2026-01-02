/*!
 * lastMemory.js v1.0.0
 * Intent-based navigation memory for restoring user flow after redirects
 * Author: adorts
 * License: MIT
 */

(function (window) {
  "use strict";

  if (!window) return;

  var STORAGE_KEY = "__lastMemory__";

  function isStorageAvailable() {
    try {
      var test = "__test__";
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  function now() {
    return Date.now();
  }

  var storageAvailable = isStorageAvailable();

  var lastMemory = {
    /**
     * Remember current page or provided URL
     * @param {Object} options
     * @param {string} options.url
     * @param {number} options.expires (minutes)
     * @param {boolean} options.once
     */
    remember: function (options) {
      options = options || {};

      if (!storageAvailable) return;

      var data = {
        url: options.url || window.location.href,
        time: now(),
        expires: (options.expires || 10) * 60 * 1000,
        once: options.once !== false
      };

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {}
    },

    /**
     * Check if valid memory exists
     * @returns {boolean}
     */
    has: function () {
      var data = this._get();
      if (!data) return false;

      if (now() - data.time > data.expires) {
        this.clear();
        return false;
      }

      return true;
    },

    /**
     * Redirect back to remembered page
     * @param {Object} options
     * @param {string} options.fallback
     */
    goBack: function (options) {
      options = options || {};
      var fallback = options.fallback || "/";

      var data = this._get();

      if (!data) {
        window.location.href = fallback;
        return;
      }

      this.clear();
      window.location.href = data.url;
    },

    /**
     * Clear memory
     */
    clear: function () {
      if (!storageAvailable) return;
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    },

    /**
     * Internal getter
     * @private
     */
    _get: function () {
      if (!storageAvailable) return null;

      try {
        var raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
      } catch (e) {
        return null;
      }
    }
  };

  // Global exposure
  window.lastMemory = lastMemory;
  window.$last = lastMemory;

})(window);
