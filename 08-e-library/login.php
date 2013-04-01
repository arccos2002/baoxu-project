<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <meta content = "width=device-width, initial-scale=1.0" name = "viewport">
    <title>登录-Just Read</title>
    <link rel = "stylesheet" href = "css/bootstrap.min.css">
    <link rel = "stylesheet" href = "css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "css/function.css">
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
            margin: 0 auto 20px;
            max-width: 300px;
            padding: 19px 29px 29px;
        }

        .form-signin .form-signin-heading, .form-signin .checkbox{
            margin-bottom: 10px;
        }

        .form-signin input[type="text"], .form-signin input[type="password"]{
            font-size: 16px;
            height: auto;
            margin-bottom: 15px;
            padding: 7px 9px;
        }

        .btn-regist{
            line-height: 40px;
            padding: 10px 8px 0 0;
            vertical-align: text-bottom;
        }
    </style>
</head>
<body>

<div class = "container">
    <form class = "form-signin">
        <h2 class = "form-signin-heading">登录</h2>
        <input class = "input-block-level" type = "text" placeholder = "Email">
        <input class = "input-block-level" type = "password" placeholder = "Pasword">
        <label class = "checkbox">
            <input type = "checkbox" value = "remember-me">
            自动登录
        </label>
        <button class = "btn btn-large btn-primary" type = "submit">登录</button>
        <button class = "btn btn-link f-fr btn-regist">注册</button>
    </form>
</div>

<script src = "js/jquery-1.9.1.min.js"></script>
<script src = "js/bootstrap.min.js"></script>
</body>
<!--
Author: Baoxu
Date:   13-4-1
Time:   上午9:40
-->
</html>