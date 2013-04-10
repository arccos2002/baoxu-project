<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
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
$sql = "SELECT * FROM `user`";
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
            <th>ID</th>
            <th>姓名</th>
            <th>邮箱</th>
            <th>手机号</th>
            <th>等级</th>
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
                echo '<td><a href = "user_info.php?userId=' . $userId . '">' . $userId . '</a></td>';
                echo '<td>' . $userName . '</td>';
                echo '<td>' . $userMail . '</td>';
                echo '<td>' . $userPhone . '</td>';
                echo '<td>' . $userLevel . '</td>';
                echo '<td>' . $userStatus . '</td>';
                echo '<td>' . "管理" . '</td>';
                echo '</tr>';
            }
        } else{
            echo '没有书！';
        }
        ?>

    </table>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>