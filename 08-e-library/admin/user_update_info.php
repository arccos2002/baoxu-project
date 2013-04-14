<?php
/**
 * User: Baoxu
 * Date: 13-4-10
 * Time: 上午11:10
 * 更新用户的基本信息
 */

/*引入主文件*/
include "../common/conn.php";
include "../common/function.php";

//从Cookie中获取UserId
$userId = getDataFromCookie("id", $_COOKIE["userCode"]);

//从POST中获取用户名称，用户手机号，用户签名
$updateInfo = array(
    "name" => $_POST["name"],
    "phone" => $_POST["phone"],
    "sign" => $_POST["sign"]
);

if(updateUserBasicInfo($userId, $updateInfo, $conn)){
    /*写入数据库成功则跳转*/
    jumpToUrl("../user/");
} else{
    echo "未更新数据...";
    jumpToUrl("../user/");
}