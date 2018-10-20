(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.srt = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  var SrtJs =
  /*#__PURE__*/
  function () {
    function SrtJs(option) {
      classCallCheck(this, SrtJs);

      this.option = Object.assign({}, SrtJs.DEFAULTS, option);
      this.init();
    }

    createClass(SrtJs, [{
      key: "init",
      value: function init() {
        var _this = this;

        this.$video = this.getElement(this.option.videoElement);
        this.option.subtitles.forEach(function (subtitle) {
          _this.creatTrack(subtitle);
        });
      }
    }, {
      key: "getElement",
      value: function getElement(query) {
        return query instanceof Element ? query : document.querySelector(query);
      }
    }, {
      key: "changeTrack",
      value: function changeTrack($video) {
        var _this2 = this;

        var $tracks = Array.from($video.querySelectorAll('track'));
        $tracks.forEach(function ($track) {
          _this2.fetchUrl($track.src).then(function (data) {
            if ($track.src !== data) {
              $track.src = data;
            }
          });
        });
      }
    }, {
      key: "creatTrack",
      value: function creatTrack(subtitle) {
        var _this3 = this;

        var $track = document.createElement('track');
        $track.label = subtitle.label || '';
        $track.kind = subtitle.kind || '';
        $track.srclang = subtitle.srclang || '';
        $track.default = subtitle.default || false;
        this.fetchUrl(subtitle.src).then(function (data) {
          $track.src = data;

          _this3.$video.appendChild($track);
        });
      }
    }, {
      key: "fetchUrl",
      value: function fetchUrl(url) {
        var _this4 = this;

        var type;
        return fetch(url).then(function (response) {
          type = response.headers.get('Content-Type');
          return response.text();
        }).then(function (text) {
          if (/x-subrip/ig.test(type)) {
            return _this4.srtToVtt(text);
          }

          return Promise.resolve(url);
        }).catch(function (err) {
          throw err;
        });
      }
    }, {
      key: "srtToVtt",
      value: function srtToVtt(text) {
        var vttText = 'WEBVTT \r\n\r\n'.concat(text.replace(/\{\\([ibu])\}/g, '</$1>').replace(/\{\\([ibu])1\}/g, '<$1>').replace(/\{([ibu])\}/g, '<$1>').replace(/\{\/([ibu])\}/g, '</$1>').replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, '$1.$2').concat('\r\n\r\n'));
        return this.toBlob(vttText);
      }
    }, {
      key: "toBlob",
      value: function toBlob(text) {
        return URL.createObjectURL(new Blob([text], {
          type: 'text/vtt'
        }));
      }
    }], [{
      key: "polyfill",
      value: function polyfill() {
        var _this5 = this;

        Object.getOwnPropertyNames(this.prototype).forEach(function (method) {
          if (method !== 'constructor') {
            _this5[method] = _this5.prototype[method].bind(_this5);
          }
        });
        this.$videos = Array.from(document.querySelectorAll('video'));
        this.$videos.forEach(function ($video) {
          _this5.changeTrack($video);
        });
      }
    }, {
      key: "version",
      get: function get() {
        return '1.0.0';
      }
    }, {
      key: "DEFAULTS",
      get: function get() {
        return {
          videoElement: '',
          subtitles: []
        };
      }
    }]);

    return SrtJs;
  }();

  window.SrtJs = SrtJs;

  return SrtJs;

})));
//# sourceMappingURL=srt.js.map
