<?php
/**
 * User: Baoxu
 * Date: 13-4-2
 * Time: 下午3:50
 */

include "../common/conn.php";
include "../common/function.php";

echo "正在处理...";

//图片存储路径
$picDir = "../user/user_img/";
//用时间戳做图片文件名
$picName = $_POST["mail"] . ".jpg";

/**
 * 存储用户上传的图片的函数
 * @param $dir  图片存储的路径
 * @param $name 存储的图片名
 * @return bool 是否成功
 */
function savePic($dir, $name){
    if((($_FILES["head"]["type"] == "image/gif") || ($_FILES["head"]["type"] == "image/jpeg") || ($_FILES["head"]["type"] == "image/pjpeg")) && ($_FILES["head"]["size"] < 300000)){
        if($_FILES["head"]["error"] > 0){
            //echo "Return Code: " . $_FILES["head"]["error"] . "<br />";
            return false;
        } else{
            //echo "Upload: " . $_FILES["head"]["name"] . "<br />";
            //echo "Type: " . $_FILES["head"]["type"] . "<br />";
            //echo "Size: " . ($_FILES["head"]["size"] / 1024) . " Kb<br />";
            //echo "Temp file: " . $_FILES["head"]["tmp_name"] . "<br />";
            move_uploaded_file($_FILES["head"]["tmp_name"], $dir . $name);
            return true;
        }
    } else{
        return false;
    }
}

//根据图片是否上传成功，保存不同的文件名
if(savePic($picDir, $picName)){
    $userHeadUrl = $picName;
} else{
    $userHeadUrl = "";
}

//补全用户邮箱
$userMail = $_POST["mail"] . "@corp.netease.com";
//获取当前时间为用户注册时间
$userRegistTime = date("Y-m-d");
//计算验证码
$userVerifyCode = md5($userMail . $userRegistTime);

//输入数据库SQL
$saveUserSql = "INSERT INTO `user` (`user_id`, `name`, `mail`, `password`, `admin`, `phone`, `head`, `sign`, `level`, `regist_time`, `last_login`, `status`, `verify_code`) VALUES (NULL, '" . $_POST["name"] . "', '" . $userMail . "', '" . md5($_POST["password"]) . "', '0', '" . $_POST["phone"] . "', '" . $userHeadUrl . "', '" . $_POST["sign"] . "', '0', '" . $userRegistTime . "', '" . NULL . "', '0','" . $userVerifyCode . "');";
$result = mysql_query($saveUserSql, $conn);

if(!$result){
    die('Error: ' . mysql_error());
} else{
    $verifyURL = "http://" . HOST . DOCROOT . "user/verifyUser.php?code=" . $userVerifyCode;
    $mailContent = "你好，请点击这个链接完成您的注册(如果链接无法点击，请复制到浏览器打开)：<a href='" . $verifyURL . "'>" . $verifyURL . "</a>";
    $sendMailResult = sendMail($userMail, $_POST["name"], "JustRead验证邮件", $mailContent);
    if($sendMailResult){
        echo "<script language='javascript' type='text/javascript'>";
        echo "window.location.href='../user/regist_ok.php'";
        echo "</script>";
    } else{
        echo "<br>对不起，验证邮件发送失败，请联系管理员！";
    }
}
