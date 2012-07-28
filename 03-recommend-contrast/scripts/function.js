/**
 * Author: Baoxu
 * Date:   12-7-27
 * Time:   上午8:41
 */

//定义常量
var REQUEST_HOST = "http://localhost/"

addLoadEvent(start);

function start(){
	//alert("baoxu");
	getSoftware();
}

//异步获取用户信息和用户推荐列表
function getSoftware(){
	var request = getHTTPObject();
	var requestUrl = REQUEST_HOST + "baoxu-project/03-recommend-contrast/server/cdr.php?passport=chbaoxu@163.com&size=100&username=保需";
	if(request){
		//异步处理
		request.open("GET", requestUrl, true);
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				//请求成功之后要做的操作
				var requestResult = request.responseText;
				//转化为标准JSON对象
				requestResult = JSON.parse(requestResult);
				//alert(requestResult);
				//生成表格
				generatTable(requestResult);
				return true;
			}
		};
		request.send(null);
	}else{
		alert("浏览器不支持XMLHttpRequest");
	}
}

//生成软件表格
function generatTable(softwareData){
	var pageTable = document.getElementById("main-table");
	var pageTableBody = pageTable.getElementsByTagName("tbody")[0];

	//填充模板，填充页面内容
	var createTR = baidu.template("tpl-software-list-item", softwareData);
	pageTableBody.innerHTML += createTR;

	//为表格上色
	cbxColorTable("main-table", "#FFF", "#FAFAFA", "#DBEAF9", "green", "#000", "#000", 1);

	//为用户表态的按钮添加事件
	activeAttitude();
}

//按钮添加事件
function activeAttitude(){
	var pageTable = document.getElementById("main-table");
	var pageTableBody = pageTable.getElementsByTagName("tbody")[0];
	var pageTableBodyTR = pageTableBody.getElementsByTagName("tr");

	for(var i = 0 ; i < pageTableBodyTR.length ; i++){
		var pageTableBodyTD = pageTableBodyTR[i].getElementsByTagName("td")[3];
		var attitudeLink = pageTableBodyTD.getElementsByTagName("a");
		for(var t = 0 ; t < attitudeLink.length ; t++){
			//为按钮添加click事件
			attitudeLink[t].onclick = function(){
				var nowTableTD = this.parentElement;
				var nowTableTR = nowTableTD.parentElement;
				var idTableTD = nowTableTR.getElementsByTagName("td")[0];
				var nowRecomId = idTableTD.textContent;
				var nowAttitudeLink = this.parentElement.getElementsByTagName("a");
				var index = getObjectIndex(nowAttitudeLink,this);
				bindForAttitudeBtn(index,nowTableTD,nowRecomId);
				return false;
			}
		}
	}
}

//按钮的绑定事件
function bindForAttitudeBtn(theIndex,theTD,theTecomId){
	//显示加载中
	theTD.innerHTML = "<img class='result-load' src='images/loading.gif' />";
	//提交结果
	postAttitude(theTecomId,theIndex+1,theTD);
}

//异步提交结果
function postAttitude(nowRecomId,nowAttitude,nowTD){
	var request = getHTTPObject();
	var requestUrl = REQUEST_HOST + "baoxu-project/03-recommend-contrast/server/post.php?recommendid="+nowRecomId+"&attitude="+nowAttitude;
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
							nowTD.innerHTML = "<a class = 'no result' title = '你认为很不准'>不靠谱</a>";
							break;
						case 2:
							//alert("1");
							nowTD.innerHTML = "<a class = 'fuck result' title = '你认为没感觉'>没感觉</a>";
							break;
						case 3:
							//alert("2");
							nowTD.innerHTML = "<a class = 'yes result' title = '你认为很准'>很靠谱</a>";
							break;
					}
				}else{
					//返回错误
					nowTD.innerHTML = "<a class = 'no result-error' title = '内部错误'>出错了</a>";
				}
				return true;
			}
		};
		request.send(null);
	}else{
		alert("浏览器不支持XMLHttpRequest");
	}
}

