(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/walking/walking"],{

/***/ 105:
/*!*****************************************************************************************!*\
  !*** C:/documents/javaprojects/Fit/uniapp/main.js?{"page":"pages%2Fwalking%2Fwalking"} ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _walking = _interopRequireDefault(__webpack_require__(/*! ./pages/walking/walking.vue */ 106));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_walking.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 106:
/*!**********************************************************************!*\
  !*** C:/documents/javaprojects/Fit/uniapp/pages/walking/walking.vue ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _walking_vue_vue_type_template_id_c0a1840c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./walking.vue?vue&type=template&id=c0a1840c& */ 107);
/* harmony import */ var _walking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./walking.vue?vue&type=script&lang=js& */ 109);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _walking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _walking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../programs/HbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs




/* normalize component */

var component = Object(_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _walking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _walking_vue_vue_type_template_id_c0a1840c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _walking_vue_vue_type_template_id_c0a1840c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _walking_vue_vue_type_template_id_c0a1840c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/walking/walking.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 107:
/*!*****************************************************************************************************!*\
  !*** C:/documents/javaprojects/Fit/uniapp/pages/walking/walking.vue?vue&type=template&id=c0a1840c& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_walking_vue_vue_type_template_id_c0a1840c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../programs/HbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../programs/HbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../programs/HbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../programs/HbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../programs/HbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../programs/HbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./walking.vue?vue&type=template&id=c0a1840c& */ 108);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_walking_vue_vue_type_template_id_c0a1840c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_walking_vue_vue_type_template_id_c0a1840c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_walking_vue_vue_type_template_id_c0a1840c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_walking_vue_vue_type_template_id_c0a1840c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 108:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/documents/javaprojects/Fit/uniapp/pages/walking/walking.vue?vue&type=template&id=c0a1840c& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 109:
/*!***********************************************************************************************!*\
  !*** C:/documents/javaprojects/Fit/uniapp/pages/walking/walking.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_walking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../programs/HbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../programs/HbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../programs/HbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../programs/HbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../programs/HbuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./walking.vue?vue&type=script&lang=js& */ 110);
/* harmony import */ var _programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_walking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_walking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_walking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_walking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_programs_HbuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_walking_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 110:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/documents/javaprojects/Fit/uniapp/pages/walking/walking.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timer = function timer() {
  __webpack_require__.e(/*! require.ensure | components/timer */ "components/timer").then((function () {
    return resolve(__webpack_require__(/*! components/timer.vue */ 291));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var sportmap = function sportmap() {
  __webpack_require__.e(/*! require.ensure | components/sportmap */ "components/sportmap").then((function () {
    return resolve(__webpack_require__(/*! components/sportmap.vue */ 298));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var uppage = function uppage() {
  Promise.all(/*! require.ensure | components/uppage */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uppage")]).then((function () {
    return resolve(__webpack_require__(/*! components/uppage.vue */ 303));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    timer: timer,
    sportmap: sportmap,
    uppage: uppage
  },
  data: function data() {
    return {
      showmap: false,
      isTimerRunning: false,
      type: 1,
      timerId: null,
      time: 0,
      typetext: '步频',
      steptext: '步数',
      sporttitle: '',
      sporticon: '',
      form: {
        alltime: '00:00',
        disnum: '0.00',
        typenum: '0',
        stepnum: 0,
        consumption: 0,
        stepfre: 0,
        date: ''
      },
      sportdata: [],
      totalTimeInMinutes: 0,
      speeds: [],
      timerCount: 0
    };
  },
  mounted: function mounted() {
    var _this = this;
    setTimeout(function () {
      _this.showmap = true;
    }, 3000);
  },
  onLoad: function onLoad(e) {
    this.type = e.type;
    if (e.type === '0') {
      this.sporttitle = '户外行走';
      this.typetext = '步频';
      this.sporticon = '../static/icons/walk.png';
    } else if (e.type === '1') {
      this.sporttitle = '户外跑步';
      this.typetext = '配速';
      this.sporticon = '../static/icons/run.png';
    } else {
      this.steptext = '高度';
      this.sporttitle = '户外骑行';
      this.typetext = '时速';
      this.sporticon = '../static/icons/bike.png';
    }
  },
  computed: {
    formattedTime: function formattedTime() {
      var minutes = Math.floor(this.time / 60).toString().padStart(2, '0');
      var seconds = (this.time % 60).toString().padStart(2, '0');
      this.form.alltime = "".concat(minutes, ":").concat(seconds);
      var s = this.time / 60;
      this.totalTimeInMinutes = s;
    }
  },
  methods: {
    startMap: function startMap() {
      var _this2 = this;
      if (!this.isTimerRunning) {
        this.timerId = setInterval(function () {
          _this2.time++;
        }, 1000);
        this.isTimerRunning = true;
      }
      this.$refs.mapRef.startDrawingPath();
    },
    pauseMap: function pauseMap() {
      clearInterval(this.timerId);
      this.isTimerRunning = false;
      this.$refs.mapRef.stopDrawingPath();
    },
    endMap: function endMap() {
      var _this3 = this;
      clearInterval(this.timerId);
      this.sportdata = this.$refs.mapRef.endSport();
      var upform = this.form;
      var currentDate = new Date();
      var timestamp = currentDate.getTime();
      var year = currentDate.getFullYear();
      var month = String(currentDate.getMonth() + 1).padStart(2, '0');
      var day = String(currentDate.getDate()).padStart(2, '0');
      var hours = String(currentDate.getHours()).padStart(2, '0');
      var minutes = String(currentDate.getMinutes()).padStart(2, '0');
      var formattedDate = "".concat(year, "/").concat(month, "/").concat(day, "-").concat(hours, ":").concat(minutes);
      this.form.date = formattedDate;
      if (this.type === '1') {
        var sum = this.speeds.reduce(function (acc, curr) {
          return acc + parseFloat(curr);
        }, 0);
        var temp = sum / this.speeds.length;
        var paceMinutes = Math.floor(temp);
        var paceSeconds = Math.round((temp - paceMinutes) * 60);
        var averagePace = "".concat(paceMinutes, "'").concat(paceSeconds, "\"");
        upform.typenum = averagePace;
      }
      if (this.type === '2') {
        var _sum = this.speeds.reduce(function (acc, curr) {
          return acc + parseFloat(curr);
        }, 0);
        var _averagePace = _sum / this.speeds.length;
        upform.typenum = _averagePace.toFixed(2);
      }
      var s1 = JSON.stringify(this.sportdata[0]);
      var s2 = JSON.stringify(this.sportdata[1]);
      upform.markers = s1;
      upform.polyline = s2;
      upform.userid = uni.getStorageSync('xm-user').id;
      upform.type = this.type;
      var sportdate = JSON.parse(uni.getStorageSync('userdata').sportdate);
      sportdate.push(timestamp);
      var allconsum = uni.getStorageSync('userdata').allconsum;
      var all = allconsum + upform.consumption;
      this.$request.put('/user/updateUserData', {
        allconsum: all,
        sportdate: JSON.stringify(sportdate)
      }).then(function (e) {
        console.log(e);
      });
      this.$request.post('/sport/add', upform).then(function (res) {
        console.log(res);
        var form = JSON.stringify(_this3.form);
        console.log(_this3.form);
        uni.redirectTo({
          url: '/pages/completesport/completesport?form=' + form + '&type=' + _this3.type
        });
      });
    },
    updatedistance: function updatedistance(data) {
      this.form.disnum = data.distance.toFixed(2).toString();
      if (this.timerCount % 10 === 0 && this.timerCount != 0) {
        var steps = (data.distance * 1000).toFixed(2) / 0.75; //步数
        var averageCadence = (steps / this.totalTimeInMinutes).toFixed(0); //步频
        var calories = (uni.getStorageSync('userdata').weight * data.distance.toFixed(2) * 65 / 1000).toFixed(0);
        this.form.consumption = calories.toFixed(0);
        this.form.stepfre = averageCadence.toFixed(0);
        this.form.stepnum = steps.toFixed(0);
        if (this.type === '0') {
          this.form.typenum = averageCadence.toFixed(0);
        }
        if (this.type === '1') {
          //速度
          var pace = this.totalTimeInMinutes / data.distance;
          this.speeds.push(pace.toFixed(2));
          var paceMinutes = Math.floor(pace);
          var paceSeconds = Math.round((pace - paceMinutes) * 60);
          var paceString = "".concat(paceMinutes, "'").concat(paceSeconds, "\"");
          this.form.typenum = paceString;
        }
        if (this.type === '2') {
          var _pace = data.distance / (this.totalTimeInMinutes / 60);
          this.form.typenum = _pace.toFixed(2);
          this.speeds.push(_pace.toFixed(2));
          this.form.stepnum = data.altitude;
        }
      }
      this.timerCount++;
    },
    beforeDestroy: function beforeDestroy() {
      clearInterval(this.timerId);
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })

},[[105,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/walking/walking.js.map