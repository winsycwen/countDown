/*!
 * countDown v1.2.0
 * Date: 2015-09-17
 * 倒计时组件
 *
 * 作者：winsycwen
 * Github: https://github.com/winsycwen
 * 请尊重原创，保留头部版权
 */
define(function(require, exports, module) {
	require("jquery");
	window.$ = window.jQuery;
	var options = require("../src/countDown-config.js");

	var timeClass = ["day", "hour", "minutes", "seconds", "milliseconds"],
		dividend_one = [86400000, 3600000, 60000, 1000, 1],
		dividend_two = [1, 24, 60, 60, 1000],
		defaultFormat = ["天", "小时", "分钟", "秒", "毫秒"];

	function CountDown(userOptions) {
		// 配置：合并userOptions到options对象中
		var originalOptions = userOptions || {};
		this.options = $.extend({}, options, userOptions);
	}

	// 私有方法
	function _initTime() {}

	// 公有方法
	// CountDown.prototype = {
	// 	constructor: "CountDown",
	// 	start: function() {
	// 		console.log(this.options);
	// 	}
	// };
	$.extend(CountDown.prototype, {
		start: function() {
			console.log(this.options);
			return this;
		},
		stop: function() {
			return this;
		}
	});


	module.exports = CountDown;
});