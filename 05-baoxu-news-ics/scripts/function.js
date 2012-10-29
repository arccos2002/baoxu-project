/**
 * Author: Baoxu
 * Date:   12-10-29
 * Time:   下午12:09
 */

addLoadEvent(test);

function test(){
	init();
}

function init(){

	var client_width = getClientInfo()["width"];
	var client_height = getClientInfo()["height"];

	console.log("页面宽高：" + client_width + ":" + client_height);

	var bot_layer = document.getElementById("bot-layer");
	bot_layer.style.width = client_width;
	bot_layer.style.height = client_height;

	document.getElementById("bot-layer-navi").style.height = client_height + "px";
	document.getElementById("bot-layer-navi-shadow").style.height = client_height + "px";
	document.getElementById("bot-layer-info-shadow").style.height = client_height + "px";
	document.getElementById("bot-layer-info").style.height = client_height + "px";

	document.getElementById("bot-layer-info").style.width = client_width - 96 + "px";
}
