/*!
 * countDown v1.2.0
 * Date: 2015-09-17
 * 倒计时组件
 *
 * 作者：winsycwen
 * Github: https://github.com/winsycwen
 * 请尊重原创，保留头部版权
 */
define(function(require, exports, modules) {
	require("../lib/jquery/1.11.3/jquery-1.11.3.min.js");
	// 闭包内部全局变量
	var timeClass = ["day", "hour", "minutes", "seconds", "milliseconds"],
		dividend_one = [86400000, 3600000, 60000, 1000, 1],
		dividend_two = [1, 24, 60, 60, 1000],
		defaultFormat = ["天", "小时", "分钟", "秒", "毫秒"];

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
		 * now：现在的时间，可选选项，13位时间戳(String)，毫秒为单位，如果提供了startTime与endTime则默认取客户端的时间；
		 * startTime: 开始倒计时的时间，可选选项，13位时间戳(String)，毫秒为单位，如果没有提供now、endTime则默认倒计时时间为2分钟；
		 * endTime: 结束倒计时的时间，可选选项，13位时间戳(String)，毫秒为单位，如果没有提供now、startTime则默认倒计时时间为2分钟；
		 * minRange: "0" or "day"；
		 * maxRange: "4" or "milliseconds"；
		 * format: 数组，默认格式为"d天h小时m分钟s秒mill毫秒"(d、h、m、s、mill为数字)；
		 * prefix: 布尔值，默认为true，显示的时间为01小时03分钟；如果设置为false，则显示为1小时3分钟；
		 */
		var options = {
			now: new Date().getTime(),
			startTime: null,
			endTime: null,
			minRange: 0,
			maxRange: 4,
			format: null,
			prefix: true,
			endEffect: null
		};
		// 配置：合并userOptions到options对象中
		$.extend(options, userOptions);
		// 存储初始化过的countdown
		$this.data("countdown", {
			target: $this,
			options: options
		});

		var maxRange = options.maxRange,
			minRange = options.minRange,
			now = options.now,
			st = options.startTime,
			et = options.endTime,
			format = options.format || defaultFormat,
			prefixflag = options.prefix,
			endEffect = options.endEffect;
		options.format = format;
		// 配置选项的检测
		_checkOptions(userOptions, options);

		var diff = 2000; // 现在时间与结束时间的时间差（毫秒）
		if(userOptions && userOptions.startTime && userOptions.endTime) {
			// 如果"现在时间now"处于"开始时间startTime"与"结束时间endTime"之间，
			// 则计算现在时间与结束时间的差
			if(now > st && now < et) {
				diff = et - now;
			}
		}

		// 设置interval时间间隔，用于interval间歇调用
		var time = 1000;
		if(maxRange >= minRange) {
			switch(maxRange) {
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
					time = 10;
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

		// 绑定名为"pause"事件，暂停倒计时
		$this.on("pause", function() {
			if(interval) {
				clearInterval(interval);
				interval = null;
			}
		});
		// 绑定名为"end"事件，结束倒计时
		$this.on("end", function() {
			var $that = $this;
			console.log("end");
			if(interval) {
				clearInterval(interval);
				interval = null;
				_endEffect.call($that, endEffect);
			}
		});

		// 绑定名为"start"的事件，定义改变时间的间歇调用
		$this.on("start", function(event) {
			var $that = $this;
			console.log("start");
			if(diff < time) {
				$that.trigger("end");
			} else {
				if(!interval) {
					// if(maxRange == 4) --diff;
					interval = setInterval(function() {
						initTime = _changTime.call($that, initTime, maxRange, minRange, prefixflag);
					}, time);
				}
			}
		});
		// 触发"start"事件，开始倒计时
		$this.trigger("start");
	}
	
	/*
	 *	@description 判断配置选项是否符合规范
	 *	@params Object: userOptions 用户配置选项; Object: options 配置选项
	 *	@return Boolean: true/false 返回配置选项是否规范的布尔值   
	 */
	function _checkOptions(userOptions, options) {
		if(userOptions) {
			if(options.minRange < 0 || options.minRange > 4 || options.maxRange < 0 || options.maxRange > 4) {
				$.error("Please provide correct minRange or maxRange!");
			}
			if(userOptions.format && options.format.length !== options.maxRange - options.minRange + 1) {
				$.error("Please provide correct format!");
			}
		} 
	}

	/*
	 * @description 获取倒计时初始化时间以及显示该时间，
	 * 				根据时间差以及配置选项计算倒计时初始的天数、小时、分钟、秒、毫秒
	 * @params Number:diff 时间差; Object:options 配置选项
	 * @return 类数组:timeArray 返回初次获取到的时间
	 */
	function _initTime(diff, options) {
		var timeArray = [],
			max = options.maxRange,
			min = options.minRange,
			format = options.format,
			time,
			prefixFlag = options.prefix,
			tempWrap;
		timeArray.length = max - min + 1;
		tempWrap = $("<div class='tempWrap'></div>").appendTo(this);
		for(i = min, j = 0, len = max - min + 1;j < len; i++, j++) {
			if(j === 0) {
				time = parseInt(diff/dividend_one[i]);
			} else {
				time = parseInt(diff/dividend_one[i]) % dividend_two[i];
			}
			$("<span>").addClass(timeClass[i]).text(time < 10 && prefixFlag ? "0" + time : time).appendTo(tempWrap);
			$("<em>").text(defaultFormat !== format ? format[j] : format[i]).appendTo(tempWrap);
			timeArray[timeClass[i]] = time;
		}
		return timeArray;
	}

	/*
	 * @description 改变时间，利用递归的方法判断从[毫秒、[秒天数、[分钟、[小时、[天]]]]]的时间
	 *				是否到达临界点0
	 * @params 类数组:timeArray 时间;Number:max timeClass对应毫秒至天的下标;prefixFlag
	 */
	function _changTime(timeArray, max, min, prefixFlag) {
		var len, i, flag;
		if(timeArray[timeClass[max]] !== 0) {
			// timeArray[timeClass[max]] --;
			timeClass[max] == "milliseconds" ? timeArray[timeClass[max]] -= 10 : timeArray[timeClass[max]] --;
			this.find("." + timeClass[max]).text(timeArray[timeClass[max]] < 10 && prefixFlag ? "0" + timeArray[timeClass[max]] : timeArray[timeClass[max]]);
		} else {
			for(i = max, flag = false; i >= min; i-- ) {
				if(timeArray[timeClass[i]] !== 0) break;
				if(i == min) {
					flag = true;
					// 结束倒计时
					this.trigger("end");
				}
			}
			if(!flag) {
				timeClass[max] == "milliseconds" ? timeArray[timeClass[max]] = 960 : timeArray[timeClass[max]] = 59;
				// 显示时间
				this.find("." + timeClass[max]).text(timeArray[timeClass[max]] < 10 && prefixFlag ? "0" + timeArray[timeClass[max]] : timeArray[timeClass[max]]);
				// 递归
				_changTime.call(this, timeArray, --max, min, prefixFlag);
			}
		}
		return timeArray;
	}

	/*
	 * @description 倒计时结束的效果
	 * @params Function:fn 结束后调用的函数
	 */
	function _endEffect(fn) {
		if(fn && typeof fn == "function") {
			fn();
		}
	}

	// 公有方法
	var methods = {
		// 初始化方法
		init: function(userOptions) {
			var $JQ_obj = $(this.selector);
			if(!$JQ_obj.data("countdown")) {
				_init.call($JQ_obj, userOptions);
			}
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
	};
});