/**
 * Author: Baoxu
 * Date:   12-10-29
 * Time:   下午12:09
 */

//定义一些要用的常量
var LOG_INFO = "BAOXU-LOG-INFO: ", //LOG_INFO的前缀
	LOG_TOUCH = "BAOXU-LOG-TOUCH: ";

//浏览器信息
var CLIENT_WIDTH = 0,
	CLIENT_HEIGHT = 0;

//页面组件固定宽度或者高度信息
var BOTTOM_LEFT_NAVI_WIDTH = 96;

//定义标志位全局变量
var MAIN_LAYER_MOVE_FLAG = 0, //主图层的位移情况，0表示未移动，1表示向右移了，2表示向左移了
	COLUMN_DISPLAY_FLAG = 0, //新闻类顶部栏目列表的显示标志，0表示没有展开，1表示展开了
	COLUMN_EDIT_FLAG = 0, //新闻类顶部栏目列表编辑状态标志，0表示没有编辑或者编辑完成，1表示正在编辑
	DETAIL_LAYER_MOVE_FLAG = 0, //新闻详情页是否显示在主视图，0表示没有，1表示正在显示
	TIES_LAYER_MOVE_FLAG = 0, //跟帖页是否显示在主视图，0表示没有，1表示正在显示
	MASK_DISPLAY_FLAG = 0, //主页面遮罩是否显示，0表示没有，1表示正在显示
	VIEW_SCROLL_TOP = 0, //记录新闻列表页向上滚动了多少，以便在新闻列表页展示的时候还原这个状态
	CURRENT_TOP_ITEM = "news";      //记录当前选中的顶级栏目是什么，取值（news,ties,pics,topics,vote）

//代码要使用的全局变量
var STORAGE = window.localStorage,
	TOUCHOBJ = {};


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
	getNewsList("headline", "T1348647909107", 0, 20, renderHeadNewsList);

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
	CLIENT_WIDTH = getClientInfo()["width"];
	CLIENT_HEIGHT = getClientInfo()["height"];
	console.log(LOG_INFO + "ViewSize is " + CLIENT_WIDTH + " & " + CLIENT_HEIGHT);//LOG

	//页面底层图层全比例显示
	$$("bot-layer").style.width = CLIENT_WIDTH;
	$$("bot-layer").style.height = CLIENT_HEIGHT;
	console.log(LOG_INFO + "Bottom layer is full of page");//LOG
	//底层导航，导航遮罩阴影，底层个人信息，个人信息遮罩阴影校正高度
	$$("bot-layer-navi").style.height = CLIENT_HEIGHT + "px";
	$$("bot-layer-navi-shadow").style.height = CLIENT_HEIGHT + "px";
	$$("bot-layer-info-shadow").style.height = CLIENT_HEIGHT + "px";
	$$("bot-layer-info").style.height = CLIENT_HEIGHT + "px";
	console.log(LOG_INFO + "Correct bottom layer navi and info's heigh with full page");//LOG
	//底层个人信息部分校正宽度
	$$("bot-layer-info").style.width = CLIENT_WIDTH - BOTTOM_LEFT_NAVI_WIDTH + "px";
	console.log(LOG_INFO + "Correct bottom layer info's width with full page but bottom left navi");//LOG
	//上层信息主图层校正宽度
	$$("main").style.width = CLIENT_WIDTH + "px";
	$$("main-layer").style.width = CLIENT_WIDTH + "px";
	$$("main-layer-content").style.width = CLIENT_WIDTH + "px";
	console.log(LOG_INFO + "Correct main layer width with full page");//LOG
	//新闻详情页图层校正宽高与视图一致
	$$("main-layer-detail").style.width = CLIENT_WIDTH + "px";
	$$("main-layer-detail").style.height = CLIENT_HEIGHT + "px";
	console.log(LOG_INFO + "Correct detail layer width with full page");//LOG
	//跟帖页图层校正宽高与视图一致
	$$("main-layer-ties").style.width = CLIENT_WIDTH + "px";
	$$("main-layer-ties").style.height = CLIENT_HEIGHT + "px";
	console.log(LOG_INFO + "Correct tie layer width with full page");//LOG

	//初始化详情页以及跟帖页距离页面左边的距离，刚好为屏幕宽度
	$$("detail-header-bar").style.left = CLIENT_WIDTH + "px";
	$$("main-layer-detail").style.left = CLIENT_WIDTH + "px";
	$$("ties-header-bar").style.left = CLIENT_WIDTH + "px";
	$$("main-layer-ties").style.left = CLIENT_WIDTH + "px";
	console.log(LOG_INFO + "Correct detail layer & tie layer stay from left");//LOG

	//初始化MainLayer的遮罩层高度
	$$("main-layer-mask").style.height = CLIENT_HEIGHT + "px";

	//$$("head-img-list").style.width = CLIENT_WIDTH + "px";
}

/**
 * @name bindEvent
 * @class 绑定事件
 */
function bindEvent(){
	//全局点击事件的代理委派
	EventUtil.addHandler(document, "click", function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var event_tag = target.dataset["eventTag"] ? target.dataset["eventTag"] : target.getAttribute("data-event-tag");

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

			//主图层中部新闻栏目选择按钮被点击
			case "et_main_layer_mask":
				hideLayerMask();
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
	});

	//绑定触摸事件
	document.addEventListener("touchstart", handleTouchEvent, false);
	document.addEventListener("touchmove", handleTouchEvent, false);
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
 * @class 主页面图层向右移动，即点击了左上角的按钮的效果,移位的距离就是BOTTOM_LEFT_NAVI_WIDTH，底层左边导航的距离
 */
function toggleMainLayerMoveToRight(){
	var step_pers = 0.4;    //单步移动的百分比，越大越快
	var step_time = 10;     //单步移动的时间间隔，越小越快
	var theBar = $$("main-layer-action-bar-back").getElementsByTagName("a")[0];
	if(MAIN_LAYER_MOVE_FLAG == 0){
		moveElementWith("main-layer", "absolute", BOTTOM_LEFT_NAVI_WIDTH, step_pers, step_time, -1, mainLayerRightOver);
		moveElementWith("main-layer-action-bar", "fixed", BOTTOM_LEFT_NAVI_WIDTH, step_pers, step_time, 0);
		theBar.className = CURRENT_TOP_ITEM + "-back-current";
		//LOG
		console.log(LOG_INFO + "Main layer moving to the right,and back button style is current");//LOG
	}else{
		moveElementWith("main-layer", "absolute", -BOTTOM_LEFT_NAVI_WIDTH, step_pers, step_time, 1, mainLayerRestore);
		moveElementWith("main-layer-action-bar", "fixed", -BOTTOM_LEFT_NAVI_WIDTH, step_pers, step_time, 0);
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
	var step_pers = 0.3;    //单步移动的百分比，越大越快
	var step_time = 10;     //单步移动的时间间隔，越小越快
	var theBar = $$("main-layer-action-bar-user").getElementsByTagName("a")[0];
	if(MAIN_LAYER_MOVE_FLAG == 0){
		moveElementWith("main-layer", "absolute", -(CLIENT_WIDTH - BOTTOM_LEFT_NAVI_WIDTH), step_pers, step_time, 0, mainLayerLeftOver);
		moveElementWith("main-layer-action-bar", "fixed", -(CLIENT_WIDTH - BOTTOM_LEFT_NAVI_WIDTH), step_pers, step_time, 0);
		theBar.className = "current";
		//LOG
		console.log(LOG_INFO + "Main layer moving to the left,and user button style is current");//LOG
	}else{
		moveElementWith("main-layer", "absolute", CLIENT_WIDTH - BOTTOM_LEFT_NAVI_WIDTH, step_pers, step_time, 0, mainLayerRestore);
		moveElementWith("main-layer-action-bar", "fixed", CLIENT_WIDTH - BOTTOM_LEFT_NAVI_WIDTH, step_pers, step_time, 0);
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
		var newsId = "";
		if(target.tagName.toLowerCase() == "li"){
			newsId = target.dataset["newsId"];
		}else{
			newsId = target.parentElement.dataset["newsId"];
		}
	}

	if(DETAIL_LAYER_MOVE_FLAG == 0){
		//获取页面的已滚动高度，以便于复原
		VIEW_SCROLL_TOP = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;   //Webkit OR Firefox

		//先显示新闻详情页，设为block，然后将其移入主视图，占满主视图之后，在回调函数里面隐藏列表页，以方便滚动条
		setElementDisplay("main-layer-detail", "block");
		setElementDisplay("detail-header-bar", "block");
		moveElementWith("main-layer-detail", "fixed", -CLIENT_WIDTH, 0.2, 10, 0, detailLayerDisplay, newsId);
		moveElementWith("detail-header-bar", "fixed", -CLIENT_WIDTH, 0.2, 10, 0);
		//LOG
		console.log(LOG_INFO + "Detail layer moving to the main view");//LOG
	}else{
		//先显示出隐藏了的新闻列表页，复原滚动高度，将新闻详情页移出主视图，在回调函数里面将其设置为none
		setElementDisplay("main-layer", "block");
		setElementDisplay("bot-layer", "block");
		//document.documentElement.scrollTop = VIEW_SCROLL_TOP; //Firefox
		document.body.scrollTop = VIEW_SCROLL_TOP; //Webkit

		moveElementWith("main-layer-detail", "fixed", CLIENT_WIDTH, 0.3, 10, 0, detailLayerRestore);
		moveElementWith("detail-header-bar", "fixed", CLIENT_WIDTH, 0.3, 10, 0);
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
		setElementDisplay("ties-header-bar", "block");
		moveElementWith("main-layer-ties", "fixed", -CLIENT_WIDTH, 0.2, 10, 0, tiesLayerDisplay);
		moveElementWith("ties-header-bar", "fixed", -CLIENT_WIDTH, 0.2, 10, 0);
		//LOG
		console.log(LOG_INFO + "Ties layer moving to the main view");//LOG
	}else{
		//将跟帖页移出主视图，在回调函数里面将其设置为none
		moveElementWith("main-layer-ties", "fixed", CLIENT_WIDTH, 0.2, 10, 0, tiesLayerRestore);
		moveElementWith("ties-header-bar", "fixed", CLIENT_WIDTH, 0.2, 10, 0);
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
	setElementDisplay("detail-header-bar", "none");
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

	setElementDisplay("ties-header-bar", "none");
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
		showLayerMask();    //显示MASK
		$$("main-layer-action-bar-column-list").style.display = "block";
		column_select_btn.className = "current";
		COLUMN_DISPLAY_FLAG = 1;
		console.log(LOG_INFO + "COLUMN_DISPLAY_FLAG = " + COLUMN_DISPLAY_FLAG + " & Column list is dispaly");//LOG
	}else{
		hideLayerMask();    //隐藏MASK
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
	//当前栏目名称
	var now_cloumn = $$("main-layer-action-bar-column").getElementsByTagName("a")[0].innerHTML;
	//被点击的栏目名称
	var click_cloumn = target.innerHTML + "&nbsp;&nbsp;&nbsp;";
	if(now_cloumn != click_cloumn){
		//切换顶部栏目名
		$$("main-layer-action-bar-column").getElementsByTagName("a")[0].innerHTML = click_cloumn;
		console.log(LOG_INFO + "The now column is " + click_cloumn);//LOG
		//收起栏目列表
		toggleColumnList();

		//将新闻列表移到顶部
		document.body.scrollTop = 0;
		//加载该栏目下的新闻列表
		getNewsList("headline", target.parentElement.dataset.columnId, 0, 20, renderHeadNewsList);

		//将主页面置为加载中
		//renderListLoad();
	}else{
		//收起栏目列表
		toggleColumnList();
	}
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


function showLayerMask(){
	//显示mask
	$$("main-layer-mask").style.display = "block";
	//避免滚动

	//标志位说明当前MASK层正在显示
	MASK_DISPLAY_FLAG = 1;
}

function hideLayerMask(){
	//将MASK删除
	$$("main-layer-mask").style.display = "none";
	//可以滚动了

	//标志位说明当前MASK层没有显示
	MASK_DISPLAY_FLAG = 0;
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
	//预备XHR
	var request = getHTTPObject();
	var requestString = "";
	var requestResult = "";
	var requestUrl = document.location.href + "cdr_list.php?type=" + newsType + "&column=" + columnId + "&start=" + startId + "&size=" + size;

	//判定LocalStorage中是否已经存储了这个新闻列表
	var storage_key = columnId + "_" + startId / 20;

	//如果已经存有，直接渲染
	if(STORAGE.getItem(storage_key)){
		//如果LocalStorage此条存在，直接渲染
		callback(JSON.parse(STORAGE.getItem(storage_key)));
		console.log(LOG_INFO + "Already exist in LocalStorage, key is " + storage_key);//LOG
		//然后通过网络获取最新的列表放到LocalStorage中
		if(request){
			//异步处理
			request.open("GET", requestUrl, true);
			request.onreadystatechange = function(){
				if(request.readyState == 4){
					if((request.status >= 200 && request.status < 300) || request.status == 304){
						//请求成功之后要做的操作
						requestString = request.responseText;
						//存入LocalStorage
						STORAGE.setItem(storage_key, requestString);
						console.log(LOG_INFO + "Update it in LocalStorage, key is " + storage_key);//LOG
					}else{
						alert("网络请求状态码错误" + request.status);
					}
				}
			};
			request.send(null);
		}else{
			alert("浏览器不支持XMLHttpRequest");
		}

	}else{
		console.log(LOG_INFO + "Not exist in LocalStorage, key is " + storage_key);//LOG
		//通过网络方式获取并渲染存入
		if(request){
			//异步处理
			request.open("GET", requestUrl, true);
			request.onreadystatechange = function(){
				if(request.readyState == 4){
					if((request.status >= 200 && request.status < 300) || request.status == 304){
						//请求成功之后要做的操作
						requestString = request.responseText;
						//转化为标准JSON对象
						requestResult = JSON.parse(requestString);
						//执行异步处理回调函数
						callback(requestResult);
						//存入LocalStorage
						STORAGE.setItem(storage_key, requestString);
						console.log(LOG_INFO + "Save it in LocalStorage, key is " + storage_key);//LOG
					}else{
						alert("网络请求状态码错误" + request.status);
					}
				}
			};
			request.send(null);
		}else{
			alert("浏览器不支持XMLHttpRequest");
		}
	}
}


/**
 * @name getNews
 * @class 通过XHR请求单条新闻内容
 *
 * @param {String} newsId 被点中的目标
 * @param {Function} callback 被点中的目标
 */
function getNews(newsId, callback){

	//预备XHR
	var request = getHTTPObject();
	var requestString = "";
	var requestResult = "";
	var requestUrl = document.location.href + "cdr_news.php?newsid=" + newsId;

	//判定LocalStorage中是否已经存储了这个新闻列表
	var storage_key = newsId;

	if(STORAGE.getItem(storage_key)){
		//渲染页面
		callback(JSON.parse(STORAGE.getItem(storage_key)));
		console.log(LOG_INFO + "Already exist in LocalStorage, key is " + storage_key);//LOG
	}else{
		console.log(LOG_INFO + "Not exist in LocalStorage, key is " + storage_key);//LOG
		if(request){
			//异步处理
			request.open("GET", requestUrl, true);
			request.onreadystatechange = function(){
				if(request.readyState == 4){
					if((request.status >= 200 && request.status < 300) || request.status == 304){
						//请求成功之后要做的操作
						requestString = request.responseText;
						//转化为标准JSON对象
						requestResult = JSON.parse(requestString);
						//执行异步处理回调函数
						callback(requestResult);
						//存入LocalStorage
						STORAGE.setItem(storage_key, requestString);
						console.log(LOG_INFO + "Save it in LocalStorage, key is " + storage_key);//LOG
					}else{
						alert("网络请求状态码错误" + request.status);
					}
				}
			};
			request.send(null);
		}else{
			alert("浏览器不支持XMLHttpRequest");
		}
	}
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
	getNewsList("headline", target.parentElement.dataset.columnId, news_list_ul_size * 20, 20, renderMoreNewsList)
}


function showAppCache(){
	var myCache = new AppCache();
	//定义共用DOM对象
	var act = myCache.cacheStatus;
	alert(act);
}

/**
 * @name handleTouchEvent
 * @class 监控并处理触摸事件
 *
 * @param {object} event 触摸事件对象
 */
function handleTouchEvent(event){

	if(event.touches.length == 1){

		switch(event.type){
			case "touchstart":
				onTouchStart(event);
				break;
			case "touchend":
				break;
			case "touchmove":
				onTouchMove(event);
				break;
		}
	}
}

/**
 * @name onTouchStart
 * @class 触摸开始时触发的事件
 *
 * @param {object} e 触摸事件对象
 */
function onTouchStart(e){
	TOUCHOBJ.start = {
		//获取触摸的初始位置
		pageX:e.touches[0].pageX,
		pageY:e.touches[0].pageY,
		//初始化触摸事件的时间戳顺序
		time:Number(new Date())
	};

	//用于定义用户是在上下滚动还是左右滑动
	TOUCHOBJ.isScrolling = undefined;
	//X轴上的变动距离
	TOUCHOBJ.deltaX = 0;
	//Y轴上的变动距离
	TOUCHOBJ.deltaY = 0;
	//是不是同一系列的事件，事件函数执行过一次之后置为1
	TOUCHOBJ.isOne = 0;
	//定义一个标志，表现当前文档是不是在顶部，以便实施下拉刷新
	TOUCHOBJ.isTop = !((document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop) && true);
	//当前新闻栏目ID
	TOUCHOBJ.columnID = $$("head-img-list").dataset["columnId"];

	console.log(LOG_TOUCH + "Touch Start at X轴：" + TOUCHOBJ.start.pageX + " and Y轴: " + TOUCHOBJ.start.pageY);//LOG

	//先阻止事件冒泡
	e.stopPropagation();
}

/**
 * @name onTouchMove
 * @class 触摸进行中触发的事件
 *
 * @param {object} e 触摸事件对象
 */
function onTouchMove(e){
	//确保当前是单指操作的
	if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

	//获取此次触摸离第一次的距离
	TOUCHOBJ.deltaX = e.touches[0].pageX - TOUCHOBJ.start.pageX;
	TOUCHOBJ.deltaY = e.touches[0].pageY - TOUCHOBJ.start.pageY;

	console.log("Target是：" + e.target.tagName);

	console.log(LOG_TOUCH + "X轴变化：" + TOUCHOBJ.deltaX + "; Y轴变化：" + TOUCHOBJ.deltaY);

	// 判定Scroll滚动测试是否在运行
	if(typeof TOUCHOBJ.isScrolling == 'undefined'){
		//如果在X轴上移动的距离小于Y轴上移动的距离，那么判定用户在上下滚动屏幕
		TOUCHOBJ.isScrolling = (Math.abs(TOUCHOBJ.deltaX) < Math.abs(TOUCHOBJ.deltaY));
	}

	//如果判定用户不是在滚动屏幕而是横向滑动
	if(!TOUCHOBJ.isScrolling){

		//运行横向触摸事件
		doLanscapeTouch();
		//阻止系统滚动事件
		e.preventDefault();
		e.stopPropagation();
	}else{
		//用户在纵向触摸，使用系统默认的滚动
		//也要处理纵向滑动的事务，比如说下拉刷新
		doPortraitTouch();
	}
}


/**
 * @name doLanscapeTouch
 * @class 处理横向触摸事件的执行
 */
function doLanscapeTouch(){
	console.log(LOG_TOUCH + "横向触摸事件发生, isOne = " + TOUCHOBJ.isOne);

	//同一系列的触摸事件，下面的函数只发生一次
	if(!TOUCHOBJ.isOne){
		if(TIES_LAYER_MOVE_FLAG){
			//如果跟帖页显示在主视图
			if(TOUCHOBJ.deltaX < 0){
				//用户手指向左划动，不处理
			}else{
				//用户手指向右滑动，隐藏跟帖页
				toggleTiesLayerDisplay();
			}
		}else if(DETAIL_LAYER_MOVE_FLAG){
			//如果新闻详情页显示在主视图
			if(TOUCHOBJ.deltaX < 0){
				//用户手指向左划动，展示跟帖页
				toggleTiesLayerDisplay();
			}else{
				//用户手指向右滑动，收起新闻详情页
				toggleDetailLayerDisplay();
			}
		}else{
			//如果新闻详情页和跟帖页都不在主视图，判断首页列表的位置
			switch(MAIN_LAYER_MOVE_FLAG){
				//如果主图层没有移动
				case 0:
					if(TOUCHOBJ.deltaX < 0){
						//用户手指向左划动，主图层需要向左划动，展示个人中心
						toggleMainLayerMoveToLeft();
					}else{
						//用户手指向右滑动，主图层向右滑动，展示频道
						toggleMainLayerMoveToRight();
					}
					break;

				//如果主图层向右移了，正在展示频道
				case 1:
					if(TOUCHOBJ.deltaX < 0){
						//用户手指向左划动，主图层需要向左划动，隐藏频道
						toggleMainLayerMoveToRight();
					}else{
						//用户手指向右滑动，不处理
					}
					break;

				//如果主图层向左移了，正在展示个人中心
				case 2:
					if(TOUCHOBJ.deltaX < 0){
						//用户手指向左划动，不处理
					}else{
						//用户手指向右滑动，主图层向右滑动，隐藏个人中心
						toggleMainLayerMoveToLeft();
					}
					break;
			}
		}
		//本次横向移动的任务完成，不响应下面本系列其他的move
		TOUCHOBJ.isOne = 1;
	}
}

/**
 * @name doPortraitTouch
 * @class 处理纵向触摸事件的执行
 */
function doPortraitTouch(){
	console.log(LOG_TOUCH + "纵向触摸事件发生, isOne = " + TOUCHOBJ.isOne + "isTop = " + TOUCHOBJ.isTop);
	//如果详情页和跟帖页都不在前台展示，前台展示的是新闻列表页
	if(!(TIES_LAYER_MOVE_FLAG || DETAIL_LAYER_MOVE_FLAG || TOUCHOBJ.isOne)){
		if(TOUCHOBJ.deltaY > 0){
			if(TOUCHOBJ.isTop){
				//显示下拉刷新条
				refreshList(72, 0.4, 20);
				getNewsList("headline", TOUCHOBJ.columnID, 0, 20, renderHeadNewsList);

				setTimeout("refreshList(0,0.4,20)", 1000);

				//本次移动的任务完成，不响应下面本系列其他的move
				TOUCHOBJ.isOne = 1;
			}
		}
	}

}

/**
 * @name refreshList
 * @class 下拉刷新操作的响应
 *
 * @param {Number} targetTop 需要移动到什么程度，按照需求，0表示隐藏下拉刷新状态栏，72表示显示下拉刷新状态栏
 * @param {Number} stepDis 每一步需要移动的百分比
 * @param {Number} stepTime 每一次timeOut的时间
 */
function refreshList(targetTop, stepDis, stepTime){
	//改变新闻列表对象的MarginTop值，已达到显示下拉刷新提示栏的功能
	var elementToMove = $$("main-layer-content");
	//目标对象的MarginTop的值
	var elementTop = parseInt(elementToMove.style.marginTop);
	//单次移动的距离
	var dist = 0;

	//如果上一次的点击的移位还没有完成，先清除循环
	if(elementToMove.movement){
		clearTimeout(elementToMove.movement);
	}

	//alert(elementTop);

	//如果移动完成
	if(elementTop == targetTop){
		//alert("完成了！");
	}else if(elementTop > targetTop){
		dist = Math.ceil((elementTop - targetTop) * stepDis);
		elementTop -= dist;
	}else if(elementTop < targetTop){
		dist = Math.ceil((targetTop - elementTop) * stepDis);
		elementTop += dist;
	}

	//设置DOM的位置，进行渲染
	elementToMove.style.marginTop = elementTop + "px";

	//循环单次移动，形成动画效果
	var repeat = "refreshList(" + targetTop + "," + stepDis + "," + stepTime + ")";
	elementToMove.movement = setTimeout(repeat, stepTime);

}
