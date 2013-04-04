<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <title>注册-Just Read后台</title>
    <link rel = "stylesheet" href = "../css/bootstrap.min.css">
    <link rel = "stylesheet" href = "css/register.css">
    <link rel = "stylesheet" href = "../css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "../css/function.css">
    <link rel = "stylesheet" href = "../css/global.css">
</head>
<body>

<!--引入导航文件-->
<?php include "../common/nav.php"; ?>

<!--内容主体-->
<div class = "container">
    <div class = "page-header"><h2>用户注册</h2></div>
    <form class = "form-horizontal" name = "userRegister" id = "userRegister" onsubmit = "return verifyRegistForm(this)"
          action = "../admin/user_save.php" enctype = "multipart/form-data" method = "post">
        <div class = "control-group">
            <label class = "control-label" for = "name">姓名</label>

            <div class = "controls">
                <input type = "text" id = "name" name = "name" maxlength = "5" class = "span3" required = "required"
                       placeholder = "请填写真实姓名">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "mail">邮箱</label>

            <div class = "controls">
                <input type = "text" id = "mail" name = "mail" class = "span2" required = "required"
                       placeholder = "Corp邮箱前缀" onblur = "checkMail(this);">
                <span class = "add-on">@corp.netease.com</span>
                <span id = "js-regist-mail-exist" class = "add-on text-error f-dn">&nbsp;&nbsp;该邮箱地址已被注册</span>
                <span id = "js-regist-mail-ok" class = "add-on text-success f-dn">&nbsp;&nbsp;该邮箱地址可以使用</span>
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "password">密码</label>

            <div class = "controls">
                <input type = "password" id = "password" name = "password" class = "span5" required = "required"
                       placeholder = "密码">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "password2">密码确认</label>

            <div class = "controls">
                <input type = "password" id = "password2" class = "span5"
                       required = "required" placeholder = "再输入密码" onblur = "checkPassword(this);">
                <span id = "js-regist-pass-not-equal" class = "add-on text-error f-dn">&nbsp;&nbsp;两次密码不一致</span>
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "phone">手机号</label>

            <div class = "controls">
                <input type = "text" id = "phone" name = "phone" maxlength = "11" size = "11" placeholder = "请输入手机号">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "sign">签名档</label>

            <div class = "controls">
                <textarea id = "sign" name = "sign" rows = "3" maxlength = "70" class = "span7"
                          placeholder = "不要超过70个字"></textarea>
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "head">头像</label>

            <div class = "controls">
                <input type = "file" id = "head" name = "head" class = "span3" value = "">
            </div>
        </div>

        <div class = "control-group">
            <div class = "controls">
                <button type = "submit" class = "btn btn-primary">&nbsp;注&nbsp;册&nbsp;</button>
                <button type = "reset" class = "btn">重设</button>
            </div>
        </div>
    </form>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>