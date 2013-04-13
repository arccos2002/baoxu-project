<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <meta content = "width=device-width, initial-scale=1.0" name = "viewport">
    <title>书籍列表—Just Read</title>
    <link rel = "stylesheet" href = "../css/bootstrap.min.css">
    <link rel = "stylesheet" href = "../css/global.css">
    <link rel = "stylesheet" href = "../css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "../css/function.css">
</head>
<body>

<!--引入导航文件-->
<?php include "../common/nav.php"; ?>

<!--判断用户权限-->
<?php include "../common/check_user_permission.php"; ?>

<!--读取数据库，获取数目列表-->
<?php
$bookCount = getListCount("book", $conn);
$bookPageCount = ceil($bookCount / PAGE_SIZE);

//判断GET中是否有page参数
if(!array_key_exists("page", $_GET)){
    $nowPage = 1;
} else{
    if($_GET["page"] <= 0){
        $nowPage = 1;
    } else{
        $nowPage = $_GET["page"];
    }
}

if($nowPage == 1){
    if($bookPageCount == 1){
        $pageNav = '<li class="active"><span>&laquo; Prev</span></li>
                    <li class="active"><span>Next &raquo;</span></li>';
    } else{
        $pageNav = '<li class="active"><span>&laquo; Prev</span></li>
                    <li><a href="?page=' . ($nowPage + 1) . '">Next &raquo;</a></li>';
    }
} elseif($nowPage == $bookPageCount){
    $pageNav = '<li><a href="?page=' . ($nowPage - 1) . '">&laquo; Prev</a></li>
                <li class="active"><span>Next &raquo;</span></li>';
} else{
    $pageNav = '<li><a href="?page=' . ($nowPage - 1) . '">&laquo; Prev</a></li>
                <li><a href="?page=' . ($nowPage + 1) . '">Next &raquo;</a></li>';
}

$sql = "SELECT * FROM `book` ORDER BY `book_id` DESC LIMIT " . ($nowPage - 1) * PAGE_SIZE . "," . PAGE_SIZE;
$result = mysql_query($sql, $conn);
$success = mysql_num_rows($result);
?>

<!--页面主体-->
<div class = "container">
    <div class = "input-append f-fr">
        <label for = "appendedInputButton" class = "f-dn"></label>
        <input class = "span3" id = "appendedInputButton" placeholder = "书名" type = "text">
        <button class = "btn" type = "button">搜索</button>
    </div>
</div>

<div class = "container">
    <table class = "table table-bordered table-hover table-striped">
        <thead>
        <tr>
            <th>书名</th>
            <th class = "hidden-phone">编号</th>
            <th>作者</th>
            <th class = "hidden-phone">状态</th>
            <th class = "hidden-phone">应还日期</th>
        </tr>
        </thead>
        <tbody>

        <?php
        //返回结果，打印TR
        if($success){
            while($row = mysql_fetch_array($result)){
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

                //填充表格
                echo '<tr>';
                echo '<td><a href = "info.php?bookId=' . $row["book_id"] . '">' . $row["title"] . '</a></td>';
                echo '<td class="hidden-phone">' . $row["book_id"] . '</td>';
                echo '<td>' . $row["author"] . '</td>';
                echo '<td class="hidden-phone">' . $bookStatus . '</td>';
                echo '<td class="hidden-phone">' . $bookExpireDate . '</td>';
                echo '</tr>';
            }
        } else{
            echo '<tr>';
            echo '<td>没有书</td>';
            echo '</tr>';
        }
        ?>
    </table>

    <!--导航条-->
    <div class = "pagination">
        <ul>
            <?php echo $pageNav ?>
        </ul>
    </div>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>