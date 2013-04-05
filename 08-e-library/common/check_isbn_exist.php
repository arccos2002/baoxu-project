<?php
/**
 * User: Baoxu
 * Date: 13-4-4
 * Time: 下午12:07
 * 注册时候检查用户输入的书籍ISBN13是否已经存在
 */
header("Content-Type:application/json; charset=utf-8");
header("Cache-Control: must-revalidate, no-cache, private");

include "conn.php";
include "function.php";

//检查这个邮箱名字是否存在，存在返回1，不存在返回0
if(checkIsbnExist($_GET["isbn13"], $conn)){
    echo '{"exists":1}';
} else{
    echo '{"exists":0}';
}