/**
 * Author: Baoxu
 * Date:   13-4-20
 * Time:   下午3:47
 */


//定义一些常量
var LOG_INFO = "BAOXU-INFO", //Info的log前缀
	LOG_TOUCH = "BAOXU-TOUCH"; //Touch的log前缀

//浏览器信息
var CLIENT_INFO = [];


/*****************************************************************/
/**                        函数执行起点                           **/
/*****************************************************************/


addLoadEvent(todo);

/**
 * 页面加载完成之后需要立即执行的函数或者语句
 * @name todo
 */
function todo(){
	//initView();
}

/**
 * 添加页面加载后事件
 * @name addLoadEvent
 * @param {Function} func 需要页面载入后执行的函数
 */
function addLoadEvent(func){
	var oldOnloadEvent = window.onload;
	if(typeof oldOnloadEvent != "function"){
		window.onload = func;
	}else{
		window.onload = function(){
			oldOnloadEvent();
			func();
		}
	}
}

/**
 * 自定义的日志函数
 * @name baoxuLog
 * @param {String} log_class 日志记录的分类
 * @param {String} log_text 日志记录的语句
 */
function baoxuLog(log_class, log_text){
	console.log(log_class + " : " + log_text);
}

/**
 * @name getClientInfo
 * @class 获得浏览器信息
 * @return {Array} 返回浏览器信息数组
 */
function getClientInfo(){
	var client_info = [];
	client_info["width"] = document.body.clientWidth;
	client_info["height"] = document.body.clientHeight;
	return client_info;
}