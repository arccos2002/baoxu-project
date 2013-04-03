<?php
header("Content-Type:application/json; charset=utf-8");
header("Cache-Control: must-revalidate, no-cache, private");

//变量
$address = "chbaoxu@163.com"; //收件人地址
$name = "用户"; //收件人称呼

//发邮件模块
require("PHPMailer/class.phpmailer.php"); //下载的文件必须放在该文件所在目录
$mail = new PHPMailer(); //建立邮件发送类
$mail->CharSet = "utf-8"; //字符集
$mail->Encoding = "base64"; //编码方式
$mail->IsSMTP(); //使用SMTP方式发送
$mail->Port = 25; //SMTP端口
$mail->SMTPAuth = true; //启用SMTP验证功能
$mail->Host = "smtp.163.com"; //您的企业邮局域名
$mail->Username = "baoxu_test_01@163.com"; //邮箱用户名(请填写完整的email地址)
$mail->Password = "baoxu89"; //邮局密码
$mail->From = "baoxu_test_01@163.com"; //邮件发送者email地址，与上面的邮箱用户名相同
$mail->FromName = "Baoxu"; //发出者称呼
$mail->AddAddress("$address", "$name"); //收件人地址，可以替换成任何想要接收邮件的email信箱,格式是AddAddress("收件人email","收件人姓名")
$mail->IsHTML(true); //是否使用HTML格式

//$mail->AddAttachment("/var/tmp/file.tar.gz"); // 添加附件

$mail->Subject = "PHPMailer测试邮件"; //邮件标题
$mail->Body = "Hello,这是测试邮件"; //邮件内容

if(!$mail->Send()){
    echo '{"status":-1}';
    exit;
}else{
    echo '{"status":1}';
}

