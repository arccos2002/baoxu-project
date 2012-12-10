/**
 * Author: Baoxu
 * Date:   12-11-29
 * Time:   下午2:52
 */

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
	+ "<img data-event-tag = 'et_news_item' src = '"+"<%= xhrData[i]['imgsrc'] %>"+"' />"
	+ "<h1 data-event-tag = 'et_news_item'>"+ "<%= xhrData[i]['title'] %>" +"</h1>"
	+ "<h6 data-event-tag = 'et_news_item'>"+ "<%= xhrData[i]['digest'] %>" +"</h6>"
	+ "<span data-event-tag = 'et_news_item'>"+"<%= xhrData[i]['replyCount'] %>"+"跟帖</span>"
	+ "</li>"
	+ "<%}%>"
	+ "</ul>";

//编译新闻列表模板
var render_head_news_list = template.compile(tp_head_news_list);

/**
 * @name renderNewsList
 * @class 渲染头图和新闻列表
 * @param {Object} data XHR获取的JSON数据
 */
function renderNewsList(data){
	//渲染头图
	$$("head-img").innerHTML = render_head_img(data);
	//渲染新闻列表
	$$("news-list").innerHTML = render_head_news_list(data);
}


/*******************************    新闻详情模板    ************************************/
//默认新闻详情模板
var tp_news_default = "<div id='article-loading'>"
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