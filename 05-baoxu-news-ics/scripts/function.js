/**
 * Author: Baoxu
 * Date:   12-10-29
 * Time:   下午12:09
 */

//定义一些要用的常量
var LOG_INFO = "BAOXU-LOG-INFO: ";

//将TODO事项加入页面加载完成之后立即处理
addLoadEvent(todo);
//TODO函数中包括要立即处理的函数
function todo(){
	console.log(LOG_INFO + "Starting, just do it!");//LOG
	initViewPort();
	changeBotLayerNavi();
	bindAllObject();
}

//初始化页面的高宽以适合所有屏幕的显示
function initViewPort(){
	//获取屏幕信息
	var client_width = getClientInfo()["width"];
	var client_height = getClientInfo()["height"];
	console.log(LOG_INFO + "ViewSize is " + client_width + " & " + client_height);//LOG

	//页面底层图层全比例显示
	document.getElementById("bot-layer").style.width = client_width;
	document.getElementById("bot-layer").style.height = client_height;
	console.log(LOG_INFO + "Bottom layer is full of page");//LOG
	//底层导航，导航遮罩阴影，底层个人信息，个人信息遮罩阴影校正高度
	document.getElementById("bot-layer-navi").style.height = client_height + "px";
	document.getElementById("bot-layer-navi-shadow").style.height = client_height + "px";
	document.getElementById("bot-layer-info-shadow").style.height = client_height + "px";
	document.getElementById("bot-layer-info").style.height = client_height + "px";
	console.log(LOG_INFO + "Correct bottom layer navi and info's heigh with full page");//LOG
	//底层个人信息部分校正宽度
	document.getElementById("bot-layer-info").style.width = client_width - 96 + "px";
	console.log(LOG_INFO + "Correct bottom layer info's width with full page but navi");//LOG
	//上层信息主图层校正宽度
	document.getElementById("main-layer").style.width = client_width + "px";
	console.log(LOG_INFO + "Correct main layer width with full page");//LOG
}

//需要添加事件的对象都写在这里
function bindAllObject(){
	//左上角的频道切换按钮的点击事件，点击后主图层向右推开
	document.getElementById("main-layer-action-bar-back").getElementsByTagName("a")[0].onclick = mainLayerMoveToRight;
	//右上角的用户及设置按钮的点击事件，点击后主图层向左推开
	document.getElementById("main-layer-action-bar-user").getElementsByTagName("a")[0].onclick = mainLayerMoveToLeft;
}


//主页面图层向右移动，即点击了左上角的按钮的效果
function mainLayerMoveToRight(){
	var theBar = document.getElementById("main-layer-action-bar-back").getElementsByTagName("a")[0];
	if(document.getElementById("main-layer").style.marginLeft == "0px"){
		moveElementWith("main-layer","absolute",96,0.2,10,-1);
		moveElementWith("main-layer-action-bar","fixed",96,0.2,10,0);
		theBar.className = "current";
		//LOG
		console.log(LOG_INFO + "Main layer moved to the right,and back button style is current");//LOG
	}else{
		moveElementWith("main-layer","absolute",-96,0.2,10,1);
		moveElementWith("main-layer-action-bar","fixed",-96,0.2,10,0);
		theBar.className = "";
		//LOG
		console.log(LOG_INFO + "Main layer go home, and back button style is normal");//LOG
	}
}

//主页面图层向左移动，即点击了右上角的按钮的效果
function mainLayerMoveToLeft(){
	var theBar = document.getElementById("main-layer-action-bar-user").getElementsByTagName("a")[0];
	if(document.getElementById("main-layer").style.marginLeft == "0px"){
		moveElementWith("main-layer","absolute",-384,0.2,10,0);
		moveElementWith("main-layer-action-bar","fixed",-384,0.2,10,0);
		theBar.className = "current";
		//LOG
		console.log(LOG_INFO + "Main layer moved to the left,and user button style is current");//LOG
	}else{
		moveElementWith("main-layer","absolute",384,0.2,10,0);
		moveElementWith("main-layer-action-bar","fixed",384,0.2,10,0);
		theBar.className = "";
		//LOG
		console.log(LOG_INFO + "Main layer go home, and user button style is normal");//LOG
	}
}

//页面底层左栏导航按钮点击的样式变化
function changeBotLayerNavi(){
	var bot_layer_navi_li = document.getElementById("navi-list").getElementsByTagName("li");
	for(var i = 0; i<bot_layer_navi_li.length; i++){
		bot_layer_navi_li[i].getElementsByTagName("a")[0].onclick = function(){
			//某个按钮被点击后，将所有的按钮样式置空
			for(var t = 0; t<bot_layer_navi_li.length; t++){
				bot_layer_navi_li[t].getElementsByTagName("a")[0].className = "";
			}
			console.log(LOG_INFO + "All navi button style is normal");//LOG
			//将被点击按钮的样式置为current
			this.className = "current";
			setTimeout(mainLayerMoveToRight,200);
			console.log(LOG_INFO + "The navi button who is clicked style is current and main layer goes home");//LOG
		}
	}
}