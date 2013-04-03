/**
 * Author: Baoxu
 * Date:   13-3-20
 * Time:   下午6:17
 */


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
 * 为各个浏览器添加Prefix
 * @name addPerfix
 */
function addPerfix(){
	for(var i in pfx){
		if(obj.style){

		}
	}
}


/**
 * 获取页面当前距离顶部的距离
 * @name getScrollTop
 * @return {Number} 返回距离
 */
function getScrollTop()
{
	var scrollTop=0;
	if(document.documentElement&&document.documentElement.scrollTop)
	{
		scrollTop=document.documentElement.scrollTop;
	}
	else if(document.body)
	{
		scrollTop=document.body.scrollTop;
	}
	return scrollTop;
}


/**
 * 自定义的日志函数
 * @name addProperty
 * @param {String} log_class 日志记录的分类
 * @param {String} log_text 日志记录的语句
 */
function addProperty(log_class, log_text){
	console.log(log_class + " : " + log_text);
}


/**
 * @name EventUtil
 * @class 此方法处理事件
 */
var EventUtil = {

	addHandler:function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent("on" + type, handler);
		}else{
			element["on" + type] = handler;
		}
	},

	getButton:function(event){
		if(document.implementation.hasFeature("MouseEvents", "2.0")){
			return event.button;
		}else{
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	},

	getCharCode:function(event){
		if(typeof event.charCode == "number"){
			return event.charCode;
		}else{
			return event.keyCode;
		}
	},

	getClipboardText:function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
	},

	getEvent:function(event){
		return event ? event : window.event;
	},

	getRelatedTarget:function(event){
		if(event.relatedTarget){
			return event.relatedTarget;
		}else if(event.toElement){
			return event.toElement;
		}else if(event.fromElement){
			return event.fromElement;
		}else{
			return null;
		}

	},

	getTarget:function(event){
		return event.target || event.srcElement;
	},

	getWheelDelta:function(event){
		if(event.wheelDelta){
			return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
		}else{
			return -event.detail * 40;
		}
	},

	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},

	removeHandler:function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);
		}else if(element.detachEvent){
			element.detachEvent("on" + type, handler);
		}else{
			element["on" + type] = null;
		}
	},

	setClipboardText:function(event, value){
		if(event.clipboardData){
			event.clipboardData.setData("text/plain", value);
		}else if(window.clipboardData){
			window.clipboardData.setData("text", value);
		}
	},

	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}

};