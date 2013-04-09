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
    }
    return "";
}

/**
 * 发送邮箱地址验证邮件
 * @param $address     收件人地址
 * @param $name        收件人称呼
 * @param $title       邮件标题
 * @param $mailContent 邮件内容
 * @return bool 邮件是否发送成功
 */
function sendMail($address, $name, $title, $mailContent){
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

    $mailToSend->Body = $mailContent; //邮件内容

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
 * 验证用户名和密码是否匹配
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

/**
 * 用户登录时候，更新用户的最后登录时间
 * @param $userId 登录用户ID
 * @param $conn   数据库连接
 * @return bool 更新成功返回true，失败返回false
 */
function updateLoginDate($userId, $conn){
    $todayDate = date("Y-m-d");
    $sql = "UPDATE `user` SET `last_login` = '$todayDate' WHERE `user_id` = '$userId'";
    mysql_query($sql, $conn);
    $success = mysql_affected_rows();
    if($success){
        return true;
    } else{
        return false;
    }
}

/**
 * 检查ISBN号在数据库中是否已经存在
 * @param $isbn 需要查询的ISBN号
 * @param $conn 数据库连接
 * @return bool 存在则返回true，不存在false
 */
function checkIsbnExist($isbn, $conn){
    $sql = "SELECT * FROM `book` WHERE `isbn13` = '$isbn'";
    $result = mysql_query($sql, $conn);
    $success = @mysql_num_rows($result);
    if($success){
        return true;
    } else{
        return false;
    }
}

/**
 * 检查一个用户是否对一本书已经提交了借书申请
 * @param $userId 用户ID
 * @param $bookId 书籍ID
 * @param $conn   数据库连接
 * @return bool 如果已经提交申请返回true，否则返回false
 */
function checkApplyBook($userId, $bookId, $conn){
    $sql = "SELECT * FROM `borrow` WHERE `user_id` = '$userId' AND `book_id` = '$bookId' AND `type` = '0'";
    $result = mysql_query($sql, $conn);
    $success = @mysql_num_rows($result);
    if($success){
        return true;
    } else{
        return false;
    }
}

/**
 * 提交借书申请，写入borrow表，type为0，表示是申请状态
 * @param $userId 用户ID
 * @param $bookId 书籍ID
 * @param $conn   数据库连接
 * @return bool 写入成功返回true，写入失败返回false
 */
function applyBook($userId, $bookId, $conn){
    $todayDate = date("Y-m-d");
    $sql = "INSERT INTO `borrow` (`borrow_id`, `user_id`, `book_id`, `type`, `renew`, `date`) VALUES (NULL, '$userId', '$bookId', '0', '0', '$todayDate');";
    mysql_query($sql, $conn);
    $success = mysql_affected_rows();
    if($success){
        return true;
    } else{
        return false;
    }
}

/**
 * 根据ID获取用户信息
 * @param $userId 用户ID
 * @param $conn   数据库连接
 * @return array|bool 如果存在，返回用户信息数据，不存在返回false
 */
function getUserInfoById($userId, $conn){
    $sql = "SELECT * FROM `user` WHERE `user_id` = '$userId'";
    $result = mysql_query($sql, $conn);
    $row = mysql_fetch_array($result);
    $success = @mysql_num_rows($result);

    $userInfo = array(
        "user_id" => $row["user_id"],
        "name" => $row["name"],
        "mail" => $row["mail"],
        "phone" => $row["phone"],
        "head" => $row["head"],
        "sign" => $row["sign"],
        "level" => $row["level"],
        "status" => $row["status"]
    );

    if($success){
        return $userInfo;
    } else{
        return false;
    }
}

/**
 * 通过ID获取书籍信息
 * @param $bookId 书籍ID
 * @param $conn   数据库连接
 * @return array|bool 如果存在返回书籍信息数组，如果不存在返回false
 */
function getBookInfoById($bookId, $conn){
    $sql = "SELECT * FROM `book` WHERE `book_id` = '$bookId'";
    $result = mysql_query($sql, $conn);
    $row = mysql_fetch_array($result);
    $success = @mysql_num_rows($result);

    $bookInfo = array(
        "book_id" => $row["book_id"],
        "isbn" => $row["isbn13"],
        "title" => $row["title"],
        "subtitle" => $row["subtitle"],
        "pubdate" => $row["pubdate"],
        "author" => $row["author"],
        "translator" => $row["translator"],
        "publisher" => $row["publisher"],
        "image" => $row["image"],
        "summary" => $row["summary"],
        "pages" => $row["pages"],
        "provider" => $row["provider"],
        "status" => $row["status"]
    );

    if($success){
        return $bookInfo;
    } else{
        return false;
    }
}

/**
 * 批准借出书籍
 * @param $bookId   书籍ID
 * @param $borrowId 借阅ID
 * @param $conn     数据库连接
 * @return bool 返回操作成功与否
 */
function loanBook($bookId, $borrowId, $conn){
    $todayDate = date("Y-m-d");
    //改写Borrow表，type改为1表示借书成功，更新借书时间
    $borrow_sql = "UPDATE `borrow` SET `type` = '1' , `date` = '$todayDate' WHERE `borrow_id` = '$borrowId'";
    mysql_query($borrow_sql, $conn);
    $borrow_success = mysql_affected_rows();
    //改写book表，将对应的book的状态置为0表示已借出，更新借书时间，增加借书次数
    $book_sql = "UPDATE `book` SET `status` = '0' , `borrow_date` = '$todayDate' , `borrow_count` = `borrow_count`+1 WHERE `book_id` = '$bookId'";
    mysql_query($book_sql, $conn);
    $book_success = mysql_affected_rows();
    if($borrow_success && $book_success){
        return true;
    } else{
        return false;
    }
}

/**
 * 确认还回书籍
 * @param $bookId   书籍ID
 * @param $borrowId 借阅ID
 * @param $conn     数据库连接
 * @return bool 返回操作成功与否
 */
function returnBook($bookId, $borrowId, $conn){
    $todayDate = date("Y-m-d");
    //改写Borrow表，type改为2表示已还回，更新还回时间
    $borrow_sql = "UPDATE `borrow` SET `type` = '2' , `date` = '$todayDate' WHERE `borrow_id` = '$borrowId'";
    mysql_query($borrow_sql, $conn);
    $borrow_success = mysql_affected_rows();
    //改写book表，将对应的book的状态置为1表示在馆可借，空置借书时间
    $book_sql = "UPDATE `book` SET `status` = '1' , `borrow_date` = NULL WHERE `book_id` = '$bookId'";
    mysql_query($book_sql, $conn);
    $book_success = mysql_affected_rows();
    if($borrow_success && $book_success){
        return true;
    } else{
        return false;
    }
}

/**
 * 批准续借
 * @param $bookId   书籍ID
 * @param $borrowId 借阅ID
 * @param $conn     数据库连接
 * @return bool 返回操作成功与否
 */
function renewBook($bookId, $borrowId, $conn){
    $todayDate = date("Y-m-d");
    //改写Borrow表，renew修改为1表示已经续借
    $borrow_sql = "UPDATE `borrow` SET `renew` = '1' WHERE `borrow_id` = '$borrowId'";
    mysql_query($borrow_sql, $conn);
    $borrow_success = mysql_affected_rows();
    if($borrow_success){
        return true;
    } else{
        return false;
    }
}

