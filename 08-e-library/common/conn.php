<?php
/**
 * User: Baoxu
 * Date: 13-4-1
 * Time: 下午6:26
 * 连接数据库
 */

include "global.php";

$conn = mysql_connect(DB_HOST, DB_USER, DB_PASS);
mysql_select_db(DB_NAME, $conn);
mysql_query("SET NAMES 'utf8'");
