;(function($) {
	
	
	var intervals = [];
	
	var seconds, minutes, hour, day, milliseconds;
	

	// 私有方法
	var _init = function(obj, userOptions) {
		/*
		 * options默认配置
		 * now：现在的时间，可选选项，11位时间戳(String)
		 * startTime: 开始倒计时的时间，必填，时间戳(String)
		 * endTime: 结束倒计时的时间，必填，时间戳(String)
		 * maxRange: "1" or "day"
		 * minRange: "5" or "milliseconds"
		 */
		var options = {
			now: new Date().getTime(),
			startTime: null,
			endTime: null,
			maxRange: 1,
			minRange: 5
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

		var time = 1000;  // interval时间间隔 
		if(options.minRange >= options.maxRange) {
			switch(options.minRange) {
				case "1": time = 86400000;
				case "day": break;
				case "2": time = 3600000;
				case "hour": break;
				case "3": time = 60000;
				case "minutes": break;
				case "4": time = 1000;
				case "seconds": break;
				case "5": time = 1;
				case "milliseconds": break;
			}
		}
		var $target = obj;
		var interval = setInterval(function() {
			console.log($target[0]);
			// $target[0].apply(this,_createDigits, [diff]);
			diff--;	
		}, time);
	};
	var _createDigits = function(diff) {
		if(diff > -1) {
			var milliseconds = parseInt(diff)%1000;
			var seconds = parseInt(diff/1000)%60;
			var minutes = parseInt(diff/60000)%60;
			var hour = parseInt(diff/3600000)%24;
			var day = parseInt(diff/86400000);
			$target.find(".day").text(day > 9 ? day : "0"+day).end()
				.find(".hour").text(hour > 9 ? hour : "0"+hour).end()
				.find(".minutes").text(minutes > 9 ? minutes : "0"+minutes).end()
				.find(".seconds").text(seconds > 9 ? seconds : "0"+seconds).end()
				.find(".milliseconds").text(milliseconds > 9 ? milliseconds : "0"+milliseconds).end();
		}
	};

	// 公有方法
	var methods = {
		// 初始化方法
		init: function(userOptions) {
			_init($(this.selector), userOptions);
		},
		// 暂停倒计时
		pause: function() {
			if(interval) {
				clearInterval(interval);
				interval = null;
			}
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
		"endTime": "1439820000000",
		"minRange": 4
	});
	$(".countdown").countdown();
});