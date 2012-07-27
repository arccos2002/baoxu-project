<?php
//定义从服务器获取数据地址的常量
//获取用户数据的主机名
$GET_DATA_HOST = "http://123.123.123.123";

//获取传递过来的查询类型与查询字符串
//$requestType = $_REQUEST['type'];
$passPort = $_REQUEST['passport'];
$querySize = $_REQUEST['size'];

$queryString = "?passport=".$passPort."&size=".$querySize;

//Encode
//$queryString = urlencode($queryString);

//正式环境用这个
//$fetchUrl = $GET_DATA_HOST.$queryString;

//测试用的数据抓取路径
$fetchUrl = "http://localhost/baoxu-project/03-recommend-contrast/testdata/data.json";

//echo $fetchUrl;

$fetchData = file_get_contents($fetchUrl);
//$fetchData = iconv("UTF-8", "GBK", $fetchData);
echo $fetchData;
?>