<!DOCTYPE html>
<html>
<head>
    <meta charset = "utf-8" />
    <title>编辑个人资料-Just Read后台</title>
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

<!--查询用户信息-->
<?php
//从cookie中获取用户ID
$userId = getDataFromCookie("id", $_COOKIE["userCode"]);
$userInfo = getUserInfoById($userId, $conn);
?>

<!--内容主体-->
<div class = "container">
    <div class = "page-header"><h2>编辑资料</h2></div>
    <form class = "form-horizontal" name = "userRegister" id = "userRegister" action = "../admin/user_update_info.php" enctype = "multipart/form-data" method = "post">
        <div class = "control-group">
            <label class = "control-label" for = "name">姓名</label>
            <div class = "controls">
                <input type = "text" id = "name" name = "name" maxlength = "5" class = "span3" required = "required" placeholder = "请填写真实姓名" value = "<?php echo $userInfo["name"] ?>">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "phone">手机号</label>
            <div class = "controls">
                <input type = "text" id = "phone" name = "phone" maxlength = "11" size = "11" placeholder = "请输入手机号" value = "<?php echo $userInfo["phone"] ?>">
            </div>
        </div>

        <div class = "control-group">
            <label class = "control-label" for = "sign">签名档</label>
            <div class = "controls">
                <textarea id = "sign" name = "sign" rows = "3" maxlength = "70" class = "span7" placeholder = "不要超过70个字"><?php echo $userInfo["sign"] ?></textarea>
            </div>
        </div>

        <div class = "control-group">
            <div class = "controls">
                <button type = "submit" class = "btn btn-primary">&nbsp;保&nbsp;存&nbsp;</button>
            </div>
        </div>
    </form>
</div>

<!--引入页尾文件-->
<?php include "../common/foot.php"; ?>