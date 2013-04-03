<?php
/**
 * User: Baoxu
 * Date: 13-4-2
 * Time: 下午2:46
 */
header("Content-Type:application/json; charset=utf-8");
header("Cache-Control: must-revalidate, no-cache, private");

//获取传递过来的查询字符串
$isbn = $_GET["isbn"];
$url = "http://api.douban.com/v2/book/isbn/" . $isbn . "?apikey=0ca04965f8c1335425e0dc31ea4399fc";

//获取豆瓣数据，打印出JSON
$json = @file_get_contents($url);
if($json){
    echo $json;
} else{
    echo "{}";
}
