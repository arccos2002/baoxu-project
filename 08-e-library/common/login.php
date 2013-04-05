<?php
/**
 * User: Baoxu
 * Date: 13-4-1
 * Time: 下午7:07
 * 处理用户登录并写COOKIE
 */
header("Content-Type:application/json; charset=utf-8");
header("Cache-Control: must-revalidate, no-cache, private");

include "conn.php";
include "function.php";

//获取QueryString
$mail = $_GET["mail"];
$password = $_GET["password"];
$pass_md5 = md5($password);

//查询数据库
$verify_sql = "SELECT * FROM `user` WHERE `mail` = '" . $mail . "' AND `password` = '" . $pass_md5 . "'";
$result = mysql_query($verify_sql, $conn);
$success = mysql_num_rows($result);

//返回结果
if($success){
    while($row = mysql_fetch_array($result)){
        echo '{"status":1,"userId":' . $row["user_id"] . ',"name":"' . $row["name"] . '","mail":"' . $row["mail"] . '"' . '}';

        /*写Cookie*/
        $userIdAdmin = $row["user_id"] . $row["admin"];
        setcookie("userCode", encodeCookie($userIdAdmin) . $userIdAdmin, time() + 3600, "/");
        setcookie("userMail", $row["mail"], time() + 3600, "/");
        setcookie("userName", $row["name"], time() + 3600, "/");
    }
} else{
    echo '{"status":-1}';
}
