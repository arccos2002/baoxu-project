<?php
//定义从服务器获取数据地址的常量
//在网易新闻API主机名
$GET_DATA_HOST = "http://c.3g.163.com";

//获取传递过来的查询类型与查询字符串
$requestType = $_REQUEST['type'];
$queryColumnID = $_REQUEST['id'];
$queryStart = $_REQUEST['start'];
$queryEnd = $_REQUEST['end'];

$queryString = "/nc/article/".$requestType."/".$queryColumnID."/".$queryStart."-".$queryEnd.".html";
//Encode
//$queryString = urlencode($queryString);

$fetchUrl = $GET_DATA_HOST.$queryString;
//echo $fetchUrl;
//$fetchUrl = "http://c.3g.163.com/nc/article/headline/T1295501906343/0-20.html";
$fetchData = file_get_contents($fetchUrl);
//$fetchData = iconv("UTF-8", "GBK", $fetchData);
echo $fetchData;
?>