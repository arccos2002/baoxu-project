/**
 * Author: Baoxu
 * Date:   12-10-29
 * Time:   下午12:09
 */

addLoadEvent(todo);

function todo(){
	initViewPort();
	changeBotLayerNavi();
	bindAllObject();
}

//初始化页面的高宽以适合所有屏幕的显示
function initViewPort(){
	//获取屏幕信息
	var client_width = getClientInfo()["width"];
	var client_height = getClientInfo()["height"];

	console.log("页面宽高：" + client_width + ":" + client_height);
	//alert("页面宽高：" + client_width + ":" + client_height);

	//页面底层图层全比例显示
	document.getElementById("bot-layer").style.width = client_width;
	document.getElementById("bot-layer").style.height = client_height;
	//底层导航，导航遮罩阴影，底层个人信息，个人信息遮罩阴影校正高度
	document.getElementById("bot-layer-navi").style.height = client_height + "px";
	document.getElementById("bot-layer-navi-shadow").style.height = client_height + "px";
	document.getElementById("bot-layer-info-shadow").style.height = client_height + "px";
	document.getElementById("bot-layer-info").style.height = client_height + "px";
	//底层个人信息部分校正宽度
	document.getElementById("bot-layer-info").style.width = client_width - 96 + "px";

	document.getElementById("main-layer").style.width = client_width + "px";
}

//需要添加时间的对象都写在这里
function bindAllObject(){
	document.getElementById("main-layer-action-bar-back").getElementsByTagName("a")[0].onclick = function(){
		if(document.getElementById("main-layer").style.marginLeft == "0px"){
			moveElementWith("main-layer","absolute",96,0.2,10,-1);
			moveElementWith("main-layer-action-bar","fixed",96,0.2,10,0);
		}else{
			moveElementWith("main-layer","absolute",-96,0.2,10,1);
			moveElementWith("main-layer-action-bar","fixed",-96,0.2,10,0);
		}
	}

	document.getElementById("main-layer-action-bar-user").getElementsByTagName("a")[0].onclick = function(){
		if(document.getElementById("main-layer").style.marginLeft == "0px"){
			moveElementWith("main-layer","absolute",-384,0.2,10,0);
			moveElementWith("main-layer-action-bar","fixed",-384,0.2,10,0);
		}else{
			 moveElementWith("main-layer","absolute",384,0.2,10,0);
			moveElementWith("main-layer-action-bar","fixed",384,0.2,10,0);
		}
	}
}

function lockMainLayer(){
	document.getElementById("main-layer").style.marginLeft = "96px";
}

function unLockMainLayer(){
	document.getElementById("main-layer").style.marginLeft = "0px";
}

//页面底层导航按钮点击效果
function changeBotLayerNavi(){
	var bot_layer_navi_li = document.getElementById("navi-list").getElementsByTagName("li");
	console.log("li的个数:" + bot_layer_navi_li.length);
	for(var i = 0; i<bot_layer_navi_li.length; i++){
		bot_layer_navi_li[i].getElementsByTagName("a")[0].onclick = function(){
			//某个按钮被点击后，将所有的按钮样式置空
			for(var t = 0; t<bot_layer_navi_li.length; t++){
				bot_layer_navi_li[t].getElementsByTagName("a")[0].className = "";
			}
			//将被点击按钮的样式置为current
			this.className = "current";
		}
	}
}