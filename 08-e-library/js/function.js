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
			case "et_apply_book_btn":
				applyBook(target);
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
	var form = document.loginForm, mail = form.nav_email.value, pass = form.nav_password.value;

	if(!form["nav_email"] || !form["nav_password"]){
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
	var spiderInfoLoad = $("p#spider-info-loading");
	var spiderInfoError = $("p#spider-info-error");
	var spiderInfoOk = $("p#spider-info-ok");

	//显示工作状态，进行中
	spiderInfoLoad.removeClass("f-dn");
	spiderInfoError.addClass("f-dn");
	spiderInfoOk.addClass("f-dn");

	//Ajax请求抓取
	var isbn = $("#appendedInput").val();

	//先判断拟抓取的ISBN是否已经存在
	$.getJSON("../common/get_isbn_exist.php?isbn13=" + isbn, function(data){
		if(!data["exists"]){
			$.getJSON("../common/get_book_info.php?isbn=" + isbn, function(json){
				if(json["title"]){
					//显示工作状态，成功
					spiderInfoOk.removeClass("f-dn");
					spiderInfoLoad.addClass("f-dn");
					spiderInfoError.addClass("f-dn");

					//将tags转换为以逗号分隔的形式
					var tagsString = "";
					for(var i = 0 ; i < json["tags"].length - 1 ; i++){
						tagsString += json["tags"][i]["name"] + ",";
					}
					tagsString += json["tags"][json["tags"].length - 1]["name"];

					//标准化日期字符串
					var e = new RegExp("[0-9][0-9][0-9][0-9]", "g");
					var pubYear = e.exec(json["pubdate"]);

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
					spiderInfoError.removeClass("f-dn");
					spiderInfoLoad.addClass("f-dn");
					spiderInfoOk.addClass("f-dn");
				}
			});
		}else{
			alert("这本书已存在，请不要重复添加！");
		}
	});
}

/**
 * 用户注册的时候检查填写的邮箱是否已经被注册
 * @param e 引用的input输入框
 */
function checkRegistMail(e){
	var mailExistInfo = $("#js-regist-mail-exist");
	$.getJSON("../common/get_mail_exist.php?mail=" + e.value, function(json){
		if(json["exists"] == 1){
			e.focus();
			mailExistInfo.removeClass("f-dn");
		}else{
			mailExistInfo.addClass("f-dn");
		}
	});
}

/**
 * 用户注册的时候，检查用户两遍输入的密码是否一致
 * @param e 引用的password2输入框
 */
function checkRegistPassword(e){
	var passNotEqualInfo = $("#js-regist-pass-not-equal");
	if($("#password").val() != $("#password2").val()){
		passNotEqualInfo.removeClass("f-dn");
		e.focus();
	}else{
		passNotEqualInfo.addClass("f-dn");
	}
}

/**
 * 抓取书籍的时候，验证填入的ISBN13在数据库中是否存在
 * @param isbn 要检查的ISBN号
 */
function checkBookIsbn13(isbn){
	//这里要用同步请求，不然无法赋值
	$.ajax({
		type:"GET",
		url:"../common/get_isbn_exist.php?isbn13=" + isbn,
		async:"false",
		dataType:"json",
		success:function(json){
			return json["exists"];
		}
	});
}


function applyBook(e){
	var applyBookInfo = $("#js-apply-book-info");
	var bookId = e.getAttribute("data-book-id");
	$.getJSON("../common/do_apply_book.php?bookId=" + bookId, function(json){
		switch(json["apply"]){
			case 0:
				applyBookInfo.removeClass("text-success");
				applyBookInfo.addClass("text-error");
				applyBookInfo.text("写入数据库失败，请联系系统管理员");
				break;
			case 1:
				applyBookInfo.removeClass("text-error");
				applyBookInfo.addClass("text-success");
				applyBookInfo.text("申请成功，请找图书管理员审核");
				break;
			case 2:
				applyBookInfo.removeClass("text-success");
				applyBookInfo.addClass("text-error");
				applyBookInfo.text("已经申请了，请不要重复申请");
				break;
		}
	});
}