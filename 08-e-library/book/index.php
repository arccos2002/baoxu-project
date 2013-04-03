<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <title>书籍列表—Just Read</title>
    <link rel = "stylesheet" href = "../css/bootstrap.min.css">
    <style type = "text/css">
        body{ padding: 60px 0 40px 0; }
    </style>
    <link rel = "stylesheet" href = "../css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "../css/function.css">
    <link rel = "stylesheet" href = "../css/global.css">
</head>
<body>

<!--引入导航文件-->
<?php include "../common/nav.php"; ?>

<!--判断用户权限-->
<?php include "../common/check_user_permission.php"; ?>

<!--页面主体-->
<div class = "container">
    <div class = "input-append f-fr">
        <input class = "span3" id = "appendedInputButton" placeholder = "书名" type = "text">
        <button class = "btn" type = "button">搜索</button>
    </div>

    <table class = "table table-bordered table-hover table-striped">
        <thead>
        <tr>
            <th>书名</th>
            <th>作者</th>
            <th>状态</th>
            <th>应还日期</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td><a href = "#">这么近，那么远</a></td>
            <td>张国荣</td>
            <td>在馆</td>
            <td>—</td>
        </tr>
        <tr>
            <td><a href = "#">这么近，那么远</a></td>
            <td>张国荣</td>
            <td>已借出</td>
            <td>2013-05-01</td>
        </tr>
        <tr>
            <td><a href = "#">这么近，那么远</a></td>
            <td>张国荣</td>
            <td>在馆</td>
            <td>—</td>
        </tr>
        <tr>
            <td><a href = "#">这么近，那么远</a></td>
            <td>张国荣</td>
            <td>已借出</td>
            <td>2013-05-01</td>
        </tr>
        <tr>
            <td><a href = "#">这么近，那么远</a></td>
            <td>张国荣</td>
            <td>在馆</td>
            <td>—</td>
        </tr>
        <tr>
            <td><a href = "#">这么近，那么远</a></td>
            <td>张国荣</td>
            <td>已借出</td>
            <td>2013-05-01</td>
        </tr>
        </tbody>
    </table>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>