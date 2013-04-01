<?php
/**
 * User: Baoxu
 * Date: 13-4-1
 * Time: 下午7:07
 */
header("Content-Type:application/json; charset=utf-8");
header("Cache-Control: must-revalidate, no-cache, private");

include "common/conn.php";

$mail = $_GET["mail"];
$password = $_GET["password"];
$pass_md5 = md5($password);

$verify_sql = "SELECT * FROM `user` WHERE `mail` = '".$mail."' AND `password` = '".$pass_md5."'";
$result = mysql_query($verify_sql,$conn);
$success = mysql_num_rows($result);

if($success){
    while($row = mysql_fetch_array($result)){
        echo '{"status":1,"userId":'.$row["user_id"].',"name":"'.$row["name"].'","mail":"'.$row["mail"].'"'.'}';
    }
}else{
    echo '{"status":-1}';
}
