<?php
/**
 * User: Baoxu
 * Date: 13-4-9
 * Time: 下午6:39
 * 确认书目还回
 */
header("Content-Type:application/json; charset=utf-8");
header("Cache-Control: must-revalidate, no-cache, private");

include "conn.php";
include "function.php";

//获取传递过来的查询字符串
$bookId = $_GET["bookId"];
$borrowId = $_GET["borrowId"];

//从Cookie中获取用户ID
$userId = getDataFromCookie("id", $_COOKIE["userCode"]);

//执行借出程序
if(returnBook($bookId, $borrowId, $conn)){
    echo '{"state":1}';
} else{
    echo '{"state":0}';
}