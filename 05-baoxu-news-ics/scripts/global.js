/**
 * Author: Baoxu
 * Date:   12-7-2
 * Time:   下午1:56
 */

// 需要的全局变量
var MOVEMENT_FLAG = 0;  //移位完成标志符

function $$(id){
	return document.getElementById(id);
}

//添加页面加载后事件
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

//在某元素之后插入
function insertAfter(newElement, targetElement){
	var theParentNode = targetElement.parentNode;
	if(theParentNode.lastChild == targetElement){
		theParentNode.appendChild(newElement);
	}else{
		theParentNode.insertBefore(newElement, targetElement.nextSibling);
	}
}

//为某元素添加class
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


//获取某对象元素在目标数组中的位置索引，如果有，返回索引，没有则返回-1
function getObjectIndex(targetArray, checkObject){
	for(var i = 0 ; i < targetArray.length ; i++){
		if(targetArray[i] == checkObject){
			return i;
		}
	}
	return -1;
}


//通用函数，根据不同的浏览器获取XmlHttpRequest对象
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
			return false;
		}
	}
	return new XMLHttpRequest();
}


//获得浏览器信息
function getClientInfo(){
	var client_info = new Array();
	client_info["width"] = document.body.clientWidth;
	client_info["height"] = document.body.clientHeight;
	return client_info;
}

//鼠标滚轮事件的定义
function wheelEvent(obj, handle){
	this.handle = handle;
	//兼容火狐和IE
	window.addEventListener ? obj.addEventListener("DOMMouseScroll", this.wheel, false) : (obj.onmousewheel = this.wheel);
}
wheelEvent.prototype.wheel = function(event){
	var ev = event || window.event;
	var delta = ev.wheelDelta ? (ev.wheelDelta / 120) : (-ev.detail / 3); // Firefox using `wheelDelta` IE using `detail`
	eval('delta ? ' + parent.wheelEventHandle + '(delta) : null;');
}


/**
 * 此方法用于移动元素到指定坐标，自定义单步移动距离百分比和单步移动时间
 *
 * @parameter elementID：需要移动的块的ID
 * @parameter positionStyle：被移动元素的position属性，absolute可以取到margin值，fixed只能使用left值
 * @parameter targetX：移动到的目标X轴坐标
 * @parameter stepDis：每一次timeOut的移动距离百分比，用小数表示
 * @parameter stepTime：每一次timeOut的时间
 * @parameter key:用于标识关联影响的元素是应该变宽还是变窄，取值为-1，0，1
 * @parameter callkack：移位完成调用的函数
 * @parameter 同时移动两个元素的第二个元素ID，可选
 *
 * */
function moveElementTo(elementID, positionStyle, targetX, stepDis, stepTime, key, callback, secElementID){
	var elementToMove = document.getElementById(elementID);

	var secElementToMove;
	if(secElementID){
		secElementToMove = document.getElementById(secElementID);
	}else{
		secElementToMove = 0;
	}

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
			callback();
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
		if(secElementToMove){
			secElementToMove.style.marginLeft = elementX + 480 + "px";
		}
	}else if(positionStyle == "fixed"){
		elementToMove.style.left = elementX + "px";
		if(secElementToMove){
			secElementToMove.style.left = elementX + 480 + "px";
		}
	}

	elementToMove.style.width = key * dist + parseInt(elementToMove.style.width) + "px";

	//循环单次移动，形成动画效果
	var repeat = "moveElementTo('" + elementID + "','" + positionStyle + "'," + targetX + "," + stepDis + "," + stepTime + "," + key + "," + callback + ",'" + secElementID + "')";
	elementToMove.movement = setTimeout(repeat, stepTime);
}

/**
 * 此方法用于使移动元素移动指定的位移，自定义单步移动距离百分比和单步移动时间
 *
 * @parameter elementID：需要移动的块的ID
 * @parameter positionStyle：被移动元素的position属性，absolute可以取到margin值，fixed只能使用left值
 * @parameter targetX：移动到的目标X轴坐标
 * @parameter stepDis：每一次timeOut的移动距离百分比，用小数表示
 * @parameter stepTime：每一次timeOut的时间
 * @parameter key:用于标识关联影响的元素是应该变宽还是变窄，取值为-1，0，1
 * @parameter callkack：移位完成调用的函数
 * @parameter 同时移动两个元素的第二个元素ID，可选
 *
 * */
function moveElementWith(elementID, positionStyle, stepX, stepDis, stepTime, key, callback, secElementID){
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
	var repeat = "moveElementTo('" + elementID + "','" + positionStyle + "'," + targetX + "," + stepDis + "," + stepTime + "," + key + "," + callback + ",'" + secElementID + "')";
	elementToMove.movement = setTimeout(repeat, stepTime);
}

//操作离线存储的类
function appCache(){
	this.appCacheData = self.applicationCache;
	alert(String(this.appCacheData));
	//当前缓存状态
	this.cacheStatus = function(i){
		switch(i.status){
			case i.UNCACHED: // UNCACHED == 0
				return 'UNCACHED';
				break;
			case i.IDLE: // IDLE == 1
				return 'IDLE';
				break;
			case i.CHECKING: // CHECKING == 2
				return 'CHECKING';
				break;
			case i.DOWNLOADING: // DOWNLOADING == 3
				return 'DOWNLOADING';
				break;
			case i.UPDATEREADY:  // UPDATEREADY == 4
				return 'UPDATEREADY';
				break;
			case i.OBSOLETE: // OBSOLETE == 5
				return 'OBSOLETE';
				break;
			default:
				return 'UKNOWN CACHE STATUS';
				break;
		}
		;
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
 * 此方法用于使元素显示出来
 *
 * @parameter elementID：需要改变显示方式的块的ID
 * @parameter how:是要显示还是隐藏(block:块状显示；none：不显示)
 *
 * */
function setElementDisplay(elementID , how ){
	document.getElementById(elementID).style.display = how;
}