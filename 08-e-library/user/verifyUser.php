<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <meta content = "width=device-width, initial-scale=1.0" name = "viewport">
    <title>用户验证—Just Read</title>
    <link rel = "stylesheet" href = "../css/bootstrap.min.css">
    <link rel = "stylesheet" href = "../css/global.css">
    <link rel = "stylesheet" href = "../css/bootstrap-responsive.min.css">
    <link rel = "stylesheet" href = "../css/function.css">
</head>
<body>

<!--引入导航文件-->
<?php include "../common/nav.php"; ?>

<!--判断参数-->
<?php include "../common/check_parameter.php"; ?>

<!--读取数据库，获取书籍信息-->
<?php
$sql = "UPDATE `user` SET `status` = '1',`verify_code` = NULL WHERE `verify_code` = '" . $_GET["code"] . "'";
$result = mysql_query($sql, $conn);
$sucess = mysql_affected_rows();
?>

<div class = "container text-center bx-dialog-info">
    <?php if($sucess){
    echo '<p><i class = "icon-ok"></i>&nbsp;&nbsp;恭喜，邮箱验证通过，帐号已经激活，请继续<a href="../">登录</a>～</p>';
} else{
    echo '<p><i class = "icon-remove"></i>&nbsp;&nbsp;抱歉，该验证码已经失效，请联系管理员！</p>';
}
    ?>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>