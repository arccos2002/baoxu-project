<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <meta content = "width=device-width, initial-scale=1.0" name = "viewport">
    <title>关于 - Just Read</title>
    <link rel = "shortcut icon" href = "../favicon.ico">
    <link rel = "stylesheet" href = "../css/bootstrap.min.css">
    <link rel = "stylesheet" href = "../css/global.css">
    <link rel = "stylesheet" href = "../css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "../css/function.css">
    <style type = "text/css">
        .bx-about-container li{ padding: 5px 0; }

        .bx-about-container h3{ padding: 15px 0 0 0 }
    </style>
</head>
<body>

<!--引入导航文件-->
<?php include "../common/nav.php"; ?>

<div class = "container bx-about-container">
    <h3>关于Just Read</h3>
    <p>捐出自己的书籍与大家分享阅读，共同学习。</p>

    <h3>试行规则</h3>
    <h4>捐献</h4>
    <ol>
        <li>鼓励捐献，多多益善。</li>
        <li>接受：深度阅读图书，类型不限，最好与工作相关。</li>
        <li>不接受：杂志。</li>
    </ol>

    <h4>借阅</h4>
    <ol>
        <li>产品组每个人都可以借阅。</li>
        <li>每次借阅1本，默认借期30天。</li>
        <li>借取时间：每周五。</li>
        <li>每个人归还图书后，才可以再次借阅下一本。</li>
    </ol>

    <h3>系统使用</h3>
    <ol>
        <li>注册帐号，请填写真实姓名和工作邮箱。</li>
        <li>查看图书列表，对拟借阅图书点击申请借阅。</li>
        <li>到管理员处取书，由管理员批准该申请并借出图书。</li>
        <li>如果在一次借期内没有读完，可以申请一次续期，续期时间为10天。</li>
        <li>所借需要在应还日期内归还到管理员处，并由管理员标记该书已换。</li>
    </ol>

    <h3>技术支持</h3>
    <p>为方便开发，使用了Twitter的前端框架Bootstrap。</p>
    <p>业务逻辑和管理后台使用了PHP+MySql。</p>
    <p>线上系统有任何问题请联系：陈保需&#60;bxchen@corp.netease.com&#62;</p>
</div>

<!--引入页脚文件-->
<?php include "../common/foot.php"; ?>