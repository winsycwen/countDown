# time-count-down

    基于jQuery的倒计时插件，使用者可参考[参数](#options)，配置出合适的倒计时。

## How to use
## Options
<table>
    <thead>
        <tr>
            <th>Property (Type)</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>now</td>
            <td>new Date().getTime()</td>
            <td>现在的时间，13位时间戳(String)，毫秒为单位。如果提供了startTime与endTime，则now默认取客户端的时间；如果提供了now、startTime与endTime，则now为用户配置的值。</td>
        </tr>
        <tr>
            <td>startTime</td>
            <td>null</td>
            <td>开始的时间，13位时间戳(String)，毫秒为单位。如果没有提供now、endTime则默认倒计时时间为2分钟；</td>
        </tr>
        <tr>
            <td>endTime</td>
            <td>null</td>
            <td>开始的时间，13位时间戳(String)，毫秒为单位。如果没有提供now、endTime则默认倒计时时间为2分钟；</td>
        </tr>
        <tr>
            <td>minRange</td>
            <td>默认为0，时间最高能显示到“天”</td>
            <td>需要显示的范围，可选值为(0-4或"0"-"4"或"day","hour","minutes","seconds","milliseconds")。例如：值为0、"0"与"day"代表时间最高能显示到“天”</td>
        </tr>
        <tr>
            <td>maxRange</td>
            <td>默认为4，时间最低能显示到“毫秒”</td>
            <td>需要显示的范围，可选值为(0-4或"0"-"4"或"day","hour","minutes","seconds","milliseconds")。例如：值为4、"4"与"milliseconds"代表时间最低能显示到“天”。注意：maxRange>=minRange才能正常运行</td>
        </tr>
        <tr>
            <td>format</td>
            <td>defaultFormat，即["天", "小时", "分钟", "秒", "毫秒"]</td>
            <td>数组类型，时间显示的格式。例如：01天22小时03分钟。也可提供["天", "时", "分"]等。注意：提供的数组长度要等于maxRange-minRange+1。</td>
        </tr>
        <tr>
            <td>prefix</td>
            <td>true</td>
            <td>布尔类型，时间显示前缀，当数字小于9时，显示为09。如果为false时，当数字小于9时，显示为9。</td>
        </tr>
        <tr>
            <td>endEffect</td>
            <td>null</td>
            <td>null/函数类型，倒计时结束时的效果。</td>
        </tr>
    </tbody>
</table>
## Public plugin methods
<table>
    <thead>
        <tr>
            <th>method(arguments)</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>init</td>
            <td>初始化方法，第一次调用插件时会自动执行</td>
        </tr>
        <tr>
            <td>start</td>
            <td>开始倒计时方法/重新开始倒计时方法</td>
        </tr>
        <tr>
            <td>pause</td>
            <td>暂停倒计时方法</td>
        </tr>
    </tbody>
</table>
