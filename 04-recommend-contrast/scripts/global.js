/**
 * Author: Baoxu
 * Date:   12-7-26
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


//colorTable("表格ID","奇数行背景","偶数行背景","鼠标经过背景","点击后背景","经过时字色","经过后字色",开始变色的行号);
function cbxColorTable(o,a,b,c,d,e,f,g){
	var t=document.getElementById(o).getElementsByTagName("tr");
	for(var i=g-1;i<t.length;i++){
		t[i].style.backgroundColor=(t[i].sectionRowIndex%2==0)?a:b;
		/*t[i].onclick=function(){
			if(this.x!="1"){
				this.x="1";
				this.style.backgroundColor=d;
			}else{
				this.x="0";
				this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b;
			}
		}*/
		t[i].onmouseover=function(){
			if(this.x!="1"){
				this.style.backgroundColor=c;
				this.style.color=e;
			}
		}
		t[i].onmouseout=function(){
			if(this.x!="1"){
				this.style.backgroundColor=(this.sectionRowIndex%2==0)?a:b;
				this.style.color=f;
			}
		}
	}
}


/**
 * 此方法用于移动元素到指定坐标，可以自定义沿X轴或Y轴移动，自定义单步移动距离百分比和单步移动时间
 *
 * @parameter elementID：需要移动的块的ID
 * @parameter moveType：移动的类型，x表示横向移动，y表示纵向移动，xy表示同时横纵向移动
 * @parameter targetX：移动到的目标X轴坐标
 * @parameter targetY：移动到的目标Y轴坐标
 * @parameter stepDis：每一次timeOut的移动距离百分比，用小数表示
 * @parameter stepTime：每一次timeOut的时间
 *
 * @return true:表示移动完成
 * */
function moveElementTo(elementID, moveType, targetX, targetY, stepDis, stepTime){
	var elementToMove = document.getElementById(elementID);
	var elementX = parseInt(elementToMove.style.marginLeft);
	var elementY = parseInt(elementToMove.style.marginTop);
	var dist;

	//如果上一次的点击的移位还没有完成，先清除循环
	if(elementToMove.movement){
		clearTimeout(elementToMove.movement);
	}

	//如果移动类型参数是x则做横向移动
	if(moveType == "x"){
		//移位完成，返回true
		if(elementX == targetX){
			return true;
		}

		if(elementX > targetX){
			dist = Math.ceil((elementX - targetX) * stepDis);
			elementX -= dist;
		}

		if(elementX < targetX){
			dist = Math.ceil((targetX - elementX) * stepDis);
			elementX += dist;
		}
		//设定单次移动之后的marginLeft值
		elementToMove.style.marginLeft = elementX + "px";
	}
	//移动类型是y做纵向移动
	if(moveType == "y"){
		//移位完成，返回true
		if(elementY == targetY){
			return true;
		}

		if(elementY > targetY){
			dist = Math.ceil((elementY - targetY) * stepDis);
			elementY -= dist;
		}

		if(elementY < targetY){
			dist = Math.ceil((targetY - elementY) * stepDis);
			elementY += dist;
		}
		//设定单次移动之后的marginTop值
		elementToMove.style.marginTop = elementY + "px";
	}
	//移动类型是xy做对角线移动
	if(moveType == "xy"){
		//移位完成，返回true
		if(elementX == targetX && elementY == targetY){
			return true;
		}
		if(elementX > targetX){
			dist = Math.ceil((elementX - targetX) * stepDis);
			elementX -= dist;
		}
		if(elementY > targetY){
			dist = Math.ceil((elementY - targetY) * stepDis);
			elementY -= dist;
		}
		if(elementX < targetX){
			dist = Math.ceil((targetX - elementX) * stepDis);
			elementX += dist;
		}
		if(elementY < targetY){
			dist = Math.ceil((targetY - elementY) * stepDis);
			elementY += dist;
		}
		//设定单次移动之后的marginLeft值
		elementToMove.style.marginLeft = elementX + "px";
		//设定单次移动之后的marginTop值
		elementToMove.style.marginTop = elementY + "px";
	}

	//循环单次移动，形成动画效果
	var repeat = "moveElementTo('" + elementID + "','" + moveType + "'," + targetX + "," + targetY + "," + stepDis + "," + stepTime + ")";
	elementToMove.movement = setTimeout(repeat, stepTime);
}


/**
 * 此方法用于移动元素到指定坐标，可以自定义沿X轴或Y轴移动，自定义单步移动距离百分比和单步移动时间
 *
 * @parameter elementID：需要移动的块的ID
 * @parameter moveType：移动的类型，x表示横向移动，y表示纵向移动，xy表示同时横纵向移动
 * @parameter stepX：此次触发要移动的X轴距离
 * @parameter stepY：此次触发要移动的Y轴距离
 * @parameter stepDis：每一次timeOut的移动距离百分比，用小数表示
 * @parameter stepTime：每一次timeOut的时间
 *
 * @return true:表示移动完成
 * */
function moveElementWith(elementID, moveType, stepX, stepY, stepDis, stepTime){
	var elementToMove = document.getElementById(elementID);
	//获取当前X轴坐标
	var elementX = parseInt(elementToMove.style.marginLeft);
	//获取当前Y轴坐标
	var elementY = parseInt(elementToMove.style.marginTop);
	//获取这个元素的高度值
	var elementH = parseInt(elementToMove.scrollHeight) - 620;
	//alert(elementH);

	var targetX = elementX + stepX;
	var targetY = elementY + stepY;

	//如果距离顶部为0但是用户还在往下滑，则弹回去0
	if(elementY > -stepY && stepY > 0){
		var repeat = "moveElementTo('" + elementID + "','" + moveType + "'," + targetX + "," + 0 + "," + stepDis + "," + 50 + ")";
		elementToMove.movement = setTimeout(repeat, stepTime);
	}

	//如果距离底部为0但是用户还在往上滑，则弹回去
	if(elementY < -elementH && stepY < 0){
		var repeat = "moveElementTo('" + elementID + "','" + moveType + "'," + targetX + "," + -elementH + "," + stepDis + "," + 50 + ")";
		elementToMove.movement = setTimeout(repeat, stepTime);
	}

	//循环单次移动，形成动画效果
	var repeat = "moveElementTo('" + elementID + "','" + moveType + "'," + targetX + "," + targetY + "," + stepDis + "," + stepTime + ")";
	elementToMove.movement = setTimeout(repeat, stepTime);
}