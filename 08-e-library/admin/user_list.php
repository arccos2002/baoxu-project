<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <meta content = "width=device-width, initial-scale=1.0" name = "viewport">
    <title>注册用户列表—Just Read</title>
    <link rel = "stylesheet" href = "../css/bootstrap.min.css">
    <link rel = "stylesheet" href = "../css/global.css">
    <link rel = "stylesheet" href = "../css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "../css/function.css">
</head>
<body>

<!--引入导航文件-->
<?php include "../common/nav.php"; ?>

<!--判断用户权限-->
<?php include "../common/check_admin_permission.php"; ?>

<!--读取数据库，获取用户列表-->
<?php
$userCount = getListCount("user", $conn, array());
$userPageCount = ceil($userCount / PAGE_SIZE);

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
    //当前是第一页而且总共只有一页的时候，禁用翻页按钮
    if($userPageCount == 1){
        $pageNav = '<li class="active"><span>&laquo; Prev</span></li>
                    <li class="active"><span>Next &raquo;</span></li>';
    } else{
        //当前是第一页，上一页按钮失效
        $pageNav = '<li class="active"><span>&laquo; Prev</span></li>
                    <li><a href="?page=' . ($nowPage + 1) . '">Next &raquo;</a></li>';
    }
} elseif($nowPage == $userPageCount){
    //如果当前是最后一页，下一页按钮失效
    $pageNav = '<li><a href="?page=' . ($nowPage - 1) . '">&laquo; Prev</a></li>
                <li class="active"><span>Next &raquo;</span></li>';
} else{
    $pageNav = '<li><a href="?page=' . ($nowPage - 1) . '">&laquo; Prev</a></li>
                <li><a href="?page=' . ($nowPage + 1) . '">Next &raquo;</a></li>';
}

$sql = "SELECT * FROM `user` ORDER BY `user_id` DESC LIMIT " . ($nowPage - 1) * PAGE_SIZE . "," . PAGE_SIZE;
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

    <table class = "table table-bordered table-hover table-striped">
        <thead>
        <tr>
            <th>姓名</th>
            <th class = "hidden-phone">编号</th>
            <th class = "hidden-phone">邮箱</th>
            <th>手机号</th>
            <th class = "hidden-phone">等级</th>
            <th>状态</th>
            <th>管理</th>
        </tr>
        </thead>
        <tbody>

        <?php
        //返回结果，打印TR
        if($success){
            while($row = mysql_fetch_array($result)){
                $userId = $row["user_id"];
                $userName = $row["name"];
                $userMail = $row["mail"];
                $userAdmin = $row["admin"];
                $userPhone = $row["phone"];
                $userHead = "user_img/" . $row["head"];
                $userSign = $row["sign"];
                $userLevel = $row["level"];
                $userRegistTime = $row["regist_time"];
                $userLastLogin = $row["last_login"];
                //解释用户状态
                if($row["status"] == 1){
                    $userStatus = "正常";
                } elseif($row["status"] == 2){
                    $userStatus = "冻结";
                } elseif($row["status"] == 0){
                    $userStatus = "未激活";
                } else{
                    $userStatus = "状态错误";
                }

                //填充表格
                echo '<tr>';
                echo '<td><a href = "user_info.php?userId=' . $userId . '">' . $userName . '</a></td>';
                echo '<td class="hidden-phone">' . $userId . '</td>';
                echo '<td class="hidden-phone">' . $userMail . '</td>';
                echo '<td>' . $userPhone . '</td>';
                echo '<td class="hidden-phone">' . $userLevel . '</td>';
                echo '<td>' . $userStatus . '</td>';
                echo '<td>' . "管理" . '</td>';
                echo '</tr>';
            }
        } else{
            echo '没有了！';
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