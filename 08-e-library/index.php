<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <meta content = "width=device-width, initial-scale=1.0" name = "viewport">
    <title>登录-Just Read</title>
    <script src = "js/jquery-1.9.1.min.js"></script>
    <script src = "js/bootstrap.min.js"></script>
    <link rel = "stylesheet" href = "css/bootstrap.min.css">
    <link rel = "stylesheet" href = "css/global.css">
    <link rel = "stylesheet" href = "css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "css/function.css">
    <link rel = "stylesheet" href = "css/global.css">
    <style type = "text/css">
        body{
            background-color: #F5F5F5;
            padding-bottom: 40px;
            padding-top: 40px;
        }

        .form-signin{
            background-color: #FFFFFF;
            border: 1px solid #E5E5E5;
            border-radius: 5px 5px 5px 5px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            margin: 30px auto 20px;
            max-width: 300px;
            padding: 19px 29px 29px;
        }

        .form-signin .form-signin-heading, .form-signin{
            margin-bottom: 10px;
        }

        .form-signin input[type="text"], .form-signin input[type="password"]{
            font-size: 16px;
            height: auto;
            margin-bottom: 15px;
            padding: 7px 9px;
        }

        .bx-login-email, .bx-login-password-input{
            width: 94%;
        }

        .bx-login-email-input{
            width: 130px;
        }

        .bx-login-add{
            font-size: 16px !important;
            height: auto !important;
            margin-bottom: 15px !important;
            padding: 7px 4px !important;
        }

        .bx-register-btn{
            padding-top: 18px;
        }
    </style>
</head>
<body>

<div class = "container">
    <div class = "text-center bx-login-logo">Just Read</div>
    <form class = "form-signin" method = "post" action = "">
        <h2 class = "form-signin-heading">登录</h2>
        <div class = "input-append bx-login-email">
            <label for = "email" class = "f-dn"></label>
            <input class = "bx-login-email-input" id = "email" name = "email" type = "text" placeholder = "mail" required = "required">
            <span class = "add-on bx-login-add">@corp.netease.com</span>
        </div>
        <label for = "password" class = "f-dn"></label>
        <input class = "bx-login-password-input" id = "password" name = "password" type = "password" placeholder = "password" required = "required">
        <p id = "js_login_error_info" class = "text-error f-dn">登录失败，请确认用户名与密码。</p>
        <button class = "btn btn-large btn-primary" type = "submit">登录</button>
        <a class = "f-fr bx-register-btn" href = "user/register.php">注册</a>
    </form>
</div>

<?php

if($_POST){

    include "common/conn.php";
    include "common/function.php";

    //获取QueryString
    $mail = $_POST["email"] . "@corp.netease.com";
    $password = $_POST["password"];
    $pass_md5 = md5($password);

    //查询数据库
    $verify_sql = "SELECT * FROM `user` WHERE `mail` = '" . $mail . "' AND `password` = '" . $pass_md5 . "'";
    $result = mysql_query($verify_sql, $conn);
    $success = mysql_num_rows($result);

    //返回结果
    if($success){
        while($row = mysql_fetch_array($result)){
            /*修改最后登录时间*/
            updateLoginDate($row["user_id"], $conn);
            /*写Cookie*/
            $userIdAdmin = $row["user_id"] . $row["admin"];
            setcookie("userCode", encodeCookie($userIdAdmin) . $userIdAdmin, time() + 3600, "/");
            setcookie("userMail", $row["mail"], time() + 3600, "/");
            setcookie("userName", $row["name"], time() + 3600, "/");

            /*跳转*/
            jumpToUrl("home/");
        }
    } else{
        //提示登陆失败
        echo "<script language='javascript' type='text/javascript'>";
        echo "$('#js_login_error_info').removeClass('f-dn')";
        echo "</script>";
    }
}

?>

</body>
<!--
Author: Baoxu
Date:   13-4-1
Time:   上午9:40
-->
</html>