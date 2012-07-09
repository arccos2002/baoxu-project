/**
 * Author: Baoxu
 * Date:   12-7-3
 * Time:   上午8:41
 */


addLoadEvent(newsNavFun);

function fun(){
	$("#cnt-for-news-nav").mousewheel(function(event, delta, deltaX, deltaY){
		if(delta < 0){
			alert("hehe")
			//$("#cnt-for-news-nav section").css("marginTop","-100px");
		}
	});
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
	allSectionContainer.movement = setTimeout(repeat, 30);
}