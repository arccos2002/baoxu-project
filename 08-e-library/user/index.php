<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <title>个人中心—Just Read</title>
    <link rel = "stylesheet" href = "../css/bootstrap.min.css">
    <link rel = "stylesheet" href = "css/index.css">
    <link rel = "stylesheet" href = "../css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "../css/function.css">
    <link rel = "stylesheet" href = "../css/global.css">
</head>
<body>

<!--引入导航文件-->
<?php include "../common/nav.php"; ?>

<!--判断用户权限-->
<?php include "../common/check_user_permission.php"; ?>

<!--读取数据库，获取用户信息-->
<?php
$sql = "SELECT * FROM `user` WHERE `user_id` = " . getDataFromCookie("id", $_COOKIE["userCode"]);
$result = mysql_query($sql, $conn);
$success = mysql_num_rows($result);

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
        } elseif($row["status"] == 0){
            $userStatus = "冻结";
        } else{
            $userStatus = "状态错误";
        }
    }
} else{
    $userName = "没有找到该用户的信息";
    $userHead = "../img/book_default_img";
}
?>


<!--书籍主要信息-->
<div class = "container">
    <div class = "page-header"><h2><?php echo $userName ?></h2></div>
    <div class = "row">
        <div class = "span9">
            <div class = "f-fl bx-book-img"><img src = "<?php echo $userHead ?>" class = "img-polaroid"></div>
            <div>
                <p>邮箱：<strong><?php echo $userMail ?></strong></p>
                <p>手机：<strong><?php echo $userPhone ?></strong></p>
                <p>签名档：<strong><?php echo $userSign ?></strong></p>
                <p>状态：<strong><?php echo $userStatus ?></strong></p>
                <p>等级：<strong><?php echo $userLevel ?>级</strong></p>
                <p>
                    <button class = "btn btn-info btn-small" type = "button">修改资料</button>
                </p>
            </div>
        </div>
        <div class = "span3">
            <h4>我喜欢</h4>
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

<div class = "container">
    <h4>社交帐号</h4>
    <p class = "muted">暂不支持</p>
</div>

<!--书籍摘要信息-->
<div class = "container">
    <h4>借阅历史</h4>

    <div class = "row">
        <div class = "span2">
            <a href = "#"><img src = "../img/721159.jpg" class = "img-polaroid"></a>
            <p><a href = "#">132465432154</a></p>
        </div>
        <div class = "span2">
            <a href = "#"><img src = "../img/721159.jpg" class = "img-polaroid"></a>
            <p><a href = "#">132465432154</a></p>
        </div>
        <div class = "span2">
            <a href = "#"><img src = "../img/721159.jpg" class = "img-polaroid"></a>
            <p><a href = "#">132465432154</a></p>
        </div>
        <div class = "span2">
            <a href = "#"><img src = "../img/721159.jpg" class = "img-polaroid"></a>
            <p><a href = "#">132465432154</a></p>
        </div>
        <div class = "span2">
            <a href = "#"><img src = "../img/721159.jpg" class = "img-polaroid"></a>
            <p><a href = "#">132465432154</a></p>
        </div>
        <div class = "span2">
            <a href = "#"><img src = "../img/721159.jpg" class = "img-polaroid"></a>
            <p><a href = "#">132465432154</a></p>
        </div>

    </div>
</div>

<!--书籍其他信息-->
<div class = "container">
    <h4>其他</h4>
    <p>注册时间：<strong><?php echo $userRegistTime ?></strong></p>
    <p>最近登录：<strong><?php echo $userLastLogin ?></strong></p>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>