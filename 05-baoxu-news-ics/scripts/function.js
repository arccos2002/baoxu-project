/**
 * Author: Baoxu
 * Date:   12-10-29
 * Time:   下午12:09
 */

//定义一些要用的常量
var LOG_INFO = "BAOXU-LOG-INFO: ";  //LOG_INFO的前缀

//定义标志位全局变量
var MAIN_LAYER_MOVE_FLAG = 0;       //主图层的位移情况，0表示未移动，1表示向右移了，2表示向左移了
var COLUMN_DISPLAY_FLAG = 0;        //新闻类顶部栏目列表的显示标志，0表示没有展开，1表示展开了
var COLUMN_EDIT_FLAG = 0;           //新闻类顶部栏目列表编辑状态标志，0表示没有编辑或者编辑完成，1表示正在编辑
var DETAIL_LAYER_MOVE_FLAG = 0;     //新闻详情页是否显示在主视图，0表示没有，1表示正在显示
var TIES_LAYER_MOVE_FLAG = 0;       //跟帖页是否显示在主视图，0表示没有，1表示正在显示

var VIEW_SCROLL_TOP = 0;            //记录新闻列表页向上滚动了多少，以便在新闻列表页展示的时候还原这个状态
var CURRENT_TOP_ITEM = "news";      //记录当前选中的顶级栏目是什么，取值（news,ties,pics,topics,vote）


/******************************************************************************/
/******************                 执行函数               *********************/
/******************************************************************************/

//将TODO事项加入页面加载完成之后立即处理
addLoadEvent(todo);

/**
 * @name todo
 * @class TODO函数中包括要立即处理的函数
 */
function todo(){
	console.log(LOG_INFO + "Starting, just do it!");//LOG
	//初始化各个块的大小
	initViewPort();
	//在document级别做事件委派
	bindEvent();

	//加载网络新闻列表
	//getNewsList("headline", "T1348647909107", 0, 20, renderHeadNewsList);

	//渲染新闻栏目列表
	renderNewsColumn(data_news_column);

	//显示离线存储状态
	//showAppCache();
}

/**
 * @name initViewPort
 * @class 初始化页面的高宽以适合所有屏幕的显示
 */
function initViewPort(){
	//获取屏幕信息
	var client_width = getClientInfo()["width"];
	var client_height = getClientInfo()["height"];
	console.log(LOG_INFO + "ViewSize is " + client_width + " & " + client_height);//LOG

	//页面底层图层全比例显示
	$$("bot-layer").style.width = client_width;
	$$("bot-layer").style.height = client_height;
	console.log(LOG_INFO + "Bottom layer is full of page");//LOG
	//底层导航，导航遮罩阴影，底层个人信息，个人信息遮罩阴影校正高度
	$$("bot-layer-navi").style.height = client_height + "px";
	$$("bot-layer-navi-shadow").style.height = client_height + "px";
	$$("bot-layer-info-shadow").style.height = client_height + "px";
	$$("bot-layer-info").style.height = client_height + "px";
	console.log(LOG_INFO + "Correct bottom layer navi and info's heigh with full page");//LOG
	//底层个人信息部分校正宽度
	$$("bot-layer-info").style.width = client_width - 96 + "px";
	console.log(LOG_INFO + "Correct bottom layer info's width with full page but navi");//LOG
	//上层信息主图层校正宽度
	$$("main").style.width = client_width + "px";
	$$("main-layer").style.width = client_width + "px";
	console.log(LOG_INFO + "Correct main layer width with full page");//LOG
	//新闻详情页图层校正宽高与视图一致
	$$("main-layer-detail").style.width = client_width + "px";
	$$("main-layer-detail").style.height = client_height + "px";
	//跟帖页图层校正宽高与视图一致
	$$("main-layer-ties").style.width = client_width + "px";
	$$("main-layer-ties").style.height = client_height + "px";
}

/**
 * @name bindEvent
 * @class 绑定事件
 */
function bindEvent(){
	EventUtil.addHandler(document, "click", function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var event_tag = target.dataset["eventTag"];

		switch(event_tag){
			//底层顶级栏目导航被点击
			case "et_top_nav":
				clickBotLayerNavi(target);
				break;

			//主图层左上角展开隐藏左侧边栏按钮被点击
			case "et_main_layer_back":
				toggleMainLayerMoveToRight();
				break;

			//主图层右上角展开隐藏右侧个人信息侧边栏按钮被点击
			case "et_main_layer_user":
				toggleMainLayerMoveToLeft();
				break;

			//主图层中部新闻栏目选择按钮被点击
			case "et_main_layer_colm":
				toggleColumnList();
				break;

			//主图层弹出新闻列表中某一栏目被点击
			case "et_colm_list_choose":
				chooseColumn(target);
				break;

			//主图层弹出新闻列表下方，添加栏目按钮被点击
			case "et_colm_add":
				break;

			//主图层弹出新闻列表下方，编辑栏目按钮被点击
			case "et_colm_edit":
				toggleEditNewsColumnList();
				break;

			//主图层弹出的新闻栏目列表编辑的时候，左侧删除按钮被点击
			case "et_colm_list_remove":
				toggleDeleteColumn(target);
				break;

			//主图层弹出的新闻栏目列表编辑的时候，右侧拖拽按钮被点击
			case "et_colm_list_drag":
				break;

			//主图层弹出的新闻栏目列表编辑的时候，底部完成按钮被点击
			case "et_colm_edit_ok":
				toggleEditNewsColumnList();
				break;

			//新闻详情页左上角返回按钮被点击
			case "et_detail_back":
				toggleDetailLayerDisplay();
				break;

			//新闻详情页右上角菜单按钮被点击
			case "et_detail_menu":
				break;

			//新闻详情页中部查看跟帖按钮被点击
			case "et_detail_ties":
				toggleTiesLayerDisplay();
				break;

			//跟帖页左上角返回按钮被点击
			case "et_ties_back":
				toggleTiesLayerDisplay();
				break;

			//新闻头图被点击
			case "et_head_img":
				toggleDetailLayerDisplay(target);
				break;

			//新闻列表页单条新闻被点击
			case "et_news_item":
				toggleDetailLayerDisplay(target);
				break;

			//加载下20条
			case "et_news_more":
				getMoreNews(target);
				break;
		}
	})
}


/**
 * @name clickBotLayerNavi
 * @class 选择新闻栏目
 *
 * @param {object} target 被点击的目标，必选参数
 */
function clickBotLayerNavi(target){
	var bot_layer_navi_li = $$("navi-list").getElementsByTagName("li");
	//某个按钮被点击后，将所有的按钮样式置空
	for(var t = 0 ; t < bot_layer_navi_li.length ; t++){
		bot_layer_navi_li[t].getElementsByTagName("a")[0].className = "";
	}
	console.log(LOG_INFO + "All navi button style is normal");//LOG
	//将被点击按钮的样式置为current
	target.className = "current";
	//获取当前顶级项目，存入全局变量
	CURRENT_TOP_ITEM = target.parentElement.className.slice(5);
	setTimeout(toggleMainLayerMoveToRight, 100);
	console.log(LOG_INFO + "The navi button who is clicked style is current and main layer goes home");//LOG
}

/**
 * @name toggleMainLayerMoveToRight
 * @class 主页面图层向右移动，即点击了左上角的按钮的效果
 */
function toggleMainLayerMoveToRight(){
	var theBar = $$("main-layer-action-bar-back").getElementsByTagName("a")[0];
	if(MAIN_LAYER_MOVE_FLAG == 0){
		moveElementWith("main-layer", "absolute", 96, 0.4, 10, -1, mainLayerRightOver);
		moveElementWith("main-layer-action-bar", "fixed", 96, 0.4, 10, 0);
		theBar.className = CURRENT_TOP_ITEM + "-back-current";
		//LOG
		console.log(LOG_INFO + "Main layer moving to the right,and back button style is current");//LOG
	}else{
		moveElementWith("main-layer", "absolute", -96, 0.4, 10, 1, mainLayerRestore);
		moveElementWith("main-layer-action-bar", "fixed", -96, 0.4, 10, 0);
		//theBar.className = theBar.className.slice(0, -8);
		theBar.className = CURRENT_TOP_ITEM + "-back";
		//LOG
		console.log(LOG_INFO + "Main layer going home, and back button style is normal");//LOG
	}
}

/**
 * @name toggleMainLayerMoveToLeft
 * @class 切换主页面图层向左移动，即点击了右上角的按钮的效果，移动或收起
 */
function toggleMainLayerMoveToLeft(){
	var theBar = $$("main-layer-action-bar-user").getElementsByTagName("a")[0];
	if(MAIN_LAYER_MOVE_FLAG == 0){
		moveElementWith("main-layer", "absolute", -384, 0.3, 10, 0, mainLayerLeftOver);
		moveElementWith("main-layer-action-bar", "fixed", -384, 0.3, 10, 0);
		theBar.className = "current";
		//LOG
		console.log(LOG_INFO + "Main layer moving to the left,and user button style is current");//LOG
	}else{
		moveElementWith("main-layer", "absolute", 384, 0.3, 10, 0, mainLayerRestore);
		moveElementWith("main-layer-action-bar", "fixed", 384, 0.3, 10, 0);
		theBar.className = "";
		//LOG
		console.log(LOG_INFO + "Main layer going home, and user button style is normal");//LOG
	}
}


/**
 * @name toggleDetailLayerDisplay
 * @class 在新闻列表中点击的时候向左推出详情页
 * @param {Object} target 触及本动作被点击的对象
 */
function toggleDetailLayerDisplay(target){

	if(target){
		console.log(target.tagName.toLowerCase());
		var newsId = "";
		if(target.tagName.toLowerCase() == "li"){
			newsId = target.dataset["newsId"];
		}else{
			newsId = target.parentElement.dataset["newsId"];
		}
	}

	if(DETAIL_LAYER_MOVE_FLAG == 0){
		//获取页面的已滚动高度，以便于复原
		//VIEW_SCROLL_TOP = document.documentElement.scrollTop;   //Firefox
		VIEW_SCROLL_TOP = document.body.scrollTop;   //Webkit

		//先显示新闻详情页，设为block，然后将其移入主视图，占满主视图之后，在回调函数里面隐藏列表页，以方便滚动条
		setElementDisplay("main-layer-detail", "block");
		moveElementWith("main-layer-detail", "fixed", -480, 0.2, 10, 0, detailLayerDisplay, newsId);
		moveElementWith("detail-header-bar", "fixed", -480, 0.2, 10, 0);
		//LOG
		console.log(LOG_INFO + "Detail layer moving to the main view");//LOG
	}else{
		//先显示出隐藏了的新闻列表页，复原滚动高度，将新闻详情页移出主视图，在回调函数里面将其设置为none
		setElementDisplay("main-layer", "block");
		setElementDisplay("bot-layer", "block");
		//document.documentElement.scrollTop = VIEW_SCROLL_TOP; //Firefox
		document.body.scrollTop = VIEW_SCROLL_TOP; //Webkit

		moveElementWith("main-layer-detail", "fixed", 480, 0.2, 10, 0, detailLayerRestore);
		moveElementWith("detail-header-bar", "fixed", 480, 0.2, 10, 0);
		//LOG
		console.log(LOG_INFO + "Detail layer moving out the main view, now is hide");//LOG
	}
}


/**
 * @name toggleTiesLayerDisplay
 * @class 点击跟帖数的时候向左推出跟帖页
 */
function toggleTiesLayerDisplay(){
	if(TIES_LAYER_MOVE_FLAG == 0){
		//先显示跟帖页，设为block，然后将其移入主视图
		setElementDisplay("main-layer-ties", "block");
		moveElementWith("main-layer-ties", "fixed", -480, 0.2, 10, 0, tiesLayerDisplay);
		moveElementWith("ties-header-bar", "fixed", -480, 0.2, 10, 0);
		//LOG
		console.log(LOG_INFO + "Ties layer moving to the main view");//LOG
	}else{
		//将跟帖页移出主视图，在回调函数里面将其设置为none
		moveElementWith("main-layer-ties", "fixed", 480, 0.2, 10, 0, tiesLayerRestore);
		moveElementWith("ties-header-bar", "fixed", 480, 0.2, 10, 0);
		//LOG
		console.log(LOG_INFO + "Ties layer moving out the main view, now is hide");//LOG
	}
}

/**
 * @name mainLayerRightOver
 * @class 主图层右移完成之后的回调，将MAIN_LAYER_MOVE_FLAG设置为1
 */
function mainLayerRightOver(){
	MAIN_LAYER_MOVE_FLAG = 1;
	console.log(LOG_INFO + "MAIN_LAYER_MOVE_FLAG = " + MAIN_LAYER_MOVE_FLAG + " & Main layer is moved to the right");//LOG
}

/**
 * @name mainLayerLeftOver
 * @class 主图层左移完成之后的回调，将MAIN_LAYER_MOVE_FLAG设置为2
 */
function mainLayerLeftOver(){
	MAIN_LAYER_MOVE_FLAG = 2;
	console.log(LOG_INFO + "MAIN_LAYER_MOVE_FLAG = " + MAIN_LAYER_MOVE_FLAG + " & Main layer is moved to the left");//LOG
}

/**
 * @name mainLayerRestore
 * @class 主图层归位时的回调，将MAIN_LAYER_MOVE_FLAG还原为0
 */
function mainLayerRestore(){
	MAIN_LAYER_MOVE_FLAG = 0;
	console.log(LOG_INFO + "MAIN_LAYER_MOVE_FLAG = " + MAIN_LAYER_MOVE_FLAG + " & Main layer is restore");//LOG
}

/**
 * @name detailLayerDisplay
 * @class 详情页图层显示时的回调，将DETAIL_LAYER_MOVE_FLAG变为1，表示详情页正在显示
 */
function detailLayerDisplay(newsId){
	DETAIL_LAYER_MOVE_FLAG = 1;
	console.log(LOG_INFO + "DETAIL_LAYER_MOVE_FLAG = " + DETAIL_LAYER_MOVE_FLAG + " & Detail layer is dispaly");//LOG

	//新闻详情页在主视图中显示的时候，将新闻列表页面隐藏
	setElementDisplay("main-layer", "none");
	setElementDisplay("bot-layer", "none");

	//详情页显示出来的时候，请求新闻内容
	getNews(newsId, renderNews);
}

/**
 * @name detailLayerRestore
 * @class 详情页图层显示时的回调，将DETAIL_LAYER_MOVE_FLAG变为1，表示详情页已经隐藏
 */
function detailLayerRestore(){
	DETAIL_LAYER_MOVE_FLAG = 0;
	console.log(LOG_INFO + "DETAIL_LAYER_MOVE_FLAG = " + DETAIL_LAYER_MOVE_FLAG + " & Detail layer is restore");//LOG
	renderNewsDefault();
	setElementDisplay("main-layer-detail", "none");
}

/**
 * @name tiesLayerDisplay
 * @class 详情页图层显示时的回调，将DETAIL_LAYER_MOVE_FLAG变为1，表示详情页正在显示
 */
function tiesLayerDisplay(){
	TIES_LAYER_MOVE_FLAG = 1;
	console.log(LOG_INFO + "TIES_LAYER_MOVE_FLAG = " + TIES_LAYER_MOVE_FLAG + " & Ties layer is dispaly");//LOG
}

/**
 * @name tiesLayerRestore
 * @class 详情页图层显示时的回调，将DETAIL_LAYER_MOVE_FLAG变为1，表示详情页已经隐藏
 */
function tiesLayerRestore(){
	TIES_LAYER_MOVE_FLAG = 0;
	console.log(LOG_INFO + "TIES_LAYER_MOVE_FLAG = " + TIES_LAYER_MOVE_FLAG + " & Ties layer is restore");//LOG

	setElementDisplay("main-layer-ties", "none");
}

/**
 * @name toggleColumnList
 * @class 切换新闻类顶部栏目列表是否显示
 */
function toggleColumnList(){
	var column_select_btn = document.getElementById("main-layer-action-bar-column").getElementsByTagName("a")[0];
	//如果当前栏目列表没有展开，则展开，并将栏目条上的按钮置为按下的状态
	if(COLUMN_DISPLAY_FLAG == 0){
		$$("main-layer-action-bar-column-list").style.display = "block";
		column_select_btn.className = "current";
		COLUMN_DISPLAY_FLAG = 1;
		console.log(LOG_INFO + "COLUMN_DISPLAY_FLAG = " + COLUMN_DISPLAY_FLAG + " & Column list is dispaly");//LOG
	}else{
		$$("main-layer-action-bar-column-list").style.display = "none";
		column_select_btn.className = "";
		COLUMN_DISPLAY_FLAG = 0;
		console.log(LOG_INFO + "COLUMN_DISPLAY_FLAG = " + COLUMN_DISPLAY_FLAG + " & Column list is hide");//LOG
	}
}

/**
 * @name chooseColumn
 * @class 选择新闻栏目
 *
 * @param {object} target 被点击的目标，必选参数
 */
function chooseColumn(target){
	//切换顶部栏目名
	$$("main-layer-action-bar-column").getElementsByTagName("a")[0].innerHTML = target.innerHTML + "&nbsp;&nbsp;&nbsp;";
	console.log(LOG_INFO + "The now column is " + target.innerHTML);//LOG
	//收起栏目列表
	toggleColumnList();
	//加载该栏目下的新闻列表
	/*if(target.innerHTML == "头条"){
		getNewsList("headline",target.parentElement.dataset.columnId,0,20,renderHeadNewsList);
	}else{
		getNewsList("list",target.parentElement.dataset.columnId,0,20,renderNormalNewsList);
	}*/
	getNewsList("headline",target.parentElement.dataset.columnId,0,20,renderHeadNewsList);
}

/**
 * @name toggleEditNewsColumnList
 * @class 点击编辑新闻栏目列表的操作函数
 */
function toggleEditNewsColumnList(){
	var columnList = $$("main-layer-action-bar-column-list").getElementsByTagName("li");
	var i;
	if(COLUMN_EDIT_FLAG == 0){
		//头条不允许删除和拖动，i从1开始算起
		for(i = 1 ; i < columnList.length ; i++){
			//进入可编辑状态的时候，修改栏目名前后的可操作样式
			columnList[i].getElementsByTagName("a")[0].className = "column_del";
			columnList[i].getElementsByTagName("a")[1].className = "column_name";
			columnList[i].getElementsByTagName("a")[2].className = "column_drag";
			//进入可编辑状态的时候，栏目列表中的栏目名是不可以点击的
			columnList[i].getElementsByTagName("a")[1].onclick = "";
		}
		//隐藏栏目编辑按钮入口，展示完成编辑按钮
		$$("main-layer-news-column-ok").style.display = "block";
		$$("main-layer-news-column-do").style.display = "none";
		COLUMN_EDIT_FLAG = 1;
		console.log(LOG_INFO + "COLUMN_EDIT_FLAG = " + COLUMN_EDIT_FLAG + " & Columns now can edit");//LOG
	}else{
		//头条不允许删除和拖动，i从1开始算起
		for(i = 1 ; i < columnList.length ; i++){
			//进入可编辑状态的时候，修改栏目名前后的可操作样式
			columnList[i].getElementsByTagName("a")[0].className = "column_dis";
			columnList[i].getElementsByTagName("a")[1].className = "column_name_all";
			columnList[i].getElementsByTagName("a")[2].className = "column_dis";
			//进入可编辑状态的时候，栏目列表中的栏目名重新换回可以点击的
			columnList[i].getElementsByTagName("a")[1].onclick = chooseColumn;
		}
		//隐藏完成编辑按钮，展示编辑按钮入口
		$$("main-layer-news-column-ok").style.display = "none";
		$$("main-layer-news-column-do").style.display = "block";
		COLUMN_EDIT_FLAG = 0;
		console.log(LOG_INFO + "COLUMN_EDIT_FLAG = " + COLUMN_EDIT_FLAG + " & Columns now edit finished");//LOG
	}
}

/**
 * @name toggleDeleteColumn
 * @class 点击切换栏目列表中删除按钮的动作
 *
 * @param {object} target 被点击的目标，必选参数
 */
function toggleDeleteColumn(target){
	//先将按钮变为删除警告
	if(target.className == "column_del"){
		target.className = "column_del_check";
	}else if(target.className == "column_del_check"){
		//删除该节点
		target.parentNode.outerHTML = "";
	}
}


/**
 * @name getNewsList
 * @class 通过XHR请求新闻列表
 *
 * @param {string} newsType 请求的新闻列表的类型（headline：头条新闻；list：普通新闻）
 * @param {string} columnId 新闻栏目的ID
 * @param {number} startId 新闻列表的起始ID
 * @param {number} size 新闻列表获取的数量
 * @param {function} callback 异步请求完之后的回调函数
 */
function getNewsList(newsType, columnId, startId, size, callback){
	var request = getHTTPObject();
	var requestResult = "";
	var requestUrl = document.location.href + "cdr_list.php?type=" + newsType + "&column=" + columnId + "&start=" + startId + "&size=" + size;
	if(request){
		//异步处理
		request.open("GET", requestUrl, false);
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				//请求成功之后要做的操作
				requestResult = request.responseText;
				//console.log(requestResult);
				//转化为标准JSON对象
				requestResult = JSON.parse(requestResult);
				//执行异步处理回调函数
				callback(requestResult);
				//返回请求成功
				//return true;
			}else{
				//
			}
		};
		request.send(null);
	}else{
		alert("浏览器不支持XMLHttpRequest");
	}
	//console.log(requestResult);
	return requestResult;
}


/**
 * @name getNews
 * @class 通过XHR请求单条新闻内容
 *
 * @param {String} newsId 被点中的目标
 * @param {Function} callback 被点中的目标
 */
function getNews(newsId, callback){

	var request = getHTTPObject();
	var requestResult = "";
	var requestUrl = document.location.href + "cdr_news.php?newsid=" + newsId;
	if(request){
		//异步处理
		request.open("GET", requestUrl, false);
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				//请求成功之后要做的操作
				requestResult = request.responseText;
				//console.log(requestResult);
				//转化为标准JSON对象
				requestResult = JSON.parse(requestResult);
				//执行异步处理回调函数
				callback(requestResult);
				//返回请求成功
				//return true;
			}else{
				//
			}
		};
		request.send(null);
	}else{
		alert("浏览器不支持XMLHttpRequest");
	}
	//console.log(requestResult);
	return requestResult;
}

/**
 * @name getMoreNews
 * @class 点击加载下20条时执行的函数
 *
 * @param {object} target 被点击的目标，必选参数
 */
function getMoreNews(target){
	target.innerHTML = "正在载入";
	//得到了news-list这个ID下所有的ul的数量，用于判断加载到第几页了
	var news_list_ul_size = $$("news-list").getElementsByTagName("ul").length;
	getNewsList("headline",target.parentElement.dataset.columnId,news_list_ul_size*20,20,renderMoreNewsList)
}


function showAppCache(){
	var myCache = new AppCache();
	//定义共用DOM对象
	var output = $$("output");
	var act = myCache.cacheStatus;
	output.innerHTML += act;
	alert(act);
}