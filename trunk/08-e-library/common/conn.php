<?php
/**
 * User: Baoxu
 * Date: 13-4-1
 * Time: 下午6:26
 */

$host = "localhost";
$user = "baoxu";
$pass = ",.";
$db = "library";

$conn = mysql_connect($host,$user,$pass);
mysql_select_db($db,$conn);
mysql_query("SET NAMES 'utf8'");

include "global.php";