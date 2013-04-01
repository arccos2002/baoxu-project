/**
 * Author: Baoxu
 * Date:   13-4-1
 * Time:   下午6:36
 */

function login(){
	var loginBtn = $("#bx-login-btn");
	loginBtn.addClass("disabled");
	loginBtn.html("<img src='img/loading.gif'>");

	var form = document.login;

	var mail = form.email.value, pass = form.password.value;

	//判断用户输入不为空
	if(mail == ""){
		alert("请输入邮箱前缀");
		form.email.focus();
		loginBtn.removeClass("disabled");
		loginBtn.html("登录");
		return false;
	}
	if(pass == ""){
		alert("请输入密码");
		form.password.focus();
		loginBtn.removeClass("disabled");
		loginBtn.html("登录");
		return false;
	}

	//登录
	var verifyUrl = "verifyLogin.php?mail=" + mail + "@corp.netease.com&password=" + pass;
	$.getJSON(verifyUrl, function(json){
		if(json.status == 1){
			alert("登录成功");
		}
	});
}