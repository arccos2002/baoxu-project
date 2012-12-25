<?php
//定义从服务器获取数据地址的常量
//在网易新闻API主机名
$GET_DATA_HOST = "http://c.3g.163.com";

//获取传递过来的查询类型与查询字符串
$requestType = $_REQUEST['type'];
$queryColumnID = $_REQUEST['column'];
$queryStart = $_REQUEST['start'];
$querySize = $_REQUEST['size'];

$queryString = "/nc/article/" . $requestType . "/" . $queryColumnID . "/" . $queryStart . "-" . $querySize . ".html";

//Encode
//$queryString = urlencode($queryString);

//正式环境用这个
$fetchUrl = $GET_DATA_HOST . $queryString;

//测试用的数据抓取路径
//$fetchUrl = "http://localhost/baoxu-project/01-baoxu-ntes-news/testdata/0-20.html";

$fetchData = file_get_contents($fetchUrl);
//$fetchData = iconv("UTF-8", "GBK", $fetchData);
$temp_str_1 = "\":[{";
$fetchData = str_replace($queryColumnID.$temp_str_1,"xhrData".$temp_str_1.'"cid":"'.$queryColumnID.'",',$fetchData);
echo $fetchData;
?>