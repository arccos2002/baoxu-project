<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <title>Just Read</title>
    <link rel = "stylesheet" href = "css/bootstrap.min.css">
    <link rel = "stylesheet" href = "css/index.css">
    <link rel = "stylesheet" href = "css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "css/function.css">
</head>
<body>

<!--引入导航文件-->
<?php include "nav.php"; ?>

<!--首页内容主体-->
<div class = "container">

    <div class = "hero-unit">
        <h1>Just, Read!</h1>
        <p class = "lead muted"><em>He who loveth a book will never want a faithful friend, a wholesome
                counsellor, a cheerful companion, or an effectual comforter.</em></p>
        <p class = "muted">--Isaac Barrow</p>

        <p><a class = "btn btn-primary btn-large" href = "#">查看更多 »</a></p>
    </div>

    <div class = "row">
        <div class = "span4">
            <h2>新书</h2>

            <div class = "f-fl bx-book-img"><a href = "#"><img src = "img/721159.jpg" class = "img-polaroid"></a></div>
            <div>
                <h4 class = "bx-title"><a href = "#">这么远，那么近</a></h4>
                <p class = "bx-author">张国荣</p>
                <p class = "bx-summry">《用户体验要素:以用户为中心的产品设计(原书第2版)》是AJAX之父Jesse James
                    Garrett的经典之作。本书用简洁的语言系统化地诠释了设计、技术和商业融合是最重要的发展趋势。</p>
            </div>
            <div class = "f-cb"></div>
        </div>
        <div class = "span4">
            <h2>热门</h2>

            <div class = "f-fl bx-book-img"><img src = "img/721159.jpg" class = "img-polaroid"></div>
            <div>
                <h5 class = "bx-title">这里是书名</h5>
                <p class = "bx-author">这里是作者</p>
                <p class = "bx-summry">《用户体验要素:以用户为中心的产品设计(原书第2版)》是AJAX之父Jesse James
                    Garrett的经典之作。本书用简洁的语言系统化地诠释了设计、技术和商业融合是最重要的发展趋势。</p>
            </div>
            <div class = "f-cb"></div>
        </div>
        <div class = "span4">
            <h2>公告</h2>

            <div class = "f-fl bx-book-img"><img src = "img/721159.jpg" class = "img-polaroid"></div>
            <div>
                <h5 class = "bx-title">这里是书名</h5>
                <p class = "bx-author">这里是作者</p>
                <p class = "bx-summry">《用户体验要素:以用户为中心的产品设计(原书第2版)》是AJAX之父Jesse James
                    Garrett的经典之作。本书用简洁的语言系统化地诠释了设计、技术和商业融合是最重要的发展趋势。</p>
            </div>
            <div class = "f-cb"></div>
        </div>
    </div>
</div>

<!--引入页尾文件-->
<?php include "foot.php"; ?>