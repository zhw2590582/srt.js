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

  var SrtJs = function SrtJs(option) {
    classCallCheck(this, SrtJs);

    console.log(option);
  };

  window.SrtJs = SrtJs;

  return SrtJs;

})));
//# sourceMappingURL=srt.js.map
