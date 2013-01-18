/**
 * Author: Baoxu
 * Date:   13-1-18
 * Time:   下午12:54
 */

onmessage =function (evt){
	var d = evt.data;//通过evt.data获得发送来的数据
	postMessage( d );//将获取到的数据发送会主线程
}