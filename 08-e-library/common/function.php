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