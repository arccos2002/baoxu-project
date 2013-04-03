/**
 * Author: Baoxu
 * Date:   13-4-1
 * Time:   下午6:36
 */


/*****************************************************************/
/**                        函数执行起点                           **/
/*****************************************************************/

addLoadEvent(todo);

/**
 * 页面加载完成之后需要立即执行的函数或者语句
 * @name todo
 */
function todo(){
	bindEvent();
}

/**
 * 事件的全局委派
 * @name bindEvent
 */
function bindEvent(){
	//全局点击事件的代理委派
	EventUtil.addHandler(document, "click", function(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		var event_tag = target.getAttribute("data-event-tag");

		switch(event_tag){
			case "et_login_btn":
				doLogin();
				break;
			case "et_logout_btn":
				doLogout();
				break;
			case "et_spider_book_btn":
				getBookInfoByISBN();
				break;
		}
	});
}


/**
 * 异步用户登录操作
 * @name doLogin
 * @returns {boolean}
 */
function doLogin(){
	var form = document.loginForm, mail = form.email.value, pass = form.password.value;

	if(!form["email"] || !form["password"]){
		return false;
	}

	//登录
	var verifyUrl = "../common/login.php?mail=" + mail + "@corp.netease.com&password=" + pass;
	$.getJSON(verifyUrl, function(json){
		if(json.status == 1){
			//登录成功后改写登陆框部分
			$("#loginForm").addClass("f-dn");
			$("#loginSuccess").removeClass("f-dn");
			var displayNameSpan = $("span#displayUserName");
			if(json["name"]){
				displayNameSpan.text(json["name"]);
			}else{
				displayNameSpan.text(json["mail"].slice(0, json["mail"].indexOf("@")));
			}
		}else{
			alert("用户名或密码错误，请重试。");
		}
	});
	return true;
}

/**
 * 注销功能函数
 * @name doLogout
 */
function doLogout(){
	//注销
	var verifyUrl = "../common/logout.php";
	$.getJSON(verifyUrl, function(json){
		if(json.status == 1){
			//alert("注销成功");
			//登录成功后改写登陆框部分
			$("#loginForm").removeClass("f-dn");
			$("#loginSuccess").addClass("f-dn");

			//注销之后返回首页
			window.location.href = "../home";
		}
	});
}

/**
 * 通过ISBN号获取图书信息，信息来源是豆瓣开放平台
 * @name getBookInfoByISBN
 */
function getBookInfoByISBN(){
	//显示工作状态，进行中
	$("p#spider-info-loading").removeClass("f-dn");
	$("p#spider-info-error").addClass("f-dn");
	$("p#spider-info-ok").addClass("f-dn");

	//Ajax请求抓取
	var isbn = $("#appendedInput").val();
	var getUrl = "../common/get_book_info.php?isbn=" + isbn;
	//alert(getUrl);
	$.getJSON(getUrl, function(json){
		if(json["title"]){
			//显示工作状态，成功
			$("p#spider-info-ok").removeClass("f-dn");
			$("p#spider-info-loading").addClass("f-dn");
			$("p#spider-info-error").addClass("f-dn");

			//将tags转换为以逗号分隔的形式
			var tagsString = "";
			for(var i = 0 ; i < json["tags"].length - 1 ; i++){
				tagsString += json["tags"][i]["name"] + ",";
			}
			tagsString += json["tags"][json["tags"].length - 1]["name"]

			//标准化日期字符串
			var pubYear = 0;
			var e = new RegExp("[0-9][0-9][0-9][0-9]", "g");
			pubYear = e.exec(json["pubdate"]);

			//抓取信息回显到表单
			$("input#title").val(json["title"]);
			$("input#subtitle").val(json["subtitle"]);
			$("input#origin_title").val(json["origin_title"]);
			$("input#pubdate").val(pubYear);
			$("input#author").val(json["author"]);
			$("input#translator").val(json["translator"]);
			$("input#publisher").val(json["publisher"]);
			$("input#image").val(json["images"]["large"]);
			$("textarea#summary").text(json["summary"]);
			$("input#pages").val(json["pages"]);
			$("input#tags").val(tagsString);
			$("input#isbn10").val(json["isbn10"]);
			$("input#isbn13").val(json["isbn13"]);
			$("img#spider_book_img").attr("src", json["images"]["medium"]);
		}else{
			//显示工作状态，失败
			$("p#spider-info-error").removeClass("f-dn");
			$("p#spider-info-loading").addClass("f-dn");
			$("p#spider-info-ok").addClass("f-dn");
		}
	});
}