/**
 * Author: Baoxu
 * Date:   13-3-20
 * Time:   下午3:47
 */

//定义一些常量
var LOG_INFO = "BAOXU-INFO", //Info的log前缀
	LOG_TOUCH = "BAOXU-TOUCH"; //Touch的log前缀

//触摸过程中的一个变量集
var TouchOBJ = {
		startX:0, //触摸开始的X坐标
		startY:0, //触摸开始的Y坐标
		startT:0, //触摸开始的时间戳
		disX:0, //触摸在X轴上的变化值
		disY:0, //触摸在Y轴上的变化值
		disT:0, //此次触摸距离开始触摸的时间长度
		scroll:0, //此次触摸属于上下滚动还是左右拖动，上下为1，左右为-1
		direcX:0, //触摸在X轴移动的方向，向右为1，向左为-1
		direcY:0 //触摸在Y轴移动的方向，向下为1，向上为-1
	},

//触摸设置参数集
	TouchSET = {
		criTime:50, //设置临界时间，如果用户触摸屏幕的操作是在这个时间之内的话，元素一次性滑动到位
		criDistX:200, //设置X轴临界距离，如果用户触摸操作超过这个距离，元素要继续滑动到位
		criDistY:80 //设置Y轴临界距离，如果用户下拉页面超过这个距离，添加模块要继续显示出来
	},

//元素变换移动的过程中的参数
	TransARG = {
		translation:"",
		transform:""
	};


/*****************************************************************/
/**                        函数执行起点                           **/
/*****************************************************************/

addLoadEvent(todo);

/**
 * 页面加载完成之后需要立即执行的函数或者语句
 * @name todo
 */
function todo(){
	bindEvent();
}

/**
 * 事件的全局委派
 * @name bindEvent
 */
function bindEvent(){
	//全局点击事件的代理委派
	EventUtil.addHandler(document, "click", function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var event_tag = target.dataset["eventTag"] ? target.dataset["eventTag"] : target.getAttribute("data-event-tag");

		switch(event_tag){
			case "et_test_touch":
				document.getElementById("test_out").className = "mmm";
				//alert("ddd");
				break;
		}
	});

	//全局触摸开始事件的代理委派
	EventUtil.addHandler(document, "touchstart", function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var event_tag = target.dataset["eventTag"] ? target.dataset["eventTag"] : target.getAttribute("data-event-tag");

		switch(event_tag){
			case "et_test_touch":
				onTouchStart(event);
				break;
		}
	});

	//全局触摸滑动事件的代理委派
	EventUtil.addHandler(document, "touchmove", function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var event_tag = target.dataset["eventTag"] ? target.dataset["eventTag"] : target.getAttribute("data-event-tag");

		switch(event_tag){
			case "et_test_touch":
				onTouchMove(event);
				break;
		}
	});

	//全局触摸结束事件的代理委派
	EventUtil.addHandler(document, "touchend", function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var event_tag = target.dataset["eventTag"] ? target.dataset["eventTag"] : target.getAttribute("data-event-tag");

		switch(event_tag){
			case "et_test_touch":
				onTouchEnd(event);
				break;
		}
	});
}


/*****************************************************************/
/**                     Touch事件处理模块                         **/
/*****************************************************************/
/**
 * 触摸开始执行的事件
 * @name onTouchStart
 * @param {Object} e 传入触摸事件关联的对象
 */
function onTouchStart(e){
	//记录触摸开始的坐标与时间戳
	TouchOBJ.startX = e["touches"][0].pageX;
	TouchOBJ.startY = e["touches"][0].pageY;
	TouchOBJ.startT = Number(new Date());
	//log
	baoxuLog(LOG_TOUCH, "触摸事件开始");
}

/**
 * 手指移动的过程中执行的事件
 * @name onTouchMove
 * @param {Object} e 传入触摸事件关联的对象
 */
function onTouchMove(e){
	//当次触摸发生时，X轴，Y轴，时间的变化值
	TouchOBJ.disX = e["touches"][0].pageX - TouchOBJ.startX;
	TouchOBJ.disY = e["touches"][0].pageY - TouchOBJ.startY;
	TouchOBJ.disT = Number(new Date()) - TouchOBJ.startT;
	//判断是上下滚动还是左右拖拽
	if(!TouchOBJ.scroll){
		if((TouchOBJ.disX && !TouchOBJ.disY) || (TouchOBJ.disX / TouchOBJ.disY > 2)){
			TouchOBJ.scroll = -1;
		}else if((!TouchOBJ.disX && TouchOBJ.disY) || (TouchOBJ.disY / TouchOBJ.disX > 2)){
			TouchOBJ.scroll = 1;
		}
	}
	//判断左右上下拖拽的方向
	TouchOBJ.direcX = (TouchOBJ.disX > 0) ? 1 : -1;
	TouchOBJ.direcY = (TouchOBJ.disY > 0) ? 1 : -1;

	if(TouchOBJ.scroll == -1){
		//如果是左右拖拽，需要阻止系统默认的滚动事件
		event.preventDefault();
		//在此实现跟随手指的功能
		followFinger(e, 1);
		//log
		baoxuLog(LOG_TOUCH, "Touch Move事件执行中，时间:" + TouchOBJ.disT + " X距离:" + TouchOBJ.disX + " Y距离:" + TouchOBJ.disY);
	}else if(TouchOBJ.scroll == 1){
		var toTop = getScrollTop();
		//如果是上下拖拽，不用阻止系统默认事件
		if(!toTop && (TouchOBJ.direcY == 1)){
			//如果页面已经到顶了且用户还在向下拉，在此实现跟随手指显示新建模块的操作
			followFinger(e, 2);
			//log
			baoxuLog(LOG_TOUCH, "页面已经到顶了，还在往下拉，ScrollTop:" + toTop + " Y轴方向:" + TouchOBJ.direcY);
		}
	}
}

/**
 * 手指离开的时候执行的事件
 * @name onTouchEnd
 * @param {Object} e 传入触摸事件关联的对象
 */
function onTouchEnd(e){
	//如果scroll标志位为-1，说明是横向拖拽
	if(TouchOBJ.scroll == -1){
		//如果用户的触摸时间小于500毫秒，或者用户拖动的距离已经超过定义的临界距离，直接完成元素的左右滑动
		if(TouchOBJ.disT < TouchSET.criTime || Math.abs(TouchOBJ.disX) > TouchSET.criDistX){
			//log
			baoxuLog(LOG_TOUCH, "因为时间短，或者距离超过临界值，所以一步移动到位");
			//在此实现操作到位应该执行的功能

			//在此实现食物块移回原位的功能
			moveBack(e, 1);
		}else{
			//log
			baoxuLog(LOG_TOUCH, "因为时间长而且没有移到临界位置，所以移回原位");
			//在此实现食物块移回原位的功能
			moveBack(e, 1);
		}
	}else if(TouchOBJ.scroll == 1){
		var toTop = getScrollTop();
		//上下拖拽,页面已经在顶部，继续下拉
		if(!toTop && (TouchOBJ.direcY == 1)){
			//拉动的距离超过临界值
			if(Math.abs(TouchOBJ.disY) > TouchSET.criDistY){
				//在此实现操作到位应该执行的功能

				//log
				baoxuLog(LOG_TOUCH, "距离已经超过临界值，展示新建模块");
			}else{
				//log
				baoxuLog(LOG_TOUCH, "没有移到临界位置，所以移回原位");
				//在此实现页面移回顶部的功能
				moveBack(e, 2);
			}
		}else{
			baoxuLog(LOG_INFO, "拖拽的方向向下或者是页面没有在顶部，不触发操作");
		}
	}

	//重置标志位
	TouchOBJ.scroll = 0;
	//log
	baoxuLog(LOG_TOUCH, "触摸事件结束");
}


/*****************************************************************/
/**                    元素移动事件处理模块                        **/
/*****************************************************************/
/**
 * 手指在屏幕滑动的过程中让元素跟随手指
 * @name followFinger
 * @param {Object} e 传入触摸事件关联的对象
 * @param {Number} type 跟随手指事件的种类，1-对单个食物块左右滑动的跟随，2-对页面下拉新建的跟随
 */
function followFinger(e, type){
	//被触摸的元素
	var targetElm = e["target"];
	switch(type){
		//单个食物块左右滑动的跟随
		case 1:
			targetElm.style.webkitTransition = "0s";
			targetElm.style.webkitTransform = "translate3d(" + TouchOBJ.disX + "px, 0px, 0px)";
			break;
		//对页面下拉新建的跟随
		case 2:
			document.getElementById("test_xiala").style.webkitTransitionDuration = "0s";
			document.getElementById("test_xiala").style.height = TouchOBJ.disY + "px";
			baoxuLog(LOG_TOUCH, "跟随手指");
			break;
		default :
			baoxuLog(LOG_INFO, "调用跟随手指函数的type参数有错误，跟随功能取消！");
			break;
	}

}

/**
 * 元素被释放之后弹回原位
 * @name followFinger
 * @param {Object} e 传入触摸事件关联的对象
 * @param {Number} type 传入触摸事件关联的对象
 */
function moveBack(e, type){
	//被触摸的元素
	var targetElm = e["target"];
	switch(type){
		//单个食物块左右滑动的跟随
		case 1:
			targetElm.style.webkitTransition = "0.5s";
			targetElm.style.webkitTransform = "translate3d(0px, 0px, 0px)";
			break;
		//对页面下拉新建的跟随
		case 2:
			baoxuLog(LOG_TOUCH, "页面移回顶部");
			break;
		default :
			baoxuLog(LOG_INFO, "调用moveBack函数的type参数有错误，跟随功能取消！");
			break;
	}

}