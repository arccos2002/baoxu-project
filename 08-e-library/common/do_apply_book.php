<?php
/**
 * User: Baoxu
 * Date: 13-4-2
 * Time: 下午2:46
 * 点击申请阅读之后，先判断是否已经申请过了，没申请过的话就写数据库
 */
header("Content-Type:application/json; charset=utf-8");
header("Cache-Control: must-revalidate, no-cache, private");

include "conn.php";
include "function.php";

//获取传递过来的查询字符串
$bookId = $_GET["bookId"];

//从Cookie中获取用户ID
$userId = getDataFromCookie("id", $_COOKIE["userCode"]);

//判断用户是不是已经申请了这本书，如果已经申请了，返回2
if(checkApplyBook($userId, $bookId, $conn)){
    echo '{"apply":2}';
} else{
    //没申请的话写表，写入成功返回1，不成功返回0
    if(applyBook($userId, $bookId, $conn)){
        echo '{"apply":1}';
    } else{
        echo '{"apply":0}';
    }
}