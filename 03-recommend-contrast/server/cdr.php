<?php
//定义从服务器获取数据地址的常量
//获取用户数据的主机名
$GET_DATA_HOST = "http://123.123.123.123";

//链接数据库
include("conn.php");

//获取传递过来的查询类型与查询字符串
$passPort = $_REQUEST['passport'];
$userName = $_REQUEST['username'];
$querySize = $_REQUEST['size'];

$queryString = "?passport=".$passPort."&size=".$querySize;

//Encode
//$queryString = urlencode($queryString);

//正式环境用这个
//$fetchUrl = $GET_DATA_HOST.$queryString;

//测试用的数据抓取路径
$fetchUrl = "http://localhost/baoxu-project/03-recommend-contrast/testdata/data.json";

//获取JSON值
$fetchData = file_get_contents($fetchUrl);
//$fetchData = iconv("UTF-8", "GBK", $fetchData);
//echo $fetchData;

//解析JSON值
$phpJson = json_decode($fetchData);

//判断这个json是不是有效的
if(!is_object($phpJson)){
	printError("CBX_ERROR_001","服务器返回数据异常");
	exit;
}else if(!array_key_exists("passport", $phpJson)){
	printError("CBX_ERROR_002","通行证不正确");
	exit;
}

//从JSON中获取用户通行证
$thePassport = $phpJson->passport;
//从JSON中获取用户装过数
$theInstCount = $phpJson->install_count;

//查询是否存在该通行证，没有则插入数据
$sql = "SELECT * FROM `user` WHERE `passport`='$thePassport'";
$result = mysql_query($sql);
if($row = mysql_fetch_array($result)){
	//insertData($phpJson,$thePassport,$userName,$theInstCount);
	refactorJson($thePassport,$userName);
}else{
	insertData($phpJson,$thePassport,$userName,$theInstCount);
	refactorJson($thePassport,$userName);
}



//从服务器获取的JSON数据插入数据库
function insertData($phpJson,$thePassport,$userName,$theInstCount){
	//插入数据库用户表
    $sqlString_1 = "INSERT INTO `recommend_contrast`.`user` (`id` ,`passport` ,`name`,`install_count`) VALUES (NULL ,'$thePassport', '$userName','$theInstCount');";
    $sqlResult_1 = mysql_query($sqlString_1);
    //如果插入失败，返回error
    if(!$sqlResult_1){
    	echo "error";
    	exit;
    }

    //将软件推荐数据插入软件表
    for($i=0;$i<count($phpJson->software);$i++){
    	$theInstalled = $phpJson->software[$i]->installed;
		$theInstalledIcon = $phpJson->software[$i]->installed_icon;
    	$theInstalledUrl = $phpJson->software[$i]->installed_url;
    	$theRecommend = $phpJson->software[$i]->recommend;
		$theRecommendIcon = $phpJson->software[$i]->recommend_icon;
    	$theRecommendUrl = $phpJson->software[$i]->recommend_url;
    	$sqlString_2 = "INSERT INTO `recommend_contrast`.`software` (`id` ,`passport`,`installed` ,`installed_icon`,`installed_url`,`recommend`,`recommend_icon`,`recommend_url`) VALUES (NULL ,'$thePassport','$theInstalled','$theInstalledIcon','$theInstalledUrl','$theRecommend','$theRecommendIcon','$theRecommendUrl');";
        $sqlResult_2 = mysql_query($sqlString_2);
        //如果插入失败，返回error
        if(!$sqlResult_2){
        	echo "error";
        	exit;
        }
    }
}



function refactorJson($thePassport,$userName){
	//定义软件数组，重组软件表
    $softArray = array();
    //查询数据库软件表，获取给用户的推荐列表
    $sqlString_3 = "SELECT * FROM `software` WHERE `passport`='$thePassport'";
    $result = mysql_query($sqlString_3);
    while($row = mysql_fetch_array($result)){
    	$softArrayItem = array();
    	$softArrayItem["id"]=$row['id'];
    	$softArrayItem["installed"]=$row['installed'];
		$softArrayItem["installed_icon"]=$row['installed_icon'];
    	$softArrayItem["installed_url"]=$row['installed_url'];
    	$softArrayItem["recommend"]=$row['recommend'];
		$softArrayItem["recommend_icon"]=$row['recommend_icon'];
    	$softArrayItem["recommend_url"]=$row['recommend_url'];
    	$softArrayItem["attitude"]=$row['attitude'];

    	array_push($softArray,$softArrayItem);

    }
    //重组全表
    $fullData = array
    (
		"nowSta"=>"success",
    	"passport"=>$thePassport,
    	"username"=>$userName,
    	"software"=>$softArray
    );

    //打印表结构
    //print_r($fullData);

    //转为JSON，重新组织输出
    echo json_encode($fullData);
}


function printError($errorClass,$errorWhy){
	$theError = array
	(
		"nowSta"=>"error",
		"class"=>$errorClass,
		"cause"=>$errorWhy
	);
	echo json_encode($theError);
}

?>