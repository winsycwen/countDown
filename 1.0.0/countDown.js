/*!
 * countDown v1.0.0
 * 倒计时组件
 *
 * 作者：winsycwen
 * Github: https://github.com/winsycwen
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下可应用于个人或商业用途
 */

;(function($) {
	/*
	 * @description 初始化操作：用户配置与默认配置合并、计算时间差、倒计时事件初始化
	 * @params Object:userOptions 用户配置
	 * @return null
	 */
	function _init(userOptions) {
		// 保存调用对象
		var $this = this; 

		/*
		 * options默认配置
		 * now：现在的时间，可选选项，13位时间戳(String)，毫秒为单位，如果提供了startTime与endTime则默认取客户端的时间
		 * startTime: 开始倒计时的时间，可选选项，13位时间戳(String)，毫秒为单位，如果没有提供now、endTime则默认倒计时时间为2分钟
		 * endTime: 结束倒计时的时间，可选选项，13位时间戳(String)，毫秒为单位，如果没有提供now、startTime则默认倒计时时间为2分钟
		 * minRange: "0" or "day"
		 * maxRange: "4" or "milliseconds"
		 */
		var options = {
			now: new Date().getTime(),
			startTime: null,
			endTime: null,
			minRange: 0,
			maxRange: 4
		};
		
		// 配置：合并userOptions到options对象中
		$.extend(options, userOptions);

		var diff = 120000; // 现在时间与结束时间的时间差（毫秒）
		if(userOptions && userOptions.startTime && userOptions.endTime) {
			// 如果"现在时间now"处于"开始时间startTime"与"结束时间endTime"之间，
			// 则计算现在时间与结束时间的差
			if(options.now > options.startTime && options.now < options.endTime) {
				diff = options.endTime - options.now;
			}
		}
		// 设置interval时间间隔，用于interval间歇调用
		var time = 1000;
		if(options.maxRange >= options.minRange) {
			switch(options.maxRange) {
				case 0:
				case "0": 
				case "day": 
					time = 86400000;
					break;
				case 1:
				case "1": 
				case "hour": 
					time = 3600000;
					break;
				case 2:
				case "2": 
				case "minutes": 
					time = 60000;
					break;
				case 3:
				case "3": 
				case "seconds": 
					time = 1000;
					break;
				case 4:
				case "4": 
				case "milliseconds": 
					time = 2;
					break;
				default: 
					$.error("No matching options were found!");
					break;
			}
		}

		var interval = null;
		// 获取倒计时初始化时间以及显示该时间
		var initTime = _initTime.call($this, diff, options);

		// 测试：
		// initTime = {"hour": 0, "minutes": 1, "seconds": 10, "length": 3};

		console.log(initTime);
		var max = options.maxRange;
		
		// 绑定名为"start"的事件，定义改变时间的间歇调用
		$this.on("start", function(event) {
			var $that = $this;
			if(!interval) {
				interval = setInterval(function() {
					initTime = _changTime.call($that, initTime, max);
				}, time);
			}
		});
		// 触发"start"事件，开始倒计时
		$this.trigger("start");

		// 绑定名为"pause"事件，暂停倒计时
		$this.on("pause", function() {
			if(interval) {
				clearInterval(interval);
				interval = null;
			}
		});
	}


	// 闭包内部全局变量
	var timeClass = ["day", "hour", "minutes", "seconds", "milliseconds"];
	var dividend_one = [86400000, 3600000, 60000, 1000, 1];
	var dividend_two = [1, 24, 60, 60, 1000];
	/*	var milliseconds = parseInt(diff)%1000;
		var seconds = parseInt(diff/1000)%60;
		var minutes = parseInt(diff/60000)%60;
		var hour = parseInt(diff/3600000)%24;
		var day = parseInt(diff/86400000);*/
	
	/*
	 * @description 获取倒计时初始化时间以及显示该时间，
	 * 				根据时间差以及配置选项计算倒计时初始的天数、小时、分钟、秒、毫秒
	 * @params Number:diff 时间差; Object:options 配置选项
	 * @return 类数组:timeArray 返回初次获取到的时间
	 */
	function _initTime(diff, options) {
		var timeArray = [];
		var max = options.maxRange;
		var min = options.minRange;
		var temp = parseInt(diff/dividend_one[min]);
		this.find("." + timeClass[min]).text(temp);
		timeArray.length = max - min + 1;
		timeArray[timeClass[min]] = temp;
		min ++;
		for(;min <= max; min++) {
			temp = parseInt(diff/dividend_one[min])%dividend_two[min];
			this.find("." + timeClass[min]).text(temp);
			timeArray[timeClass[min]] = temp;
		}
		return timeArray;
	}

	/*
	 * @description 改变时间，利用递归的方法判断从[毫秒、[秒天数、[分钟、[小时、[天]]]]]的时间
	 *				是否到达临界点0
	 * @params 类数组:time 时间;Number:max timeClass对应毫秒至天的下标
	 */
	function _changTime(time, max) {
		if(time[timeClass[max]] != 0) {
			 // time[timeClass[max]] --;
			timeClass[max] == "milliseconds" ? time[timeClass[max]] -= 6 : time[timeClass[max]] --;
			this.find("." + timeClass[max]).text(time[timeClass[max]]);
		} else {
			for(var len = 0, i = time.length - 1, flag = false; i >= len; i-- ) {
				if(time[timeClass[i]] != 0) break;
				if(i == len) {
					flag = true;
					// 暂停倒计时
					this.trigger("pause");
				}
			}
			if(!flag) {
				timeClass[max] == "milliseconds" ? time[timeClass[max]] = 996 : time[timeClass[max]] = 59;
				// 显示时间
				this.find("." + timeClass[max]).text(time[timeClass[max]]);
				// 递归
				_changTime.call(this, time, --max);
			}
		}
		return time;
	}

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
			// 如果countdown已经初始化，且methods中存在method方法，
			// 则将arguments[1...n]的参数转化为数组形式传入methods[method]方法中
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
		"endTime": "1440864000000",   
		"minRange": 1,
		"maxRange": 3
	});
	$(".countdown").countdown();
});
