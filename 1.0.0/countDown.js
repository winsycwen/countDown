/*!
 * countDown v1.0.0.1 
 * 倒计时
 *
 * Copyright 2011-2013, winsycwen
 *
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下可应用于个人或商业用途
 */

;(function($) {
	/*
	 * @description 初始化操作：用户配置与默认配置合并、计算时间差、倒计时事件初始化
	 * @params {userOptions: 用户配置}
	 * @return null
	 */
	function _init(userOptions) {
		// 保存调用对象
		var $this = this; 

		/*
		 * options默认配置
		 * now：现在的时间，可选选项，11位时间戳(String)
		 * startTime: 开始倒计时的时间，必填，时间戳(String)
		 * endTime: 结束倒计时的时间，必填，时间戳(String)
		 * minRange: "1" or "day"
		 * maxRange: "5" or "milliseconds"
		 */
		var options = {
			now: new Date().getTime(),
			startTime: null,
			endTime: null,
			minRange: 1,
			maxRange: 5
		};
		
		// 配置：合并userOptions到options对象中
		$.extend(options, userOptions);

		var diff = 120000; // 现在时间与结束时间的时间差（毫秒）
		if(userOptions && userOptions.startTime && userOptions.endTime) {
			// 如果"现在时间now"处于"开始时间startTime"与"结束时间endTime"之间，则计算现在时间与结束时间的差
			if(options.now > options.startTime && options.now < options.endTime) {
				diff = options.endTime - options.now;
			}
		}

		var time = 1000;  // interval时间间隔，用于interval间歇调用
		var left = 0;
		if(options.maxRange >= options.minRange) {
			switch(options.maxRange) {
				case 1:
				case "1": 
				case "day": 
					time = 86400000;
					break;
				case 2:
				case "2": 
				case "hour": 
					time = 3600000;
					break;
				case 3:
				case "3": 
				case "minutes": 
					time = 60000;
					break;
				case 4:
				case "4": 
				case "seconds": 
					time = 1000;
					break;
				case 5:
				case "5": 
				case "milliseconds": 
					time = 1;
					break;
				default: 
					$.warn("No matching options were found!");
					break;
			}
		}

		var interval = null;
		// 初始化倒计时时间
		_createDigits.call($this, diff, options);
		// 绑定名为"start"的事件
		$this.on("start", function(event) {
			var $that = $this;
			if(!interval) {
				interval = setInterval(function() {
					_createDigits.call($that, diff, options);
					diff -= time;	
				}, time);
			}
		});
		// 触发"start"事件
		$this.trigger("start");
		// 绑定名为"pause"事件
		$this.on("pause", function() {
			if(interval) {
				clearInterval(interval);
				interval = null;
			}
		});
	}

	/*
	 * @description 初始化时间，根据时间差以及配置选项计算倒计时初始的天数、小时、分钟、秒、毫秒
	 * @params {diff: 时间差，options: 配置选项}
	 * @return null
	 */
	function _initTime(diff, options) {
	}

	/*
	 * @description 改变倒计时的天数
	 * @param 
	 * @return null
	 */
	function _changeDay() {}

	/*
	 * @description 改变倒计时的小时数
	 * @param 
	 * @return null
	 */
	function _changeHour() {}

	/*
	 * @description 改变倒计时的分钟数
	 * @param 
	 * @return null
	 */
	function _changeMinutes() {}

	/*
	 * @description 改变倒计时的秒数
	 * @param 
	 * @return null
	 */
	function _changeSeconds() {}

	/*
	 * @description 改变倒计时的毫秒数
	 * @param 
	 * @return null
	 */
	function _changeMilliseconds() {}

	/*
	 * @description 创建时间，根据时间差计算倒计时天数、小时、分钟、秒、毫秒。
	 */
	function _createDigits(diff, options) {
		if(diff > -1) {
			var milliseconds = parseInt(diff)%1000;
			var seconds = parseInt(diff/1000)%60;
			var minutes = parseInt(diff/60000)%60;
			var hour = parseInt(diff/3600000)%24;
			var day = parseInt(diff/86400000);
			this.find(".day").text(day > 9 ? day : "0"+day).end()
				.find(".hour").text(hour > 9 ? hour : "0"+hour).end()
				.find(".minutes").text(minutes > 9 ? minutes : "0"+minutes).end()
				.find(".seconds").text(seconds > 9 ? seconds : "0"+seconds).end()
				.find(".milliseconds").text(milliseconds > 9 ? milliseconds : "0"+milliseconds).end();
		}
	}

	// 闭包内部全局变量
	var timeClass = ["day", "hour", "minutes", "seconds", "milliseconds"];


	// 公有方法
	var methods = {
		// 初始化方法
		init: function(userOptions) {
			_init.call($(this.selector), userOptions);
		},
		// 开始倒计时
		start: function() {
			$(this.selector).trigger("start");
		},
		// 暂停倒计时
		pause: function() {
			$(this.selector).trigger("pause");
		}
	};


	$.fn.countdown = function(method) {
		if(methods && methods[method]) {
			// 如果countdown已经初始化，且methods中存在method方法，则将arguments[1...n]的参数转化为数组形式传入methods[method]方法中
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); 
		} else if(typeof method == "object" || !method) {
			// 如果传入的method参数是对象或者没有传参，则进行初始化
			return methods.init.apply(this, arguments);
		} else {
			$.error("Method " + method +" does not exist on countdown!");
		}
	}
})(jQuery);


$(function() {
	$(".test").countdown({
		"startTime": "1439740800000",
		"endTime": "1439913600000",
		"maxRange": 4
	});
	$(".countdown").countdown();
});