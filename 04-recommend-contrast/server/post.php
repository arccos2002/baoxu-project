<?php

//链接数据库
include("conn.php");

//获取传递过来的查询类型与查询字符串
$recomId = $_REQUEST['recommendid'];
$attitude = $_REQUEST['attitude'];

//查询是否存在要更新的记录，有则继续执行，没有则返回error
$sql = "SELECT * FROM `software` WHERE `id`='$recomId'";
$result = mysql_query($sql);
if($row = mysql_fetch_array($result)){
	//更新用户的态度
    $sql = "UPDATE `recommend_contrast`.`software` SET `attitude` = '$attitude' WHERE `software`.`id` = '$recomId' LIMIT 1;";
    mysql_query($sql);
    echo "success";
}else{
	echo "error";
}

?>