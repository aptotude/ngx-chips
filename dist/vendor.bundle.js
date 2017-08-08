(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("rxjs"));
	else if(typeof define === 'function' && define.amd)
		define(["rxjs"], factory);
	else if(typeof exports === 'object')
		exports["ngx-chips"] = factory(require("rxjs"));
	else
		root["ngx-chips"] = factory(root["rxjs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_29__) {
return webpackJsonpngx_chips([0],{

/***/ 29:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_29__;

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(16);
__webpack_require__(3);
__webpack_require__(15);
__webpack_require__(29);
module.exports = __webpack_require__(6);


/***/ })

},[81]);
});
//# sourceMappingURL=vendor.map