<?php
/**
 * User: Baoxu
 * Date: 13-4-1
 * Time: 下午7:07
 */

include "common/conn.php";

$userid = $_GET["userId"];
$password = $_GET["password"];

$verify_sql = "SELECT * FROM `user` WHERE `user_id` = '' AND `password` = ''";