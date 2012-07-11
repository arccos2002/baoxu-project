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
	new wheelEvent(document.getElementById('news-hot'), 'handle');
}

function handle(delta){
	alert("滚轮触发了");
}

function activeTemplate(data){
	var tpl_news_hot_pic_data = data;
	/*var tpl_news_hot_pic_data = {"list":[
	 {"url_3w":"http://help.3g.163.com/12/0710/20/8633M35L00963VRO.html", "replyCount":436, "hasImg":1, "digest":"\"湖南临湘最美女交警\"走红网络，回应称做了该做的事。", "url":"http://3g.163.com/ntes/12/0710/20/8633M35L00963VRO.html", "docid":"8633M35L00963VRO", "title":"女交警托倾斜校车让幼儿转移", "order":1, "priority":90, "lmodify":"2012-07-10 21:00:27", "subtitle":"", "imgsrc":"http://img3.cache.netease.com/3g/2012/7/10/201207102101343f08e.jpg", "ptime":"2012-07-10 20:54:51", "TAG":"视频"},
	 {"url_3w":"http://help.3g.163.com/12/0710/23/863D1O1100963VRO.html", "docid":"863D1O1100963VRO", "title":"调查称城乡老年人收入差异大", "replyCount":90, "priority":72, "lmodify":"2012-07-11 00:10:26", "imgsrc":"http://img4.cache.netease.com/3g/2012/7/10/201207102344081de59.jpg", "subtitle":"", "digest":"农村老人月平均养老金为74元，是城市老年人退休金的5%。", "ptime":"2012-07-10 23:38:30", "TAG":"视频", "url":"http://3g.163.com/ntes/12/0710/23/863D1O1100963VRO.html"},
	 {"url_3w":"http://news.163.com/12/0710/23/863BIQKF00014JB6.html", "docid":"863BIQKF00014JB6", "title":"东盟今将与中国讨论南海议题", "replyCount":0, "priority":72, "lmodify":"2012-07-11 00:16:36", "imgsrc":"http://img3.cache.netease.com/3g/2012/7/9/20120709040436da172.jpg", "subtitle":"", "digest":"东盟各国呼吁以联合国海洋法公约来解决南海冲突。", "ptime":"2012-07-10 22:59:00", "url":"http://3g.163.com/news/12/0710/23/863BIQKF00014JB6.html"},
	 {"url_3w":"http://news.163.com/12/0710/22/86387KHS0001124J.html", "docid":"86387KHS0001124J", "title":"重庆警方调查电视台播色情片", "replyCount":274, "priority":71, "lmodify":"2012-07-10 23:25:28", "imgsrc":"http://img4.cache.netease.com/3g/2012/7/10/20120710222007c4318.jpg", "subtitle":"", "digest":"网传7月7日晚酉阳电视台播放欧美A级色情片。", "ptime":"2012-07-10 22:14:20", "url":"http://3g.163.com/news/12/0710/22/86387KHS0001124J.html"}
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
				var rst = request.responseText;
				rst = rst.replace(columnID, "list");
				//alert(rst);
				rst = JSON.parse(rst);
				//alert(rst);
				activeTemplate(rst);
				return rst;
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
			//移动内容聚合区
			moveNewsSection(theIndex, 480)
		}
	}
}

//将目标栏目内容移动至可视区函数
/**
 * targetSectionIndex:所需要的目标栏目内容的索引
 * everySectionWidth：每个栏目内容块的宽度，也就是可视区域宽度，此版本为480px
 *
 * 移动成功则返回true
 * */
function moveNewsSection(targetSectionIndex, everySectionWidth){
	//包含了所有栏目Section的父容器
	var allSectionContainer = document.getElementById("container-of-news-sec");
	//此父容器当前的marginLeft值
	var theContainerLeft = parseInt(allSectionContainer.style.marginLeft);
	//单次移动距离
	var dist = 0;
	//需要移动到的目标marginLeft值
	var targetLeft = -targetSectionIndex * everySectionWidth;

	//如果上一次的点击的移位还没有完成，先清除循环
	if(allSectionContainer.movement){
		clearTimeout(allSectionContainer.movement);
	}
	//移位完成，返回true
	if(theContainerLeft == targetLeft){
		return true;
	}

	if(theContainerLeft > targetLeft){
		dist = Math.ceil((theContainerLeft - targetLeft) / 3);
		theContainerLeft -= dist;
	}

	if(theContainerLeft < targetLeft){
		dist = Math.ceil((targetLeft - theContainerLeft) / 3);
		theContainerLeft += dist;
	}
	//设定单次移动之后的marginLeft值
	allSectionContainer.style.marginLeft = theContainerLeft + "px";
	//循环单次移动，形成动画效果
	var repeat = "moveNewsSection(" + targetSectionIndex + "," + everySectionWidth + ")";
	allSectionContainer.movement = setTimeout(repeat, 1);
}