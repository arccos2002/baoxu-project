/**
 * Author: Baoxu
 * Date:   12-11-29
 * Time:   下午2:52
 */

/*******************************    新闻栏目数据    ************************************/
var data_news_column = {co_data:[
	{id:"T1348647909107",co:"头条"},
	{id:"T1295505916992",co:"体育"},
	{id:"T1295506658957",co:"娱乐"},
	{id:"T1295505705196",co:"财经"},
	{id:"T1295507084100",co:"科技"},
	{id:"T1295505447897",co:"军事"},
	{id:"T1295505330581",co:"国内"},
	{id:"T1295505403327",co:"国际"},
	{id:"T1295505301714",co:"社会"},
	{id:"T1295505484037",co:"深度"},
	{id:"T1295505940145",co:"NBA"},
	{id:"T1295505852042",co:"股票"},
	{id:"T1295507162882",co:"手机"},
	{id:"T1295507471479",co:"游戏"},
	{id:"T1295507338077",co:"汽车"},
	{id:"T1295506798584",co:"女人"},
	{id:"T1295507537904",co:"旅游"},
	{id:"T1295507237702",co:"数码"},
	{id:"T1295505544569",co:"探索"},
	{id:"T1297307403944",co:"CBA"},
	{id:"T1297306817918",co:"足球"},
	{id:"T1297306854577",co:"英超"},
	{id:"T1297306872184",co:"西甲"},
	{id:"T1297306895740",co:"意甲"},
	{id:"T1297307342683",co:"德甲"},
	{id:"T1316405154348",co:"中超"},
	{id:"T1316411034878",co:"时尚"},
	{id:"T1295506885366",co:"美容"},
	{id:"T1295507421461",co:"情感"},
	{id:"T1295507421461",co:"房产"},
	{id:"T1295506688215",co:"明星"},
	{id:"T1297307872142",co:"电影"},
	{id:"T1297307917589",co:"电视"},
	{id:"T1297307966539",co:"音乐"}
]};

/*******************************    新闻栏目列表    ************************************/
var tp_news_column = "<li data-column-id = '<%= co_data[0].id %>'>"
	+ "<a data-event-tag = 'et_colm_list_choose' class = 'column_name_all'><%= co_data[0].co %></a></li>"
	+ "<% for(var i = 1; i < 5; i++){ %>"
	+ "<li data-column-id = '<%= co_data[i].id %>'><a data-event-tag = 'et_colm_list_remove' class = 'column_dis'></a>"
	+ "<a data-event-tag = 'et_colm_list_choose' class = 'column_name_all'>" + "<%= co_data[i].co %>" + "</a>"
	+ "<a data-event-tag = 'et_colm_list_drag' class = 'column_dis'></a></li>"
	+ "<%}%>";

var render_news_column = template.compile(tp_news_column);

/**
 * @name renderNewsColumn
 * @class 渲染新闻栏目列表
 * @param {Object} data 新闻栏目列表数据
 */
function renderNewsColumn(data){
	//渲染顶部Bar上的新闻栏目列表
	$$("main-layer-action-bar-column-list").getElementsByTagName("ul")[0].innerHTML = render_news_column(data);
}

/*******************************    新闻列表模板    ************************************/
//头图模板
var tp_head_img = "<ul>"
	+ "<li data-news-id='"+ "<%= xhrData[0].docid%>" +"'>"
	+ "<img data-event-tag = 'et_head_img' src = '"+"<%= xhrData[0].imgsrc %>"+"' />"
	+ "<h6 data-event-tag = 'et_head_img'>"+ "<%= xhrData[0]['title'] %>" +"</h6>"
	+ "</li>"
	+ "</ul>";

//编译头图模板
var render_head_img = template.compile(tp_head_img);

//头条新闻新闻列表模板
var tp_head_news_list = "<ul>"
	+ "<% for(var i = 1; i < xhrData.length; i++){ %>"
	+ "<li data-event-tag = 'et_news_item' data-news-id = '"+"<%= xhrData[i]['docid'] %>"+"'>"
	+ "<img data-event-tag = 'et_news_item' src = '"+"<%= xhrData[i]['imgsrc']?xhrData[i]['imgsrc']:'images/news_list_default_icon.png' %>"+"' />"
	+ "<h1 data-event-tag = 'et_news_item'>"+ "<%= xhrData[i]['title'] %>" +"</h1>"
	+ "<h6 data-event-tag = 'et_news_item'>"+ "<%= xhrData[i]['digest'].substr(0,28) %>" +"</h6>"
	+ "<span data-event-tag = 'et_news_item'>"+"<%= xhrData[i]['replyCount'] %>"+"跟帖</span>"
	+ "</li>"
	+ "<%}%>"
	+ "</ul>";

//编译新闻列表模板
var render_head_news_list = template.compile(tp_head_news_list);

//普通新闻新闻列表模板
var tp_normal_news_list = "<ul>"
	+ "<% for(var i = 1; i < xhrData.length; i++){ %>"
	+ "<li data-event-tag = 'et_news_item' data-news-id = '"+"<%= xhrData[i]['docid'] %>"+"'>"
	+ "<img data-event-tag = 'et_news_item' src = '"+"<%= xhrData[i]['imgsrc']?xhrData[i]['imgsrc']:'images/news_list_default_icon.png' %>"+"' />"
	+ "<h1 data-event-tag = 'et_news_item'>"+ "<%= xhrData[i]['title'] %>" +"</h1>"
	+ "<h6 data-event-tag = 'et_news_item'>"+ "<%= xhrData[i]['digest'].substr(0,28) %>" +"</h6>"
	+ "<span data-event-tag = 'et_news_item'>"+"<%= xhrData[i]['replyCount'] %>"+"跟帖</span>"
	+ "</li>"
	+ "<%}%>"
	+ "</ul>";

//编译普通新闻列表模板
var render_normal_news_list = template.compile(tp_normal_news_list);

/**
 * @name renderHeadNewsList
 * @class 渲染头图和新闻列表
 * @param {Object} data XHR获取的JSON数据
 */
function renderHeadNewsList(data){
	//渲染头图
	$$("head-img").innerHTML = render_head_img(data);
	//显示头图区域
	setElementDisplay("head-img","");
	//渲染新闻列表
	$$("news-list").innerHTML = render_head_news_list(data);
}

/**
 * @name renderNormalNewsList
 * @class 渲染头图和新闻列表
 * @param {Object} data XHR获取的JSON数据
 */
function renderNormalNewsList(data){
	//不要顶部头图区域
	setElementDisplay("head-img","none");
	//渲染新闻列表
	$$("news-list").innerHTML = render_normal_news_list(data);
}


/*******************************    新闻详情模板    ************************************/
//默认新闻详情模板
var tp_news_default = "<div class='detail-loading'>"
	+ "<span class='load-gif'></span>"
	+ "<span class='load-logo'></span>"
	+ "</div>";

//编译默认新闻详情模板
var render_news_default = template.compile(tp_news_default);

/**
 * @name renderNewsDefault
 * @class 渲染默认新闻详情页，就是加载页
 */
function renderNewsDefault(){
	//渲染新闻详情页
	$$("detail-article").innerHTML = render_news_default();
}

//新闻详情模板
var tp_news = "<h1>"+"<%= xhrData['title'] %>"+"</h1>"
	+ "<h6>来源:<%= xhrData['source'] %> <%= xhrData['ptime'] %></h6>"
	+ "<div id = 'detail-article-content'>"
	+ "<%= xhrData['body'] %>"
	+ "</div>";

//编辑新闻详情模板
var render_news = template.compile(tp_news);

/**
 * @name renderNews
 * @class 渲染新闻详情页
 * @param {Object} data XHR获取的JSON数据
 */
function renderNews(data){
	//渲染新闻详情页
	$$("detail-article").innerHTML = render_news(data);
}