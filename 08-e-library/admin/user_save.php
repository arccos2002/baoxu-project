<?php
/**
 * User: Baoxu
 * Date: 13-4-2
 * Time: 下午3:50
 */

include "../common/conn.php";
include "../common/function.php";

//图片存储路径
$picDir = "../user/user_img/";
//用时间戳做图片文件名
$picName = time() . ".jpg";
$picUrl = $picDir . $picName;

if((($_FILES["head"]["type"] == "image/gif") || ($_FILES["head"]["type"] == "image/jpeg") || ($_FILES["head"]["type"] == "image/pjpeg")) && ($_FILES["head"]["size"] < 1000000)){
    if($_FILES["head"]["error"] > 0){
        //echo "Return Code: " . $_FILES["head"]["error"] . "<br />";
    } else{
        //echo "Upload: " . $_FILES["head"]["name"] . "<br />";
        //echo "Type: " . $_FILES["head"]["type"] . "<br />";
        //echo "Size: " . ($_FILES["head"]["size"] / 1024) . " Kb<br />";
        //echo "Temp file: " . $_FILES["head"]["tmp_name"] . "<br />";
        move_uploaded_file($_FILES["head"]["tmp_name"], $picUrl);
        //echo "Stored in: " . $picDir . $picName;
    }
} else{
    echo "Invalid file";
}

//补全用户邮箱
$userMail = $_POST["mail"] . "@corp.netease.com";
//获取当前时间为用户注册时间
$userRegistTime = date("Y-m-d");
//计算验证码
$userVerifyCode = md5($userMail . $userRegistTime);

$saveUserSql = "INSERT INTO `user` (`user_id`, `name`, `mail`, `password`, `admin`, `phone`, `head`, `sign`, `level`, `regist_time`, `last_login`, `status`, `verify_code`) VALUES (NULL, '" . $_POST["name"] . "', '" . $userMail . "', '" . $_POST["password"] . "', '0', '" . $_POST["phone"] . "', '" . $picName . "', '" . $_POST["sign"] . "', '0', '" . $userRegistTime . "', '" . NULL . "', '0','" . $userVerifyCode . "');";
//echo $saveUserSql;
//exit;
$result = mysql_query($saveUserSql, $conn);

if(!$result){
    die('Error: ' . mysql_error());
} else{
    sendMail($userMail, $_POST["name"], "JustRead验证邮件", "http://" . HOST . DOCROOT . "user/verifyUser.php?code=" . $userVerifyCode);
    echo "<script language='javascript' type='text/javascript'>";
    echo "window.location.href='../user/regist_ok.php'";
    echo "</script>";
}
