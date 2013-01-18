/**
 * Author: Baoxu
 * Date:   12-7-2
 * Time:   下午1:56
 */

// 需要的全局变量
var MOVEMENT_FLAG = 0;  //移位完成标志符

/**
 * @name $$
 * @class 根据ID获取DOM元素
 * @param {String} id 元素ID
 * @return {Node}
 */
function $$(id){
	return document.getElementById(id);
}

/**
 * @name addLoadEvent
 * @class 添加页面加载后事件
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
 * @name insertAfter
 * @class 在某元素之后插入
 * @param {Node} newElement 需要插入的新元素
 * @param {Node} targetElement 在这个元素之后插入
 */
function insertAfter(newElement, targetElement){
	var theParentNode = targetElement.parentNode;
	if(theParentNode.lastChild == targetElement){
		theParentNode.appendChild(newElement);
	}else{
		theParentNode.insertBefore(newElement, targetElement.nextSibling);
	}
}

/**
 * @name addClass
 * @class 为某元素添加class
 * @param {Node} targetElement 为这个元素添加CSS类
 * @param {String} className 需要添加的CSS类
 */
function addClass(targetElement, className){
	if(!targetElement.className){
		targetElement.className = className;
	}else{
		var newClassName = targetElement.className;
		newClassName += " ";
		newClassName += className;
		targetElement.className = newClassName;
	}
}

/**
 * @name getObjectIndex
 * @class 获取某对象元素在目标数组中的位置索引
 * @param {Array} targetArray 要在这个序列里面查找
 * @param {Object} checkObject 查找的目标
 * @return {Number} 如果找到，返回索引，没有则返回-1
 */
function getObjectIndex(targetArray, checkObject){
	for(var i = 0 ; i < targetArray.length ; i++){
		if(targetArray[i] == checkObject){
			return i;
		}
	}
	return -1;
}


/**
 * @name getHTTPObject
 * @class 通用函数，根据不同的浏览器获取XmlHttpRequest对象
 * @return {Object} 返回XmlHttpRequest对象
 */
function getHTTPObject(){
	if(typeof XMLHttpRequest == "undefined"){
		XMLHttpRequest = function(){
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}catch(e){
			}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			}catch(e){
			}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){
			}
			return {};
		}
	}
	return new XMLHttpRequest();
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

/**
 * @name moveElementTo
 * @class 将元素移动至指定的坐标
 * @param {String} elementID 需要移动的块的ID
 * @param {String} positionStyle 被移动元素的position属性，absolute可以取到margin值，fixed只能使用left值
 * @param {Number} targetX 移动到的目标X轴坐标
 * @param {Number} stepDis 每一次timeOut的移动距离百分比，用小数表示
 * @param {Number} stepTime 每一次timeOut的时间
 * @param {Number} key 用于标识关联影响的元素是应该变宽还是变窄，取值为-1，0，1
 * @param {Function} callback 移位完成调用的函数
 * @param {String} callbackParam callback回调函数的参数
 */
function moveElementTo(elementID, positionStyle, targetX, stepDis, stepTime, key, callback, callbackParam){
	var elementToMove = document.getElementById(elementID);

	var elementX;
	if(positionStyle == "absolute"){
		elementX = parseInt(elementToMove.style.marginLeft);
	}else if(positionStyle == "fixed"){
		elementX = parseInt(elementToMove.style.left);
		//alert(elementX);
	}
	var dist;

	MOVEMENT_FLAG = 0;

	//如果上一次的点击的移位还没有完成，先清除循环
	if(elementToMove.movement){
		clearTimeout(elementToMove.movement);
	}

	//移位完成，返回true
	if(elementX == targetX){
		MOVEMENT_FLAG = 1;
		if(callback){
			if(callbackParam){
				callback(callbackParam);
			}else{
				callback();
			}
		}
		return;
	}else if(elementX > targetX){
		dist = Math.ceil((elementX - targetX) * stepDis);
		elementX -= dist;
	}else if(elementX < targetX){
		dist = Math.ceil((targetX - elementX) * stepDis);
		elementX += dist;
	}

	//设定单次移动之后的marginLeft值或者left值
	if(positionStyle == "absolute"){
		elementToMove.style.marginLeft = elementX + "px";
	}else if(positionStyle == "fixed"){
		elementToMove.style.left = elementX + "px";
	}

	elementToMove.style.width = key * dist + parseInt(elementToMove.style.width) + "px";

	//循环单次移动，形成动画效果
	var repeat = "moveElementTo('" + elementID + "','" + positionStyle + "'," + targetX + "," + stepDis + "," + stepTime + "," + key + "," + callback + ",'" + callbackParam + "')";
	elementToMove.movement = setTimeout(repeat, stepTime);
}

/**
 * @name moveElementWith
 * @class 将元素移动指定的位移
 * @param {String} elementID 需要移动的块的ID
 * @param {String} positionStyle 被移动元素的position属性，absolute可以取到margin值，fixed只能使用left值
 * @param {Number} stepX 移动到的目标X轴坐标
 * @param {Number} stepDis 每一次timeOut的移动距离百分比，用小数表示
 * @param {Number} stepTime 每一次timeOut的时间
 * @param {Number} key 用于标识关联影响的元素是应该变宽还是变窄，取值为-1，0，1
 * @param {Function} callback 移位完成调用的函数
 * @param {String} callbackParam 同时移动两个元素的第二个元素ID，可选
 */
function moveElementWith(elementID, positionStyle, stepX, stepDis, stepTime, key, callback, callbackParam){
	var elementToMove = document.getElementById(elementID);

	//获取当前X轴坐标
	var elementX;
	if(positionStyle == "absolute"){
		elementX = parseInt(elementToMove.style.marginLeft);
	}else if(positionStyle == "fixed"){
		elementX = parseInt(elementToMove.style.left);
		//alert(elementX);
	}

	var targetX = elementX + stepX;

	//循环单次移动，形成动画效果
	var repeat = "moveElementTo('" + elementID + "','" + positionStyle + "'," + targetX + "," + stepDis + "," + stepTime + "," + key + "," + callback + ",'" + callbackParam + "')";
	elementToMove.movement = setTimeout(repeat, stepTime);
}

/**
 * @name AppCache
 * @class 操作离线存储的类
 * @return {String} 返回当前Cache状态
 */
function AppCache(){
	this.appCacheData = self.applicationCache;
	//alert(String(this.appCacheData));

	//当前缓存状态
	this.cacheStatus = function(i){
		switch(i.status){
			case i.UNCACHED: // UNCACHED == 0
				return 'UNCACHED/未缓存';
				break;
			case i.IDLE: // IDLE == 1
				return 'IDLE/正在处理缓存';
				break;
			case i.CHECKING: // CHECKING == 2
				return 'CHECKING/检查缓存状态';
				break;
			case i.DOWNLOADING: // DOWNLOADING == 3
				return 'DOWNLOADING/正在下载缓存';
				break;
			case i.UPDATEREADY:  // UPDATEREADY == 4
				return 'UPDATEREADY/可以更新缓存';
				break;
			case i.OBSOLETE: // OBSOLETE == 5
				return 'OBSOLETE';
				break;
			default:
				return 'UKNOWN CACHE STATUS';
				break;
		}
	}(this.appCacheData);
	//更新缓存
	this.cacheUpdate = function(i){
		i.update(); // 开始更新
		if(i.status == window.applicationCache.UPDATEREADY){
			i.swapCache();  // 得到最新版本缓存列表，并且成功下载资源，更新缓存到最新
		}
	}(this.appCacheData);
	//更新缓存
	this.cacheUpdate = function(i){
	}(this.appCacheData);
}

/**
 * @name setElementDisplay
 * @class 此方法用于使元素显示出来
 * @param elementID 需要改变显示方式的块的ID
 * @param how 是要显示还是隐藏(block:块状显示；none：不显示)
 */
function setElementDisplay(elementID, how){
	document.getElementById(elementID).style.display = how;
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