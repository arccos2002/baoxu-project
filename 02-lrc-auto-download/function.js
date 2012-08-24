/**
 * Author: Baoxu
 * Date:   12-7-6
 * Time:   下午3:26
 */

addOnloadEvent(test);

//定义URL跨域地址
//公司用
var CROSS_DOMAIN_REQUEST = "http://localhost/baoxu-project/02-lrc-auto-download/cdr.php?type=gma&"
//家用
//var CROSS_DOMAIN_REQUEST = "http://localhost/lrc/cdr.php?type=gma&"

//歌曲列表
var THE_SONG_LIST = new Array();
var THE_SONG_I = 0;
var THE_SUCCESS_COUNT = 0;
var THE_ERROE_COUNT = 0;
var ERROR_LIST = new Array();

function test(){
	THE_SONG_LIST = getSongList("list.xml");
	if(THE_SONG_I < THE_SONG_LIST.length){
		getSingleLrc(THE_SONG_LIST[THE_SONG_I].artist, THE_SONG_LIST[THE_SONG_I].song);
	}else{
		alert("完成，成功" + THE_SUCCESS_COUNT + "个，失败" + THE_ERROE_COUNT + "个。");
	}
}

//异步获取歌词文件,保存并报告效果
function getSingleLrc(artist, songName){
	var request = getHTTPObject();
	if(request){
		request.open("GET", CROSS_DOMAIN_REQUEST + "artist=" + artist + "&title=" + songName, true);
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				//请求成功之后要做的操作
				var getSingleLrcResult = request.responseText;
				var getSingleLrcResultArray = getSingleLrcResult.split("<br>");
				getSingleLrcResultArray.pop();
				var s = 0;
				for(var t = 0 ; t < getSingleLrcResultArray.length ; t++){

					if(getSingleLrcResultArray[t].length > 35){
						getSingleLrcResultArray[t] = "";
					}

					var searchFlag = getSingleLrcResultArray[t].indexOf("SUCCESS");
					if(searchFlag != -1){
						s++;
					}
				}
				if(s == 6){
					getSingleLrcResultArray.push("成功");
					THE_SUCCESS_COUNT++;
				}else{
					getSingleLrcResultArray.push("异常");
					THE_ERROE_COUNT++;
					var errorItem = "<item file=\"G:\\04_影音备份\\歌曲\\"+ artist + " - " + songName + ".mp3\"" +" title=\"" + artist + " - " + songName + "\"/>";
					ERROR_LIST.push(errorItem);
				}
				getSingleLrcResultArray.unshift(artist, songName);

				//报告结果
				fillResultTable(getSingleLrcResultArray);
				//alert(getSingleLrcResultArray[2]);
				return true;
			}
		};
		request.send(null);
	}else{
		alert("Sorry, your browser does not support XMLHttpRequest");
	}
}

//写入前台报表
function fillResultTable(result){
	var resultTable = document.getElementById("result_table");
	var resultTableBody = resultTable.getElementsByTagName("tbody")[0];
	var resultTR = document.createElement("tr");
	for(var i = 0 ; i < result.length ; i++){
		var resultTD = document.createElement("td");
		var resultTDText = document.createTextNode(result[i]);
		resultTD.appendChild(resultTDText);
		resultTR.appendChild(resultTD);
		if(result[result.length - 1] == "成功"){
			addClass(resultTD, "success");
		}else{
			addClass(resultTD, "error");
		}
	}
	resultTableBody.appendChild(resultTR);

	THE_SONG_I++;
	if(THE_SONG_I < THE_SONG_LIST.length){
		getSingleLrc(THE_SONG_LIST[THE_SONG_I].artist, THE_SONG_LIST[THE_SONG_I].song);
	}else{
		for(var p = 0;p<ERROR_LIST.length;p++){
			var resultTableFoot = resultTable.getElementsByTagName("tfoot")[0];
			var resultTableFootTR = document.createElement("tr");
			var resultTableFootTD = document.createElement("td");
			var resultTableFootTDText = document.createTextNode(ERROR_LIST[p]);
			resultTableFootTD.appendChild(resultTableFootTDText);
			resultTableFootTD.setAttribute("colspan","9");
			addClass(resultTableFootTD,"warning");
			resultTableFootTR.appendChild(resultTableFootTD);
			resultTableFoot.appendChild(resultTableFootTR);
		}
		var resultTableFoot = resultTable.getElementsByTagName("tfoot")[0];
		var resultTableFootTR = document.createElement("tr");
		var resultTableFootTD = document.createElement("td");
		var resultTableFootTDText = document.createTextNode("任务已完成，成功" + THE_SUCCESS_COUNT + "个，失败" + THE_ERROE_COUNT + "个。");
		resultTableFootTD.appendChild(resultTableFootTDText);
		resultTableFootTD.setAttribute("colspan","9");
		addClass(resultTableFootTD,"warning");
		resultTableFootTR.appendChild(resultTableFootTD);
		resultTableFoot.appendChild(resultTableFootTR);
		alert("完成，成功" + THE_SUCCESS_COUNT + "个，失败" + THE_ERROE_COUNT + "个。");
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

//从XML返回当中获取歌曲名称数组
function getSongList(list_file){
	var songsListXml = loadXML(list_file);
	//alert(songsListXml);
	var itemElements = songsListXml.documentElement.getElementsByTagName("item");
	var songList = new Array();
	for(var i = 0 ; i < itemElements.length ; i++){
		var singleSongName = itemElements[i].getAttribute("title");
		var singleInfo = singleSongName.split(" - ");
		singleInfo["artist"] = singleInfo[0];
		singleInfo["song"] = singleInfo[1];
		songList.push(singleInfo);
	}
	//alert(songList[5].artist);
	//alert(songList[5].song);
	return songList;
}

//针对两种浏览器，分别获取xmlDocument对象
function loadXML(xmlFile){
	var xmlDoc;
	if(window.ActiveXObject){
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.load(xmlFile);
	}else if(document.implementation && document.implementation.createDocument){
		xmlDoc = document.implementation.createDocument("", "", null);
		xmlDoc.async = false;
		xmlDoc.load(xmlFile);
	}else{
		alert("您的浏览器不支持XMLHttpRequest！");
	}
	return xmlDoc;
}

//通用函数，将新建的element插入某元素之后
function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}


//通用函数，将函数加到window的onload列表中
function addOnloadEvent(func){
	var old_onload = window.onload;
	if(typeof(old_onload) != "function"){
		window.onload = func;
	}else{
		window.onload = function(){
			old_onload();
			func();
		}
	}
}