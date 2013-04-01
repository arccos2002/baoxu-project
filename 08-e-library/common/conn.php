<?php
/**
 * User: Baoxu
 * Date: 13-4-1
 * Time: 下午6:26
 */

$host = "localhost";
$user = "root";
$pass = "";
$db = "library";

$conn = mysql_connect($host,$user,$pass);
mysql_select_db($db);
mysql_query("SET NAMES 'utf-8'");
?>