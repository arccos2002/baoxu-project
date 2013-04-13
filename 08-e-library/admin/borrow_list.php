<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <meta content = "width=device-width, initial-scale=1.0" name = "viewport">
    <title>借阅列表—Just Read</title>
    <link rel = "stylesheet" href = "../css/bootstrap.min.css">
    <link rel = "stylesheet" href = "../css/global.css">
    <link rel = "stylesheet" href = "../css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "../css/function.css">
    <style type = "text/css">
        .bx-borrow-list-subnav{ margin-bottom: 20px; }
    </style>
</head>
<body>

<!--引入导航文件-->
<?php include "../common/nav.php"; ?>

<!--判断用户权限-->
<?php include "../common/check_admin_permission.php"; ?>

<!--读取数据库，获取用户列表-->
<?php
//判断url中的参数，如果没有参数
if(!array_key_exists("type", $_GET)){
    $sql = "SELECT * FROM `borrow` ORDER BY `borrow_id` DESC";
    //分类导航
    $subNav = '<a class = "btn" href = "?type=apply">申请中</a>
            <a class = "btn" href = "?type=borrow">借阅中</a>
            <a class = "btn" href = "?type=return">已归还</a>
            <a class = "btn btn-primary" href = "?type=">全部</i></a>';
    //管理菜单
    $manageMenu = "";
} else{
    //有参数的话做如下判断
    switch($_GET["type"]){
        case "apply":
            //选择所有申请状态的数据
            $sql = "SELECT * FROM `borrow` WHERE `type` = '0'";
            //分类导航
            $subNav = '<a class = "btn btn-primary" href = "?type=apply">申请中</a>
            <a class = "btn" href = "?type=borrow">借阅中</a>
            <a class = "btn" href = "?type=return">已归还</a>
            <a class = "btn" href = "?type=">全部</i></a>';
            break;
        case "borrow":
            //选择所有借阅状态的数据
            $sql = "SELECT * FROM `borrow` WHERE `type` = '1'";
            //分类导航
            $subNav = '<a class = "btn" href = "?type=apply">申请中</a>
            <a class = "btn btn-primary" href = "?type=borrow">借阅中</a>
            <a class = "btn" href = "?type=return">已归还</a>
            <a class = "btn" href = "?type=">全部</i></a>';
            break;
        case "return":
            //选择所有归还状态的数据
            $sql = "SELECT * FROM `borrow` WHERE `type` = '2'";
            //分类导航
            $subNav = '<a class = "btn" href = "?type=apply">申请中</a>
            <a class = "btn" href = "?type=borrow">借阅中</a>
            <a class = "btn btn-primary" href = "?type=return">已归还</a>
            <a class = "btn" href = "?type=">全部</i></a>';
            break;
        default:
            //默认选取全部数据
            $sql = "SELECT * FROM `borrow`";
            //分类导航
            $subNav = '<a class = "btn" href = "?type=apply">申请中</a>
            <a class = "btn" href = "?type=borrow">借阅中</a>
            <a class = "btn" href = "?type=return">已归还</a>
            <a class = "btn btn-primary" href = "?type=">全部</i></a>';
            break;
    }
}

//执行sql语句
$result = mysql_query($sql, $conn);
$success = mysql_num_rows($result);
?>

<!--页面主体-->
<div class = "container">
    <div class = "btn-toolbar bx-borrow-list-subnav">
        <div class = "btn-group">
            <?php echo $subNav ?>
        </div>
    </div>

    <table class = "table table-bordered table-hover table-striped">
        <thead>
        <tr>
            <th>借阅ID</th>
            <th>姓名</th>
            <th>书名</th>
            <th>借阅状态</th>
            <th>是否续借</th>
            <th>操作日期</th>
            <th>应还日期</th>
            <th>管理</th>
        </tr>
        </thead>
        <tbody>

        <?php
        //返回结果，打印TR
        if($success){
            while($row = mysql_fetch_array($result)){
                //借阅ID
                $borrowId = $row["borrow_id"];
                //用户ID
                $userId = $row["user_id"];
                //通过ID获取用户名称
                $userInfo = getUserInfoById($userId, $conn);
                $userName = $userInfo["name"];
                //书籍ID
                $bookId = $row["book_id"];
                //通过ID获取书籍信息
                $bookInfo = getBookInfoById($bookId, $conn);
                $bookTitle = $bookInfo["title"];
                //是否续借
                $isRenew = $row["renew"];
                //操作时间
                $actionDate = $row["date"];
                //借阅状态
                $type = $row["type"];

                //根据借阅状态的不同，有些字段是不显示的
                switch($type){
                    case "0":
                        $borrowType = "申请中";
                        $borrowRenew = "-";
                        $returnDate = "-";
                        //管理菜单
                        $manageMenu = '<a href="#" data-event-tag="et_loan_book_btn" data-book-id="' . $bookId . '"data-borrow-id="' . $borrowId . '">借出</a>';
                        break;
                    case "1":
                        $borrowType = "借阅中";
                        //借出日的时间戳
                        $borrowDateStamp = strtotime($row["date"]);
                        //当前的时间戳
                        $nowDateStamp = strtotime(date("Y-m-d"));
                        //如果有续借
                        if($isRenew){
                            $borrowRenew = "已续借";
                            //到期那天的时间戳，算上续借的天数
                            $bookExpireStamp = (BORROW_DAY + RENEW_DAY) * 24 * 60 * 60 + $borrowDateStamp;
                            //到期日期
                            $returnDate = date("Y-m-d", $bookExpireStamp);
                        } else{
                            $borrowRenew = "未续借";
                            //到期那天的时间戳
                            $bookExpireStamp = BORROW_DAY * 24 * 60 * 60 + $borrowDateStamp;
                            //到期日期
                            $returnDate = date("Y-m-d", $bookExpireStamp);
                        }
                        //管理菜单
                        $manageMenu = '<a href="#" data-event-tag="et_return_book_btn" data-book-id="' . $bookId . '"data-borrow-id="' . $borrowId . '">还回</a>&nbsp;&nbsp;&nbsp;
                        <a href="#" data-event-tag="et_renew_book_btn" data-book-id="' . $bookId . '"data-borrow-id="' . $borrowId . '">续借</a>';
                        break;
                    case "2":
                        $borrowType = "已归还";
                        $borrowRenew = "-";
                        $returnDate = "-";
                        //管理菜单
                        $manageMenu = "-";
                        break;
                    default:
                        $borrowType = "-";
                        $borrowRenew = "-";
                        $returnDate = "-";
                        //管理菜单
                        $manageMenu = "-";
                }


                //填充表格
                echo '<tr>';
                echo '<td>' . $borrowId . '</td>';
                echo '<td>' . $userName . '</td>';
                echo '<td>' . $bookTitle . '</td>';
                echo '<td>' . $borrowType . '</td>';
                echo '<td>' . $borrowRenew . '</td>';
                echo '<td>' . $actionDate . '</td>';
                echo '<td>' . $returnDate . '</td>';
                echo '<td>' . $manageMenu . '</td>';
                echo '</tr>';
            }
        } else{
            echo '没有项目！';
        }
        ?>

    </table>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>