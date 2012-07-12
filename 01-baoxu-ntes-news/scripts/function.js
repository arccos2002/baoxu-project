/**
 * Author: Baoxu
 * Date:   12-7-3
 * Time:   上午8:41
 */


//定义一些常量
var CROSS_DOMAIN_PROXY = "http://localhost/baoxu-project/01-baoxu-ntes-news/cdr.php?";


addLoadEvent(test);

function test(){
	newsNavFun();
	getHotNewsList("T1295501906343", 0, 20);
	//activeTemplate();
	//页面滚动监听函数
	new wheelEvent(document.getElementById("cnt-for-news-nav"), "handle");
}


//页面滚动处理函数
function handle(delta){
	if(delta < 0){
		moveElementWith("container-of-news-sec", "y", 0, -250, 0.3, 20);
		//alert("向上");
	}
	if(delta > 0){
		//alert("向下");
		moveElementWith("container-of-news-sec", "y", 0, 250, 0.3, 20);
	}
}


//使用模板生成页面内容并插入页面中
function activeTemplate(data){
	var tpl_news_hot_pic_data = data;
	/*var tpl_news_hot_pic_data = {"list":[
	 {"url_3w":"http://help.3g.163.com/12/0710/20/8633M35L00963VRO.html", "replyCount":436, "hasImg":1, "digest":"\"湖南临湘最美女交警\"走红网络，回应称做了该做的事。", "url":"http://3g.163.com/ntes/12/0710/20/8633M35L00963VRO.html", "docid":"8633M35L00963VRO", "title":"女交警托倾斜校车让幼儿转移", "order":1, "priority":90, "lmodify":"2012-07-10 21:00:27", "subtitle":"", "imgsrc":"http://img3.cache.netease.com/3g/2012/7/10/201207102101343f08e.jpg", "ptime":"2012-07-10 20:54:51", "TAG":"视频"},
	 {"url_3w":"http://help.3g.163.com/12/0710/23/863D1O1100963VRO.html", "docid":"863D1O1100963VRO", "title":"调查称城乡老年人收入差异大", "replyCount":90, "priority":72, "lmodify":"2012-07-11 00:10:26", "imgsrc":"http://img4.cache.netease.com/3g/2012/7/10/201207102344081de59.jpg", "subtitle":"", "digest":"农村老人月平均养老金为74元，是城市老年人退休金的5%。", "ptime":"2012-07-10 23:38:30", "TAG":"视频", "url":"http://3g.163.com/ntes/12/0710/23/863D1O1100963VRO.html"},
	 ]}*/
	var hotNews = baidu.template("tpl-news-hot-section", tpl_news_hot_pic_data);
	var normalNews = baidu.template("tpl-news-other-section", tpl_news_hot_pic_data);
	document.getElementById("news-hot").innerHTML = hotNews;
	document.getElementById("news-sport").innerHTML = normalNews;
	document.getElementById("news-enterta").innerHTML = normalNews;
	document.getElementById("news-finan").innerHTML = normalNews;
	document.getElementById("news-tech").innerHTML = normalNews;
	document.getElementById("news-more").innerHTML = normalNews;
}

//通过AJAX获取新闻模块头条栏目的数据
function getHotNewsList(columnID, startItem, endItem){
	var request = getHTTPObject();
	var requestUrl = CROSS_DOMAIN_PROXY + "type=headline&id=" + columnID + "&start=" + startItem + "&end=" + endItem;
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
				activeTemplate(requestResult);
				//return requestResult;
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

	var targetX = elementX + stepX;
	var targetY = elementY + stepY;

	if(elementY < stepY && elementY > -stepY && stepY > 0){
		var repeat = "moveElementTo('" + elementID + "','" + moveType + "'," + targetX + "," + 0 + "," + stepDis + "," + 50 + ")";
		elementToMove.movement = setTimeout(repeat, stepTime);
	}

	//循环单次移动，形成动画效果
	var repeat = "moveElementTo('" + elementID + "','" + moveType + "'," + targetX + "," + targetY + "," + stepDis + "," + stepTime + ")";
	elementToMove.movement = setTimeout(repeat, stepTime);
}