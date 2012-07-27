/**
 * Author: Baoxu
 * Date:   12-7-3
 * Time:   上午8:41
 */

//定义常量
var REQUEST_HOST = "http://localhost/"

addLoadEvent(start);

function start(){
	//alert("baoxu");
	getSoftware();
}


function getSoftware(){
	var request = getHTTPObject();
	var requestUrl = REQUEST_HOST + "baoxu-project/03-recommend-contrast/server/cdr.php?passport=chbaoxu@163.com&size=100";
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
	var pageTableBodyTR = pageTableBody.getElementsByTagName("tr");

	//填充模板，填充页面内容
	var createTR = baidu.template("tpl-software-list-item", softwareData);
	pageTableBody.innerHTML += createTR;

	//为表格上色
	cbxColorTable("main-table", "#FFF", "#FAFAFA", "#DBEAF9", "green", "#000", "#000", 1);

	//为表态的按钮添加事件
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
				var index = getObjectIndex(attitudeLink,this);
				bindForAttitudeBtn(index);
			}
		}
	}
}

//按钮的绑定事件
function bindForAttitudeBtn(index){

	switch(index){
		case 0:
			alert("0");
			break;
		case 1:
			alert("1");
			break;
		case 2:
			alert("2");
			break;
	}
	return false;
}


