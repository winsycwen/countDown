/*!
 * timing v1.0.0
 * Date: 2015-10-10
 * 计时器基础类
 *
 * 作者：winsycwen
 * Github: https://github.com/winsycwen
 * 请尊重原创，保留头部版权
 */
define(function(require, exports, modules) {
	require("../lib/jquery/1.11.3/jquery-1.11.3.min.js");

	var TIMER_DATA_NAME = "timer";

	function Timer(obj, callback) {
		this.obj = obj;
		this.callback = callback;
		this.destroyed = false;
	}

	$.extend(Timer.prototype, {
		init: function() {
			console.log("init");
			return this;
		},
		start: function() {
			console.log("start");
			return this;
		},
		stop: function() {
		},
		destroy: function() {},
		counting: function() {
		}
	});

	function __init(callback) {
		return this.each(function() {
			var $element = $(this);
			var timer = new Timer($element, callback);
			$element.data(TIMER_DATA_NAME, timer);
			timer.init();
		});
	}

	function __callTimerMethod(methodName) {
		if(!(methodName in Timer.prototype)) {
			$.error("Method '" + methodName + "' does not exist on timing.js");
		}
		return this.each(function() {
			var $element = $(this);
			var timer = $element.data(TIMER_DATA_NAME);
			if(timer) {
				timer[methodName].apply(timer, Array.prototype.slice.call(arguments, 1));
			}
		});
	}

	$.fn.timer = function(method) {
		if(!method) {
			__init.apply(this, arguments);
		} else {
			__callTimerMethod.apply(this, arguments);
		}
	};
});