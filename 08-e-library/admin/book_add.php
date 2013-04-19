<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <meta content = "width=device-width, initial-scale=1.0" name = "viewport">
    <title>添加书籍-Just Read后台</title>
    <link rel = "shortcut icon" href = "../favicon.ico">
    <link rel = "stylesheet" href = "../css/bootstrap.min.css">
    <link rel = "stylesheet" href = "../css/global.css">
    <link rel = "stylesheet" href = "../css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "../css/function.css">
    <style type = "text/css">
        #spider_book_img{ height: 100px; }
    </style>
</head>
<body>

<!--引入导航文件-->
<?php include "../common/nav.php"; ?>

<!--判断管理员权限权限-->
<?php include "../common/check_admin_permission.php" ?>

<!--首页内容主体-->
<div class = "container text-center">
    <div class = "input-append input-prepend">
        <span class = "add-on">ISBN:</span> <label for = "appendedInput" class = "f-dn"></label>
        <input class = "span4" id = "appendedInput" type = "text" placeholder = "13位的ISBN码">
        <span class = "add-on btn" data-event-tag = "et_spider_book_btn">&nbsp;&nbsp;抓&nbsp;取!&nbsp;&nbsp;</span>
    </div>
    <p class = "f-dn" id = "spider-info-loading"><img src = "../img/spider_loading.gif"></p>
    <p class = "text-error f-dn" id = "spider-info-error">抓取失败，请检查ISBN是否正确。</p>
    <p class = "text-success f-dn" id = "spider-info-ok">抓取成功，请输入捐赠者姓名并保存。</p>
</div>

<div class = "container">
    <div class = "page-header"></div>
    <form class = "form-horizontal" name = "bookAdd" id = "bookAdd" action = "book_save.php" method = "post">
        <div class = "control-group">
            <label class = "control-label" for = "title">书名</label>
            <div class = "controls">
                <input type = "text" id = "title" name = "title" class = "span5" required = "required" value = "">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "subtitle">副标题</label>
            <div class = "controls">
                <input type = "text" id = "subtitle" name = "subtitle" class = "span7" value = "">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "origin_title">原书名</label>
            <div class = "controls">
                <input type = "text" id = "origin_title" name = "origin_title" class = "span5" value = "">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "pubdate">出版日期</label>
            <div class = "controls">
                <input type = "text" id = "pubdate" name = "pubdate" class = "span3" value = "">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "author">作者</label>
            <div class = "controls">
                <input type = "text" id = "author" name = "author" class = "span5" value = "">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "translator">译者</label>
            <div class = "controls">
                <input type = "text" id = "translator" name = "translator" class = "span5" value = "">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "publisher">出版社</label>
            <div class = "controls">
                <input type = "text" id = "publisher" name = "publisher" class = "span6" value = "">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "image">封面图</label>
            <div class = "controls">
                <img id = "spider_book_img" src = "../img/book_default_img.png" class = "img-polaroid">
                <input type = "text" id = "image" name = "image" value = "" style = "display: none">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "summary">摘要</label>
            <div class = "controls">
                <textarea id = "summary" name = "summary" rows = "3" class = "span7"></textarea>
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "pages">页数</label>
            <div class = "controls">
                <input type = "text" id = "pages" name = "pages" class = "span3" value = "">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "tags">标签</label>
            <div class = "controls">
                <input type = "text" id = "tags" name = "tags" class = "span7" value = "">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "isbn10">ISBN10</label>
            <div class = "controls">
                <input type = "text" id = "isbn10" name = "isbn10" class = "span5" value = "">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "isbn13">ISBN13</label>
            <div class = "controls">
                <input type = "text" id = "isbn13" name = "isbn13" class = "span5" onblur = "checkBookIsbn13(this);">
                <span id = "js-book-isbn-exist" class = "text-error add-on f-dn">该书已经存在，不能重复添加。</span>
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "provider">捐赠者</label>
            <div class = "controls">
                <input type = "text" id = "provider" required = "required" name = "provider" class = "span5" value = "">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "count">数量</label>
            <div class = "controls">
                <input type = "text" id = "count" name = "count" class = "span3" value = "1">
            </div>
        </div>

        <div class = "control-group">
            <div class = "controls">
                <button type = "submit" class = "btn btn-primary">&nbsp;入&nbsp;库&nbsp;</button>
                <button type = "reset" class = "btn">重设</button>
            </div>
        </div>
    </form>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>