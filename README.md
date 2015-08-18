# time-count-down


| 参数    | 默认值   | 值类型 | 作用  |
| ---   | :-----: | :----:  | :----:  |
| now        | null | 数字or字符串 | 可选项，现在的时间；如果不填写该选项，则获取客户端的时间(13位)；建议传入服务器端提供的时间戳，以（毫秒）为单位     |
| startTime  | null | 数字or字符串 | 必选项，开始倒计时的时间   |
| endTime    | null | 数字or字符串 | 必选项，结束倒计时的时间  |
| maxRange   | 1    | 1-5 | 必选项，1:"day",2:"hour",3:"minutes",4:"seconds",5:"milliseconds" |
| minRange   | 5    | 1-5 | 必选项，1:"day",2:"hour",3:"minutes",4:"seconds",5:"milliseconds" |
