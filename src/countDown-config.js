/*!
 * countDown v1.2.0
 * Date: 2015-09-21
 * 倒计时组件默认配置
 *
 * 作者：winsycwen
 * Github: https://github.com/winsycwen
 * 请尊重原创，保留头部版权
 */

 define({
 	/*
	 * countDown 默认配置
	 * now：现在的时间，可选选项，13位时间戳(String)，毫秒为单位，如果提供了startTime与endTime则默认取客户端的时间；
	 * startTime: 开始倒计时的时间，可选选项，13位时间戳(String)，毫秒为单位，如果没有提供now、endTime则默认倒计时时间为2分钟；
	 * endTime: 结束倒计时的时间，可选选项，13位时间戳(String)，毫秒为单位，如果没有提供now、startTime则默认倒计时时间为2分钟；
	 * minRange: "0" or "day"；
	 * maxRange: "4" or "milliseconds"；
	 * format: 数组，默认格式为"d天h小时m分钟s秒mill毫秒"(d、h、m、s、mill为数字)；
	 * prefix: 布尔值，默认为true，显示的时间为01小时03分钟；如果设置为false，则显示为1小时3分钟；
	 */
	now: new Date().getTime(),
	startTime: null,
	endTime: null,
	minRange: 0,
	maxRange: 4,
	format: null,
	prefix: true,
	endEffect: null
 });