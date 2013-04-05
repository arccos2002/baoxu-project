<?php
/**
 * User: Baoxu
 * Date: 13-4-2
 * Time: 上午11:22
 * 处理用户注销并删除COOKIE
 */
header("Content-Type:application/json; charset=utf-8");
header("Cache-Control: must-revalidate, no-cache, private");

//删除COOKIE
setcookie("userCode", "", time() - 3600, "/");
setcookie("userMail", "", time() - 3600, "/");
setcookie("userName", "", time() - 3600, "/");

echo '{"status":1}';