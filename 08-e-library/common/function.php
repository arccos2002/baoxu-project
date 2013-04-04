<?php
/**
 * User: Baoxu
 * Date: 13-4-2
 * Time: 下午9:52
 */

/**
 * 给用户下发COOKIE的时候，对ID进行加密
 * @param $id 需要MD5加密的字符串
 * @return string 加密后的字符串32位
 */
function encodeCookie($id){
    $encodeOfId = md5($id);
    return $encodeOfId;
}

/**
 * 验证COOKIE从存储的用户ID是否合法：前32位是后面数字的MD5
 * @param String $id  被加密的字符串（除32位MD5之后的）
 * @param String $md5 加密后的字符串（前32位MD5）
 * @return bool 是否通过验证
 */
function verifyCookie($id, $md5){
    if(md5($id) == $md5){
        return true;
    } else{
        return false;
    }
}

/**
 * 从COOKIE中取得用户ID与管理员识别码
 * @param String $type   要取的数据类型，用户ID："id"；管理员识别："admin"
 * @param String $cookie 从哪里取数据
 * @return string 返回对应的数据
 */
function getDataFromCookie($type, $cookie){
    $userIdMd5 = substr($cookie, 0, 32);
    $userIdAdmin = substr($cookie, 32);
    $userId = substr($cookie, 32, strlen($cookie) - 33);
    $userAdmin = substr($cookie, strlen($cookie) - 1);
    if(verifyCookie($userIdAdmin, $userIdMd5)){
        if($type == "id"){
            return $userId;
        } elseif($type = "admin"){
            return $userAdmin;
        }
    } else{
        return "";
    }
}

/**
 * 发送邮箱地址验证邮件
 * @param $address   收件人地址
 * @param $name      收件人称呼
 * @param $title     邮件标题
 * @param $verifyURL 验证地址
 * @return bool 邮件是否发送成功
 */
function sendMail($address, $name, $title, $verifyURL){
    //发邮件模块
    require("PHPMailer/class.phpmailer.php"); //下载的文件必须放在该文件所在目录
    $mailToSend = new PHPMailer(); //建立邮件发送类
    $mailToSend->CharSet = "utf-8"; //字符集
    $mailToSend->Encoding = "base64"; //编码方式
    $mailToSend->IsSMTP(); //使用SMTP方式发送
    $mailToSend->Port = 25; //SMTP端口
    $mailToSend->SMTPAuth = true; //启用SMTP验证功能
    $mailToSend->Host = "smtp.163.com"; //您的企业邮局域名
    $mailToSend->Username = "just_read_admin@163.com"; //邮箱用户名(请填写完整的email地址)
    $mailToSend->Password = "justread"; //邮局密码
    $mailToSend->From = "just_read_admin@163.com"; //邮件发送者email地址，与上面的邮箱用户名相同
    $mailToSend->FromName = "JustRead管理员"; //发出者称呼
    $mailToSend->AddAddress("$address", "$name"); //收件人地址，可以替换成任何想要接收邮件的email信箱,格式是AddAddress("收件人email","收件人姓名")
    $mailToSend->IsHTML(true); //是否使用HTML格式

    $mailToSend->Subject = $title; //邮件标题

    $content = "你好，请点击这个链接完成您的注册(如果链接无法点击，请复制到浏览器打开)：<a href='" . $verifyURL . "'>" . $verifyURL . "</a>";
    $mailToSend->Body = $content; //邮件内容

    if(!$mailToSend->Send()){
        return false;
    } else{
        return true;
    }
}

/**
 * 验证数据库时候有这个mail地址
 * @param $mail 需要查询的mail地址
 * @param $conn 数据库连接
 * @return bool 返回结果，存在true，不存在false
 */
function checkMailExist($mail, $conn){
    $sql = "SELECT * FROM `user` WHERE `mail` = '" . $mail . "'";
    $result = mysql_query($sql, $conn);
    $success = @mysql_num_rows($result);
    if($success){
        return true;
    } else{
        return false;
    }
}

/**
 * 验证用户名和密码时候匹配
 * @param $mail     用户登录邮箱
 * @param $password 用户密码
 * @param $conn     数据库连接
 * @return bool 返回值，匹配返回true，不匹配返回false
 */
function checkUserPassword($mail, $password, $conn){
    $sql = "SELECT * FROM `user` WHERE `mail` = '" . $mail . "' AND `password` = '" . $password . "'";
    $result = mysql_query($sql, $conn);
    $success = mysql_num_rows($result);
    if($success){
        return true;
    } else{
        return false;
    }
}