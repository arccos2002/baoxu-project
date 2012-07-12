/**
 * Author: Baoxu
 * Date:   12-7-3
 * Time:   上午8:41
 */


//定义一些常量
var CROSS_DOMAIN_PROXY = "http://localhost/baoxu-project/01-baoxu-ntes-news/cdr.php?";
var COLUMN_ID_ELEMENT = [
	{lolumnName:"头条", ntesID:"T1295501906343", elementID:"news-hot"},
	{lolumnName:"体育", ntesID:"T1295505916992", elementID:"news-sport"},
	{lolumnName:"娱乐", ntesID:"T1295506658957", elementID:"news-enterta"},
	{lolumnName:"财经", ntesID:"T1295505705196", elementID:"news-finan"},
	{lolumnName:"科技", ntesID:"T1295507084100", elementID:"news-tech"},
	{lolumnName:"军事", ntesID:"T1295505447897", elementID:"news-mili"}
];


addLoadEvent(test);

function test(){
	init();
}

//页面初始化函数
function init(){
	//添加导航的点击事件和方法
	newsNavFun();
	//页面滚动监听函数
	new wheelEvent(document.getElementById("cnt-for-news-nav"), "handle");
	//进入时默认加载头条新闻栏目
	getNewsList(0, 0, 20, "headline");

}


//页面滚动处理函数
function handle(delta){
	if(delta < 0){
		moveElementWith("news-hot", "y", 0, -250, 0.3, 20);
		//alert("向上");
	}
	if(delta > 0){
		//alert("向下");
		moveElementWith("news-hot", "y", 0, 250, 0.3, 20);
	}
}


//使用模板生成页面内容并插入页面中
function activeTemplate(theIndex, data){
	/*var data = {"list":[
	 {"url_3w":"http://help.3g.163.com/12/0710/20/8633M35L00963VRO.html", "replyCount":436, "hasImg":1, "digest":"\"湖南临湘最美女交警\"走红网络，回应称做了该做的事。", "url":"http://3g.163.com/ntes/12/0710/20/8633M35L00963VRO.html", "docid":"8633M35L00963VRO", "title":"女交警托倾斜校车让幼儿转移", "order":1, "priority":90, "lmodify":"2012-07-10 21:00:27", "subtitle":"", "imgsrc":"http://img3.cache.netease.com/3g/2012/7/10/201207102101343f08e.jpg", "ptime":"2012-07-10 20:54:51", "TAG":"视频"},
	 {"url_3w":"http://help.3g.163.com/12/0710/23/863D1O1100963VRO.html", "docid":"863D1O1100963VRO", "title":"调查称城乡老年人收入差异大", "replyCount":90, "priority":72, "lmodify":"2012-07-11 00:10:26", "imgsrc":"http://img4.cache.netease.com/3g/2012/7/10/201207102344081de59.jpg", "subtitle":"", "digest":"农村老人月平均养老金为74元，是城市老年人退休金的5%。", "ptime":"2012-07-10 23:38:30", "TAG":"视频", "url":"http://3g.163.com/ntes/12/0710/23/863D1O1100963VRO.html"},
	 ]}*/
	if(theIndex == 0){
		var hotNews = baidu.template("tpl-news-hot-section", data);
		var hotNewsSectionID = COLUMN_ID_ELEMENT[theIndex].elementID;
		document.getElementById(hotNewsSectionID).innerHTML = hotNews;
	}else{
		var normalNews = baidu.template("tpl-news-other-section", data);
		var normalNewsSectionID = COLUMN_ID_ELEMENT[theIndex].elementID;
		document.getElementById(normalNewsSectionID).innerHTML = normalNews;
	}

	//为加载下20条的按钮绑定事件和方法
	var loadMoreBtn = document.getElementById("load-more-btn");
	loadMoreBtn.onclick = function(){
		var nowColumnSectionID = loadMoreBtn.parentNode.parentNode.id;
		alert(nowColumnSectionID);
		return false;
	};
}

//通过AJAX获取新闻模块头条栏目的数据
function getNewsList(theIndex, startItem, endItem, type){
	var request = getHTTPObject();
	var columnID = COLUMN_ID_ELEMENT[theIndex].ntesID;
	var requestUrl = CROSS_DOMAIN_PROXY + "type=" + type + "&id=" + columnID + "&start=" + startItem + "&end=" + endItem;
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
				activeTemplate(theIndex, requestResult);
				return true;
			}
		};
		request.send(null);
	}else{
		alert("浏览器不支持XMLHttpRequest");
	}
}

//新闻页面下栏目导航点击时，切换栏目导航激活背景，将对应的栏目内容移动至可视区域
function newsNavFun(){
	var linksLi = document.getElementById("news-nav").getElementsByTagName("li");
	var links = document.getElementById("news-nav").getElementsByTagName("a");
	for(var i = 0 ; i < links.length ; i++){
		links[i].onclick = function(){
			//闭包中无法取得i的真实值，使用getObjectIndex在外部获取当前点击的索引并返回
			var theIndex = getObjectIndex(links, this);
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
				getNewsList(theIndex, 0, 20, "headline");
			}else{
				getNewsList(theIndex, 0, 20, "list");
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
 * @parameter stepX：移动到的目标X轴坐标
 * @parameter stepY：移动到的目标Y轴坐标
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

	if(elementY > -stepY && stepY > 0){
		var repeat = "moveElementTo('" + elementID + "','" + moveType + "'," + targetX + "," + 0 + "," + stepDis + "," + 50 + ")";
		elementToMove.movement = setTimeout(repeat, stepTime);
	}

	if(elementY < -elementH && stepY < 0){
		var repeat = "moveElementTo('" + elementID + "','" + moveType + "'," + targetX + "," + -elementH + "," + stepDis + "," + 50 + ")";
		elementToMove.movement = setTimeout(repeat, stepTime);
	}

	//循环单次移动，形成动画效果
	var repeat = "moveElementTo('" + elementID + "','" + moveType + "'," + targetX + "," + targetY + "," + stepDis + "," + stepTime + ")";
	elementToMove.movement = setTimeout(repeat, stepTime);
}