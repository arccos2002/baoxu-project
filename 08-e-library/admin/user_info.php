<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <title>用户信息—Just Read</title>
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

<!--判断参数-->
<?php include "../common/check_parameter.php"; ?>

<!--读取数据库，获取用户信息-->
<?php
$userId = $_GET["userId"];
$userInfo = getUserInfoById($userId, $conn);
//如果返回用户信息为空
if(!$userInfo){
    echo '<div class = "container text-center bx-dialog-info">
    <p><i class = "icon-remove"></i>&nbsp;&nbsp;该用户不存在，请重试！</p></div>';
    include "../common/foot.php";
    exit;
}
?>

<!--主要信息-->
<div class = "container">
    <div class = "page-header"><h2><?php echo $userInfo["name"] ?></h2></div>
    <div class = "row">
        <div class = "span9">
            <div class = "f-fl bx-user-head-img"><img src = "<?php echo "../user/user_img/".$userInfo["head"] ?>" class = "img-polaroid"></div>
            <div>
                <p>邮箱：<strong><?php echo $userInfo["mail"] ?></strong></p>
                <p>手机：<strong><?php echo $userInfo["phone"] ?></strong></p>
                <p>签名档：<strong><?php echo $userInfo["sign"] ?></strong></p>
                <p>状态：<strong><?php echo $userInfo["status_str"] ?></strong></p>
                <p>等级：<strong><?php echo $userInfo["level"] ?>级</strong></p>
            </div>
        </div>
        <div class = "span3">
            <h4>他喜欢</h4>
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
            <a href = "#"><img src = "../book/book_img/9787121141638.jpg" class = "img-polaroid bx-read-history-img"></a>
            <p><a href = "#">132465432154</a></p>
        </div>
        <div class = "span2">
            <a href = "#"><img src = "../book/book_img/9787115275790.jpg" class = "img-polaroid bx-read-history-img"></a>
            <p><a href = "#">132465432154</a></p>
        </div>
        <div class = "span2">
            <a href = "#"><img src = "../book/book_img/9787121105777.jpg" class = "img-polaroid bx-read-history-img"></a>
            <p><a href = "#">132465432154</a></p>
        </div>
        <div class = "span2">
            <a href = "#"><img src = "../book/book_img/9787121141638.jpg" class = "img-polaroid bx-read-history-img"></a>
            <p><a href = "#">132465432154</a></p>
        </div>
        <div class = "span2">
            <a href = "#"><img src = "../book/book_img/9787115275790.jpg" class = "img-polaroid bx-read-history-img"></a>
            <p><a href = "#">132465432154</a></p>
        </div>
        <div class = "span2">
            <a href = "#"><img src = "../book/book_img/9787121105777.jpg" class = "img-polaroid bx-read-history-img"></a>
            <p><a href = "#">132465432154</a></p>
        </div>
    </div>
</div>

<!--书籍其他信息-->
<div class = "container">
    <h4>其他</h4>
    <p>注册时间：<strong><?php echo $userInfo["regist_time"] ?></strong></p>
    <p>最近登录：<strong><?php echo $userInfo["last_login"] ?></strong></p>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>