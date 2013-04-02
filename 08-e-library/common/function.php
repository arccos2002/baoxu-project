<?php
/**
 * User: Baoxu
 * Date: 13-4-2
 * Time: 下午9:52
 */

function encodeCookie($id)
{
    $encodeOfId = md5($id);
    return $encodeOfId;
}

function verifyCookie($id, $md5)
{
    if (md5($id) == $md5) {
        return true;
    } else {
        return false;
    }
}

function getDataFromCookie($data, $cookie)
{
    $userIdMd5 = substr($cookie, 0, 32);
    $userIdAdmin = substr($cookie, 32);
    $userId = substr($cookie, 32, strlen($cookie)-33);
    $userAdmin = substr($cookie, strlen($cookie) - 1);
    if (verifyCookie($userIdAdmin, $userIdMd5)) {
        if ($data == "id") {
            return $userId;
        } elseif ($data = "admin") {
            return $userAdmin;
        }
    } else {
        return "ddd";
    }
}

//echo getDataFromCookie("id", "8e3308c853e47411c76142919351181912340");
//echo "<br>";
//echo getDataFromCookie("admin", "8e3308c853e47411c76142919351181912340");