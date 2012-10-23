/**
 * Author: Baoxu
 * Date:   12-7-3
 * Time:   上午8:41
 */


//定义一些常量
var CROSS_DOMAIN_PROXY = document.location.href + "cdr.php?";
var COLUMN_ID_ELEMENT = [
	{lolumnName:"头条", ntesID:"T1295501906343", elementID:"news-hot"},
	{lolumnName:"体育", ntesID:"T1295505916992", elementID:"news-sport"},
	{lolumnName:"娱乐", ntesID:"T1295506658957", elementID:"news-enterta"},
	{lolumnName:"财经", ntesID:"T1295505705196", elementID:"news-finan"},
	{lolumnName:"科技", ntesID:"T1295507084100", elementID:"news-tech"},
	{lolumnName:"军事", ntesID:"T1295505447897", elementID:"news-mili"}
];

//全局变量
var NOW_INDEX = 0;


addLoadEvent(test);

function test(){
	init();
	console.log("heihei");
}

//页面初始化函数
function init(){
	//添加导航的点击事件和方法
	newsNavFun();
	//进入时默认加载头条新闻栏目
	getNewsList(NOW_INDEX, 0, 20, "headline", "loadfirst");

}


//新闻页面下栏目导航点击时，切换栏目导航激活背景，将对应的栏目内容移动至可视区域
function newsNavFun(){
	var linksLi = document.getElementById("news-nav").getElementsByTagName("li");
	var links = document.getElementById("news-nav").getElementsByTagName("a");
	for(var i = 0 ; i < links.length ; i++){
		links[i].onclick = function(){
			//闭包中无法取得i的真实值，使用getObjectIndex在外部获取当前点击的索引并返回
			var theIndex = getObjectIndex(links, this);
			NOW_INDEX = theIndex;
			//去掉栏目导航的激活样式
			for(var t = 0 ; t < links.length ; t++){
				linksLi[t].className = "news-nav-not";
			}
			//为已点击的目标导航添加激活样式
			linksLi[theIndex].className = "news-nav-cru";
			//移动内容聚合区，先计算需要移动的目标位置X坐标
			var moveX = -theIndex * 480;
			moveElementTo("container-of-news-sec", "x", moveX, 0, 0.3, 1);

			//请求新闻列表
			if(theIndex == 0){
				getNewsList(theIndex, 0, 20, "headline", "loadfirst");
			}else{
				getNewsList(theIndex, 0, 20, "list", "loadfirst");
			}

		}
	}
}


//通过AJAX获取新闻模块头条栏目的数据
function getNewsList(theIndex, startItem, endItem, columnType, loadType){

	//页面滚动监听函数
	new wheelEvent(document.getElementById("cnt-for-news-nav"), "wheelEventHandle");

	var request = getHTTPObject();
	var columnID = COLUMN_ID_ELEMENT[theIndex].ntesID;
	var requestUrl = CROSS_DOMAIN_PROXY + "type=" + columnType + "&id=" + columnID + "&start=" + startItem + "&end=" + endItem;
	if(request){
		//异步处理
		request.open("GET", requestUrl, true);
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				//请求成功之后要做的操作
				var requestResult = request.responseText;
				//为页面上的模板执行标准化
				requestResult = requestResult.replace(columnID, "list");
				//转化为标准JSON对象
				requestResult = JSON.parse(requestResult);
				//重写刷新页面
				activeTemplate(theIndex, requestResult, loadType);
				return true;
			}
		};
		request.send(null);
	}else{
		alert("浏览器不支持XMLHttpRequest");
	}
}


//使用模板生成页面内容并插入页面中
function activeTemplate(theIndex, data, loadType){
	/*var data = {"list":[
	 {"url_3w":"http://help.3g.163.com/12/0710/20/8633M35L00963VRO.html", "replyCount":436, "hasImg":1, "digest":"\"湖南临湘最美女交警\"走红网络，回应称做了该做的事。", "url":"http://3g.163.com/ntes/12/0710/20/8633M35L00963VRO.html", "docid":"8633M35L00963VRO", "title":"女交警托倾斜校车让幼儿转移", "order":1, "priority":90, "lmodify":"2012-07-10 21:00:27", "subtitle":"", "imgsrc":"http://img3.cache.netease.com/3g/2012/7/10/201207102101343f08e.jpg", "ptime":"2012-07-10 20:54:51", "TAG":"视频"},
	 {"url_3w":"http://help.3g.163.com/12/0710/23/863D1O1100963VRO.html", "docid":"863D1O1100963VRO", "title":"调查称城乡老年人收入差异大", "replyCount":90, "priority":72, "lmodify":"2012-07-11 00:10:26", "imgsrc":"http://img4.cache.netease.com/3g/2012/7/10/201207102344081de59.jpg", "subtitle":"", "digest":"农村老人月平均养老金为74元，是城市老年人退休金的5%。", "ptime":"2012-07-10 23:38:30", "TAG":"视频", "url":"http://3g.163.com/ntes/12/0710/23/863D1O1100963VRO.html"},
	 ]}*/

	var hotNews;
	var hotNewsSectionID;

	var normalNews;
	var normalNewsSectionID;


	if(loadType == "loadfirst"){
		if(theIndex == 0){
			hotNews = baidu.template("tpl-news-hot-section", data);
			hotNewsSectionID = COLUMN_ID_ELEMENT[theIndex].elementID;
			document.getElementById(hotNewsSectionID).innerHTML = hotNews;
		}else{
			var loadMoreDiv = document.getElementById("load-more-div");
			loadMoreDiv.parentNode.removeChild(loadMoreDiv);
			normalNews = baidu.template("tpl-news-other-section", data);
			normalNewsSectionID = COLUMN_ID_ELEMENT[theIndex].elementID;
			document.getElementById(normalNewsSectionID).innerHTML = normalNews;
		}
	}else if(loadType == "loadmore"){
		var loadMoreDiv = document.getElementById("load-more-div");
		loadMoreDiv.parentNode.removeChild(loadMoreDiv);

		normalNews = baidu.template("tpl-news-other-section", data);
		normalNewsSectionID = COLUMN_ID_ELEMENT[theIndex].elementID;
		document.getElementById(normalNewsSectionID).innerHTML += normalNews;
	}


	//为加载下20条的按钮绑定事件和方法
	var loadMoreBtn = document.getElementById("load-more-btn");
	var loadMoreDiv = document.getElementById("load-more-div");
	loadMoreBtn.onclick = function(){
		//加载下20条之前，需要知道这个页面上已经有多少条
		var theNewsSectionID = COLUMN_ID_ELEMENT[theIndex].elementID;
		var allLiOfScetion = document.getElementById(theNewsSectionID).getElementsByTagName("li");
		var allLiOfSectionCount = allLiOfScetion.length;
		//因为头条的li是19个，其余的栏目都是20个，为了便于计算，使用加一求余法
		var loadMoreFlag = (allLiOfSectionCount + 1) % 20;
		if(loadMoreFlag == 0){
			alert(allLiOfSectionCount);
			loadMoreDiv.innerHTML = "<img src=\"images/loading.gif\"/> <span>加载中…</span>";
			addClass(loadMoreDiv, "loading");
			getNewsList(theIndex, allLiOfSectionCount + 2, allLiOfSectionCount + 21, "headline", "loadmore");
		}else{
			loadMoreDiv.innerHTML = "<img src=\"images/loading.gif\"/> <span>加载中…</span>";
			addClass(loadMoreDiv, "loading");
			getNewsList(theIndex, allLiOfSectionCount + 1, allLiOfSectionCount + 20, "list", "loadmore");
		}
		return false;
	};
}

//页面滚动处理函数
function wheelEventHandle(delta){
	var nowSection = COLUMN_ID_ELEMENT[NOW_INDEX].elementID;
	//alert(nowSection);
	if(delta < 0){
		moveElementWith(nowSection, "y", 0, -250, 0.3, 20);
		//alert("向上");
	}
	if(delta > 0){
		//alert("向下");
		moveElementWith(nowSection, "y", 0, 250, 0.3, 20);
	}
}