<?php

$HOST="localhost";
$USER="baoxu";
$PASS="baoxu";

$con = mysql_connect($HOST,$USER,$PASS);
if (!$con){
	die('Could not connect: ' . mysql_error());
}

//echo "Success";

mysql_select_db("recommend_contrast", $con);

?>