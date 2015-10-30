/*!
 * timing v2.0.0
 * Date: 2015-10-10
 * 计时器基础类
 *
 * 作者：winsycwen
 * Github: https://github.com/winsycwen
 * 请尊重原创，保留头部版权
 */
define(function(require, exports, modules) {
	var $ = require("jquery");
	var defaults = require("config");
	var 


	var TIMER_DATA_NAME = "timer";

	/**
	 * @description: Timer构造函数
	 * @param	{Object}	obj			Timer对象
	 * @param	{Function}	callback	回调函数
	 * @return	void
	 * 
	 * @datetime	2015-10-27 10:07:30
	 * @author	winsycwen<https://github.com/winsycwen>
	 */
	function Timer(obj) {
		this.obj = obj;
		this.destroyed = false;
		this.timingTimer = null;
		this.isPaused = false;
		this.isStarted = false;
		this.wrapper = $("<div/>")
			.addClass(this.wrapClassName)
			.prepend($("<span/>").addClass(this.innerClassName))
			.appendTo(obj);
		this.time = 0;
	}

	$.extend(Timer.prototype, {
		wrapClassName: "ui-timing-wrap",
		innerClassName: "ui-timing-content",
		interval: 1000,
		/**
		 * @description: 开始
		 * @datetime	2015-10-27 11:17:02
		 * @author	winsycwen
		 */
		start: function() {
			if(this.destroyed) {
				return this;
			}
			if(this.isPaused || !this.isStarted && !this.destroyed) {
				this.isStarted = true;
				this.isPaused = false;
				this.timingTimer = setInterval(function() {
					that.time ++;
					that.changeTime();
				}, this.interval);
			}
			return this;
		},
		/**
		 * @description: 暂停
		 * @datetime	2015-10-27 11:16:47
		 * @author	winsycwen
		 */
		pause: function() {
			if(!this.isPaused) {
				clearInterval(this.timingTimer);
				this.isPaused = true;
			}
		},
		/**
		 * @description: 摧毁
		 * @datetime	2015-10-27 11:17:44
		 * @author	winsycwen
		 */
		destroy: function() {
			if(!this.destroyed) {
				clearInterval(this.timingTimer);
				this.destroyed = true;
			}
		},
		/**
		 * @description: 改变时间
		 * @datetime	2015-10-27 11:15:48
		 * @author	winsycwen
		 */
		changeTime: function() {
			var target = this.obj.find("." + this.innerClassName);
			target.html(this.time);
		}
	});

	function __init(callback) {
		return this.each(function() {
			var $element = $(this);
			var timer = new Timer($element, callback);
			$element.data(TIMER_DATA_NAME, timer);
			timer.start();
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