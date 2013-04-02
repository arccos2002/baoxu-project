<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <title>书籍详情—Just Read</title>
    <link rel = "stylesheet" href = "../css/bootstrap.min.css">
    <link rel = "stylesheet" href = "css/info.css">
    <link rel = "stylesheet" href = "../css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "../css/function.css">
</head>
<body>

<!--引入导航文件-->
<?php include "../common/nav.php"; ?>

<!--书籍主要信息-->
<div class = "container">
    <div class = "page-header"><h2>我是个年轻人，我心情不太好</h2></div>
    <div class = "row">
        <div class = "span9">
            <div class = "f-fl bx-book-img"><a href = "#"><img src = "../img/721159.jpg" class = "img-polaroid"></a>
            </div>
            <div>
                <p>作者：<strong>张国荣</strong></p>
                <p>出版社：<strong>人民大学出版社</strong></p>
                <p>出版时间：<strong>2009-10-25</strong></p>
                <p>状态：<strong>在馆</strong></p>
                <p>提供者：<strong>陈保需</strong></p>
                <p class = "bx-apply-book">
                    <button class = "btn btn-primary" type = "button">申请借阅</button>
                </p>
            </div>
        </div>
        <div class = "span3">
            <h4>标签</h4>
            <ul class = "inline bx-tag">
                <li>标签1</li>
                <li>标签1</li>
                <li>标签1</li>
                <li>标签1</li>
                <li>标签1</li>
                <li>标签1</li>
            </ul>
        </div>

    </div>
</div>

<!--书籍摘要信息-->
<div class = "container">
    <h4>摘要</h4>
    <p class = "f-ti2">《用户体验要素:以用户为中心的产品设计(原书第2版)》是AJAX之父Jesse James
        Garrett的经典之作。本书用简洁的语言系统化地诠释了设计、技术和商业融合是最重要的发展趋势。全书共8章，包括关于用户体验以及为什么它如此重要、认识这些要素、战略层、范围层、结构层、框架层、表现层以及要素的应用。
        《用户体验要素:以用户为中心的产品设计(原书第2版)》用清晰的说明和生动的图形分析了以用户为中心的设计方法（UCD）来进行网站设计的复杂内涵，并关注于思路而不是工具或技术，从而使你的网站具备高质量体验的流程。</p>
</div>

<!--书籍其他信息-->
<div class="container">
    <h4>其他</h4>
    <p>ISBN：<strong>123456789</strong></p>
    <p>页数：<strong>201</strong></p>
    <p>发售时间：<strong>2009-10-25</strong></p>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>