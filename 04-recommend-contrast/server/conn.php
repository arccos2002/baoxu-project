<?php

$HOST="localhost";
$USER="baoxu";
$PASS="baoxu";

$con = mysql_connect($HOST,$USER,$PASS);
if (!$con){
	die('Could not connect: ' . mysql_error());
}

//请注意,这步很关键,如果没有这步,所有的数据读写都会不正确的
//它的作用是设置本次数据库联接过程中,数据传输的默认字符集
mysql_query("set names utf8;");

//echo "Success";

mysql_select_db("recommend_contrast", $con);

?>