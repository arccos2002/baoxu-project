/**
 * Author: Baoxu
 * Date:   12-7-2
 * Time:   下午1:56
 */

//添加页面加载后时间
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
			try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
			catch(e){}
			try{return new ActiveXObject("Msxml2.XMLHTTP");}
			catch(e){}
			return false;
		}
	}
	return new XMLHttpRequest();
}