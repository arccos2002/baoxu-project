/**
 * Author: Baoxu
 * Date:   12-7-27
 * Time:   上午8:41
 */


//定义全局变量
var soft_all = 0, att_all = 0, att_yes = 0, att_fuck = 0, att_no = 0;


//页面加载之后，执行事件
addLoadEvent(start);

function start(){
	console.log("Baoxu:开始运行");
	checkCookie();
	logout_init();
}

//检查cookie是否存在，如果存在，直接展示列表，如果不存在，重新登录
function checkCookie(){
	var cookiePass = getCookie("baoxu-recommend-contrast-cookie-pass");
	if(cookiePass){
		console.log("Cookie:有cookie," + cookiePass);
		getSoftware(cookiePass, "");
	}else{
		console.log("Cookie:没有cookie");
		login();
	}
}

function addCookie(objName, objValue, objHours){//添加cookie
	var str = objName + "=" + escape(objValue);
	if(objHours > 0){//为0时不设定过期时间，浏览器关闭时cookie自动消失
		var date = new Date();
		var ms = objHours * 3600 * 1000;
		date.setTime(date.getTime() + ms);
		str += "; expires=" + date.toGMTString();
	}
	document.cookie = str;
	console.log("Cookie:cookie添加成功！");
}

function getCookie(objName){//获取指定名称的cookie的值
	var arrStr = document.cookie.split("; ");
	for(var i = 0 ; i < arrStr.length ; i++){
		var temp = arrStr[i].split("=");
		if(temp[0] == objName) return escape(temp[1]);
	}
}

function delCookie(objName) {
	var date = new Date();
	date.setTime(date.getTime() - 10000);
	document.cookie = objName + "=a; expires=" + date.toGMTString();
}


//登录处理
function login(){
	var login_table = document.getElementById("login");
	login_table.style.display = "";
	var start_btn = document.getElementById("start");
	start_btn.onclick = function(){
		var domain = document.getElementById("domainSelect").value;
		var user_passport = document.getElementById("passport").value + domain;
		var user_name = document.getElementById("name").value;
		document.getElementById("start").parentElement.innerHTML = "<img src = 'images/loading.gif' /> 请稍候";
		//alert(user_passport);
		if(user_passport){
			getSoftware(user_passport, user_name);
		}else{
			document.getElementById("passport-e").innerHTML = "不能为空";
		}
		return false;
	}
}

//退出登录
function logout_init(){
	var logout_div = document.getElementById("bottom-user");
	var logout_btn = document.getElementById("bottom-logout-btn");
	logout_btn.onclick = function(){
		delCookie("baoxu-recommend-contrast-cookie-pass");
		logout_div.style.display = "none";
		window.top.location.reload();
	}
}


//异步获取用户信息和用户推荐列表
function getSoftware(thePassport, theUserName){
	var request = getHTTPObject();
	var requestUrl = "/baoxu-project/03-recommend-contrast/server/cdr.php?passport=" + thePassport + "&size=100&username=" + theUserName;
	if(request){
		//异步处理
		request.open("GET", requestUrl, true);
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				//请求成功之后要做的操作
				var requestResult = request.responseText;
				//console.log(requestResult);
				//转化为标准JSON对象
				requestResult = JSON.parse(requestResult);
				//验证数据
				varifyData(requestResult);
				return true;
			}
		};
		request.send(null);
	}else{
		alert("浏览器不支持XMLHttpRequest");
	}
}


//验证服务器给回的数据
function varifyData(requestResult){
	switch(requestResult.nowSta){
		case "success":
			addCookie("baoxu-recommend-contrast-cookie-pass", requestResult.passport, 0);
			var logout_div = document.getElementById("bottom-user");
			logout_div.style.display = "";
			var log_user = document.getElementById("bottom-passport");
			log_user.innerHTML = requestResult.passport;
			generatTable(requestResult);
			getAttitudeCount(requestResult);
			break;
		case "error":
			console.error("Varify:验证数据阶段出错！");
			fixError(requestResult);
			break;
	}
}

//修正验证的数据问题
function fixError(requestResult){
	switch(requestResult.class){
		case "CBX_ERROR_001":
			alert(requestResult.cause);
			break;
		case "CBX_ERROR_002":
			alert(requestResult.cause);
			break;
	}
}

//初始化用户满意数
function getAttitudeCount(softwareData){
	soft_all = softwareData.software.length;
	for(var i = 0 ; i < soft_all ; i++){
		//console.log(softwareData.software[i].attitude);
		switch(softwareData.software[i].attitude){
			case "0":
				break;
			case "1":
				att_all++;
				att_no++;
				break;
			case "2":
				att_all++;
				att_fuck++;
				break;
			case "3":
				att_all++;
				att_yes++;
				break;
		}

		//LOG记录当前的数目情况
		//console.log("att_all:" + att_all);
		//console.log("att_yes:" + att_yes);
		//console.log("att_no:" + att_no);
		//console.log("att_fuck:" + att_fuck);
		dataPercent(soft_all, att_all, att_yes, att_no, att_fuck);
	}
}

//计算数据比例
function dataPercent(softAll, attAll, attYes, attNo, attFuck){
	var nowProcess = Math.ceil(100 * attAll / softAll);
	var yesPercent = attAll ? Math.round(100 * attYes / attAll) : 0;
	var noPercent = attAll ? Math.round(100 * attNo / attAll) : 0;
	var fuckPercent = attAll ? Math.round(100 * attFuck / attAll) : 0;

	document.getElementById("bottom-bar").style.width = nowProcess + "%";
	document.getElementById("bottom-bar").innerHTML = nowProcess + "%";
	document.getElementById("bottom-yes").innerHTML = yesPercent + "%";
	document.getElementById("bottom-fuck").innerHTML = noPercent + "%";
	document.getElementById("bottom-no").innerHTML = fuckPercent + "%";

	if(attAll == softAll){
		document.getElementById("baoxu-info").innerHTML = "完成了！谢谢参与！！";
	}else{
		document.getElementById("baoxu-info").innerHTML = "加油！";
	}
}

//生成软件表格
function generatTable(softwareData){

	//登录框隐藏，显示列表
	document.getElementById("login").style.display = "none";
	document.getElementById("main-table").style.display = "";

	var pageTable = document.getElementById("main-table");
	pageTable.style.display = "";
	var pageTableBody = pageTable.getElementsByTagName("tbody")[0];

	//填充模板，填充页面内容
	var createTR = baidu.template("tpl-software-list-item", softwareData);
	pageTableBody.innerHTML = createTR;

	//为表格上色
	cbxColorTable("main-table", "#FFF", "#F5F5F5", "#DBEAF9", "green", "#000", "#000", 1);

	//为用户表态的按钮添加事件
	activeAttitude();
}

//按钮添加事件
function activeAttitude(){
	var pageTable = document.getElementById("main-table");
	var pageTableBody = pageTable.getElementsByTagName("tbody")[0];
	var pageTableBodyTR = pageTableBody.getElementsByTagName("tr");
	var hoverIcon = document.getElementById("hover-icon");
	for(var i = 0 ; i < pageTableBodyTR.length ; i++){
		var pageTableBodyTD = pageTableBodyTR[i].getElementsByTagName("td");
		//该行第2列已安装软件的链接，鼠标移过时显示icon
		var installLink = pageTableBodyTD[1].getElementsByTagName("a")[0];
		/*installLink.onmouseover = function(event){
		 var mouseX = event.clientX+10;
		 var mouseY = event.clientY+15;
		 var iconUrl = installLink.getAttribute("icon");
		 //alert(mouseX+";"+mouseY);
		 hoverIcon.style.display = "";
		 hoverIcon.style.top = mouseY+"px";
		 hoverIcon.style.left = mouseX+"px";
		 hoverIcon.getElementsByTagName("img")[0].src = iconUrl;
		 }
		 installLink.onmouseout = function(event){
		 hoverIcon.style.display = "none";
		 hoverIcon.getElementsByTagName("img")[0].src = "";
		 }*/

		//该行第3列推荐软件的链接，鼠标移过时显示icon
		var recommendLink = pageTableBodyTD[2].getElementsByTagName("a")[0];
		/*recommendLink.onmouseover = function(event){
		 var mouseX = event.clientX+10;
		 var mouseY = event.clientY+15;
		 var iconUrl = recommendLink.getAttribute("icon");
		 //alert(mouseX+";"+mouseY);
		 hoverIcon.style.display = "";
		 hoverIcon.style.top = mouseY+"px";
		 hoverIcon.style.left = mouseX+"px";
		 hoverIcon.getElementsByTagName("img")[0].src = iconUrl;
		 }
		 recommendLink.onmouseout = function(event){
		 hoverIcon.style.display = "none";
		 hoverIcon.getElementsByTagName("img")[0].src = "";
		 }*/

		var attitudeLink = pageTableBodyTD[3].getElementsByTagName("a");
		for(var t = 0 ; t < attitudeLink.length ; t++){
			//为按钮添加click事件
			attitudeLink[t].onclick = function(){
				var nowTableTD = this.parentElement;
				var nowTableTR = nowTableTD.parentElement;
				var idTableTD = nowTableTR.getElementsByTagName("td")[0];
				var nowRecomId = idTableTD.textContent;
				var nowAttitudeLink = this.parentElement.getElementsByTagName("a");
				var index = getObjectIndex(nowAttitudeLink, this);
				bindForAttitudeBtn(index, nowTableTD, nowRecomId);
				return false;
			}
		}
	}
}

//按钮的绑定事件
function bindForAttitudeBtn(theIndex, theTD, theTecomId){
	//显示加载中
	theTD.innerHTML = "<img class='result-load' src='images/loading.gif' />";
	//提交结果
	postAttitude(theTecomId, theIndex + 1, theTD);
}

//异步提交结果
function postAttitude(nowRecomId, nowAttitude, nowTD){
	var request = getHTTPObject();
	var requestUrl = "/baoxu-project/03-recommend-contrast/server/post.php?recommendid=" + nowRecomId + "&attitude=" + nowAttitude;
	if(request){
		//异步处理
		request.open("GET", requestUrl, true);
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				//请求成功之后要做的操作
				var requestResult = request.responseText;

				//返回成功
				if(requestResult == "success"){
					switch(nowAttitude){
						case 1:
							//alert("0");
							nowTD.innerHTML = "<i class = 'no result' title = '你认为很不准'>不靠谱</i>";
							//不靠谱数目加1
							att_no++;
							break;
						case 2:
							//alert("1");
							nowTD.innerHTML = "<i class = 'fuck result' title = '你认为一般般'>一般般</i>";
							//一般般数目加1
							att_fuck++;
							break;
						case 3:
							//alert("2");
							nowTD.innerHTML = "<i class = 'yes result' title = '你认为很准'>很靠谱</i>";
							//靠谱数目加1
							att_yes++;
							break;
					}
					//表过态的数目加1
					att_all++;

					//重绘底部通知区
					dataPercent(soft_all, att_all, att_yes, att_no, att_fuck);

					//LOG记录当前的数目情况
					console.log("att_all:" + att_all);
					console.log("att_yes:" + att_yes);
					console.log("att_no:" + att_no);
					console.log("att_fuck:" + att_fuck);
				}else{
					//返回错误
					nowTD.innerHTML = "<i class = 'no result-error' title = '内部错误'>出错了</i>";
				}
				return true;
			}
		};
		request.send(null);
	}else{
		alert("浏览器不支持XMLHttpRequest");
	}
}

