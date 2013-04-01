/**
 * Author: Baoxu
 * Date:   13-4-1
 * Time:   下午6:36
 */

function verifyForm(form){
	var loginBtn = $("#bx-login-btn");
	loginBtn.addClass("disabled");
	loginBtn.html("<img src='img/loading.gif'>");
	if(form.email.value == ""){
		alert("请输入书名。");
		form.email.focus();
		loginBtn.removeClass("disabled");
		loginBtn.html("登录");
		return false;
	}
	if(form.password.value == ""){
		alert("请输入书名价格。");
		form.password.focus();
		loginBtn.removeClass("disabled");
		loginBtn.html("登录");
		return false;
	}
	$.getJSON("",function(){

	});
	return true;
}