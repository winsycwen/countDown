;(function($) {
	var init = function(userOptions) {
		/*
		 * options默认配置
		 * now：服务器端的时间，必填，时间戳
		 * startTime: 开始倒计时的时间，必填，时间戳
		 * endTime: 结束倒计时的时间，必填，时间戳
		 * obj: {
		 *		day: 倒计时中放置天数的类/ID
		 *		hour: 倒计时中放置小时数的类/ID
		 *		minutes: 倒计时中放置分钟数的类/ID
		 *		seconds: 倒计时中放置秒数的类/ID
		 * }
		 */
		var options = {
			now: new Date(),
			startTime: null,
			endTime: null,
			obj: {
				day: ".day",
				hour: ".hour",
				minutes: ".minutes",
				seconds: ".seconds"
			}
		};
		var $target, // 获取调用countdown的对象
			leftSeconds, // 结束时间戳与现在时间戳的差（秒）
			interval, seconds, minutes, hour, day;
		var createDigits = function(callback) {
			if(!callback) {
				// 根据是否有回掉函数判断是否是第一次调用createDigits函数,否则开始倒计时。
				leftSeconds--;
			}
			if(leftSeconds > 0) {
				seconds = leftSeconds%60;
				minutes = parseInt(leftSeconds/60)%60;
				hour = parseInt(leftSeconds/3600)%24;
				day = parseInt(leftSeconds/3600/24);
				$target.find(options.obj.day).text(day > 9 ? day : "0"+day).end()
					.find(options.obj.hour).text(hour > 9 ? hour : "0"+hour).end()
					.find(options.obj.minutes).text(minutes > 9 ? minutes : "0"+minutes).end()
					.find(options.obj.seconds).text(seconds > 9 ? seconds : "0"+seconds).end();
			} else {
				pause();  // 停止倒计时
			}
			if(callback && typeof callback == "function") {
				// 第一次调用createDigits函数并调用回调函数
				callback();
			}
		};

		var start = function() {
			if(interval == undefined) {
				interval = setInterval(function() {createDigits();}, 1000);
			}
		};

		var pause = function() {
			if(interval) {
				// clearInterval(interval);
				clearTimeout(interval);
				interval = undefined;
			}
			$target.slideUp();
		};
		// 配置：合并userOptions到options对象中
		$.extend(options, userOptions);
		// 计算结束时间戳与现在时间戳的差(秒) 
		leftSeconds = parseInt(parseInt(options.endTime - options.now)/1000);
		$target = $(this.selector);
		if(options.now > options.endTime || options.now < options.startTime) {
			// 如果超时或者还未到倒计时时间，调用倒计时模块的对象隐藏
			$target.hide();
		}
		if(options.now > options.startTime && options.now < options.endTime && options.startTime < options.endTime) {
			// 判断服务器时间是否处于倒计时开始时间和结束时间之间
			createDigits(start);
		} else {
			$target.hide();
		}
	}
	$.fn.countdown = function(method) {
		var methods = this.data("countdown");  // 获取data名为"countdown"的存储内容
		if(methods && methods[method]) {
			// 如果countdown已经初始化过，且methods中存在method方法,则将arguments[0]之后的参数传入methods[method]方法中
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if(typeof method == "object" || !method) {
			// 如果传入的method参数是对象或者没有传参，则进行初始化
			return init.apply(this, arguments);
		} else {
			$.error("方法不存在于countdown中");
		}
	}
})(jQuery);
$(function() {
	$(".test").countdown({
		"startTime": "1439740800000",
		"endTime": "1439820000000"
	});
	$(".countdown").countdown({
		"startTime": "1439740800000",
		"endTime": "1439820000000"
	});
});