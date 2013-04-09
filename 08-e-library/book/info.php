<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <title>书籍详情—Just Read</title>
    <link rel = "stylesheet" href = "../css/bootstrap.min.css">
    <link rel = "stylesheet" href = "../css/global.css">
    <link rel = "stylesheet" href = "../css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "../css/function.css">
    <style type = "text/css">
        .bx-book-img{ margin: 0 22px 15px 0; }

        .bx-book-img img{ height: 210px; }

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
$sql = "SELECT * FROM `book` WHERE `book_id` = '$bookId'";
$result = mysql_query($sql, $conn);
$success = mysql_num_rows($result);

if($success){
    while($row = mysql_fetch_array($result)){
        $bookId = $row["book_id"];
        $bookName = $row["title"];
        $bookAuthor = $row["author"];
        $bookPublisher = $row["publisher"];
        $bookPubdate = $row["pubdate"];
        //解释书籍状态，获取剩余应还天数
        if($row["status"] == 1){
            $bookStatus = "在馆可借";
            $bookExpireDate = "-";
            $bookBackDay = "-";
        } elseif($row["status"] == 0){
            $bookStatus = "借出未还";
            //借出日的时间戳
            $borrowDateStamp = strtotime($row["borrow_date"]);
            //当前的时间戳
            $nowDateStamp = strtotime(date("Y-m-d"));
            //到期那天的时间戳
            $bookExpireStamp = BORROW_DAY * 24 * 60 * 60 + $borrowDateStamp;
            //到期时间
            $bookExpireDate = date("Y-m-d", $bookExpireStamp);
            //剩余时间
            $bookBackDay = BORROW_DAY - ($nowDateStamp - $borrowDateStamp) / (60 * 60 * 24) - 1;
        } else{
            $bookStatus = "状态错误";
            $bookExpireDate = "-";
            $bookBackDay = "-";
        }
        $bookProvider = $row["provider"];
        $bookSummary = $row["summary"];
        $bookISBN = $row["isbn13"];
        $bookPages = $row["pages"];
        $bookImg = "book_img/" . $row["image"];
        $bookTags = explode(",", $row["tags"]);
    }
} else{
    $bookName = "没有找到该书的信息";
    $bookTags = explode(",", $bookName);
    $bookImg = "../img/book_default_img.png";
}
?>

<!--书籍主要信息-->
<div class = "container">
    <div class = "page-header"><h2><?php echo $bookName ?></h2></div>
    <div class = "row">
        <div class = "span9">
            <div class = "f-fl bx-book-img"><img src = "<?php echo @$bookImg ?>" class = "img-polaroid"></div>
            <div>
                <p>作者：<strong><?php echo @$bookAuthor ?></strong></p>
                <p>出版社：<strong><?php echo @$bookPublisher ?></strong></p>
                <p>出版时间：<strong><?php echo @$bookPubdate ?></strong></p>
                <p>状态：<strong><?php echo @$bookStatus ?></strong></p>
                <p>应还日期：<strong><?php echo @$bookExpireDate ?></strong></p>
                <p>提供者：<strong><?php echo @$bookProvider ?></strong></p>
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
                foreach($bookTags as $tag){
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
    <p class = "f-ti2"><?php echo @$bookSummary ?></p>
</div>

<!--书籍其他信息-->
<div class = "container">
    <h4>其他</h4>
    <p>ISBN：<strong><?php echo @$bookISBN ?></strong></p>
    <p>页数：<strong><?php echo @$bookPages ?></strong></p>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>