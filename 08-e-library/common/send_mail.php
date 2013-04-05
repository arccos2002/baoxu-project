<?php
/**
 * User: Baoxu
 * Date: 13-4-4
 * Time: 下午12:07
 * 发送邮件
 */
header("Content-Type:application/json; charset=utf-8");
header("Cache-Control: must-revalidate, no-cache, private");

include "function.php";

//变量
$address = "chbaoxu@163.com"; //收件人地址
$name = "用户"; //收件人称呼
$title = ""; //邮件主题
$content = ""; //邮件内容

$sendOK = sendMail($address, $name, $title, $content);
