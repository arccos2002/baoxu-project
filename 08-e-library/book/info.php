<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <meta content = "width=device-width, initial-scale=1.0" name = "viewport">
    <title>书籍详情—Just Read</title>
    <link rel = "shortcut icon" href = "../favicon.ico">
    <link rel = "stylesheet" href = "../css/bootstrap.min.css">
    <link rel = "stylesheet" href = "../css/global.css">
    <link rel = "stylesheet" href = "../css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "../css/function.css">
    <style type = "text/css">
        .bx-apply-book{ padding-top: 8px; }

        #js-apply-book-info{ padding-left: 15px; }
    </style>
</head>
<body>

<!--引入导航文件-->
<?php include "../common/nav.php"; ?>

<!--判断用户权限-->
<?php include "../common/check_user_permission.php"; ?>

<!--判断参数-->
<?php include "../common/check_parameter.php"; ?>

<!--读取数据库，获取书籍信息-->
<?php
$bookId = $_GET["bookId"];
$bookInfo = getBookInfoById($bookId, $conn);
if(!$bookInfo){
    echo '<div class = "container text-center bx-dialog-info">
    <p><i class = "icon-remove"></i>&nbsp;&nbsp;该书籍不存在，请重试！</p></div>';
    include "../common/foot.php";
    exit;
}
?>

<!--书籍主要信息-->
<div class = "container">
    <div class = "page-header"><h2><?php echo $bookInfo["title"] ?></h2></div>
    <div class = "row">
        <div class = "span9">
            <div class = "span2">
                <img style = "max-height: 220px;" src = "<?php echo 'book_img/' . $bookInfo["image"] ?>" class = "img-polaroid">
            </div>
            <div class = "span6">
                <h4 class = "visible-phone">基本信息</h4>
                <p>作者：<strong><?php echo $bookInfo["author"] ?></strong></p>
                <p>出版社：<strong><?php echo $bookInfo["publisher"] ?></strong></p>
                <p>出版时间：<strong><?php echo $bookInfo["pubdate"] ?></strong></p>
                <p>状态：<strong><?php echo $bookInfo["status_str"] ?></strong></p>
                <p>应还日期：<strong><?php echo $bookInfo["expire_date"] ?></strong></p>
                <p>提供者：<strong><?php echo $bookInfo["provider"] ?></strong></p>
                <p class = "bx-apply-book">
                    <button class = "btn btn-primary" data-event-tag = "et_apply_book_btn" data-book-id = "<?php echo $bookId ?>" type = "button">
                        申请借阅
                    </button>
                    <span id = "js-apply-book-info"></span>
                </p>
            </div>
        </div>
        <div class = "span3">
            <h4>标签</h4>
            <ul class = "inline bx-tag">
                <?php
                foreach($bookInfo["tags"] as $tag){
                    echo '<li>' . @$tag . '</li>';
                }
                ?>
            </ul>
        </div>

    </div>
</div>

<!--书籍摘要信息-->
<div class = "container">
    <h4>摘要</h4>
    <p class = "f-ti2"><?php echo $bookInfo["summary"] ?></p>
</div>

<!--书籍其他信息-->
<div class = "container">
    <h4>其他</h4>
    <p>ISBN：<strong><?php echo $bookInfo["isbn"] ?></strong></p>
    <p>页数：<strong><?php echo $bookInfo["pages"] ?></strong></p>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>