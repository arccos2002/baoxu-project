/**
 * Author: Baoxu
 * Date:   13-4-1
 * Time:   下午6:36
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
				displayNameSpan.text(json["mail"].slice(0,json["mail"].indexOf("@")));
			}
		}else{
			alert("用户名或密码错误，请重试。");
		}
	});
	return true;
}

function doLogout(){
	//注销
	var verifyUrl = "../common/logout.php";
	$.getJSON(verifyUrl, function(json){
		if(json.status == 1){
			//alert("注销成功");
			//登录成功后改写登陆框部分
			$("#loginForm").removeClass("f-dn");
			$("#loginSuccess").addClass("f-dn");
		}
	});
}

function getBookInfoByISBN(){
	$("p#spider-info-loading").removeClass("f-dn");
	$("p#spider-info-error").addClass("f-dn");
	$("p#spider-info-ok").addClass("f-dn");

	var isbn = $("#appendedInput").val();
	var getUrl = "../common/get_book_info.php?isbn=" + isbn;
	//alert(getUrl);
	$.getJSON(getUrl, function(json){
		if(json["title"]){

			$("p#spider-info-ok").removeClass("f-dn");
			$("p#spider-info-loading").addClass("f-dn");
			$("p#spider-info-error").addClass("f-dn");

			var tagsString = "";
			for(var i = 0 ; i < json["tags"].length - 1 ; i++){
				tagsString += json["tags"][i]["name"] + ",";
			}
			tagsString += json["tags"][json["tags"].length - 1]["name"]
			//alert(tagsString);

			$("input#title").val(json["title"]);
			$("input#subtitle").val(json["subtitle"]);
			$("input#origin_title").val(json["origin_title"]);
			$("input#pubdate").val(json["pubdate"]);
			$("input#author").val(json["author"]);
			$("input#translator").val(json["translator"]);
			$("input#publisher").val(json["publisher"]);
			$("input#image").val(json["images"]["large"]);
			$("textarea#summary").text(json["summary"]);
			$("input#pages").val(json["pages"]);
			$("input#tags").val(tagsString);
			$("input#isbn10").val(json["isbn10"]);
			$("input#isbn13").val(json["isbn13"]);
			$("img#book_img").attr("src", json["images"]["small"]);
		}else{
			$("p#spider-info-error").removeClass("f-dn");
			$("p#spider-info-loading").addClass("f-dn");
			$("p#spider-info-ok").addClass("f-dn");
		}
	});
}