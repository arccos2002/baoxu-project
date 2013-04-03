<?php
/**
 * User: Baoxu
 * Date: 13-4-2
 * Time: 下午3:50
 */

include "../common/conn.php";

echo "正在处理...";

$fileType = strrchr($_POST["image"], ".");
$picDir = "../book/book_img/";
//用时间戳做图片文件名
//$picName = gmmktime() . $fileType;
//用ISBN号做图片文件名
$picName = $_POST["isbn13"] . $fileType;
$picUrl = $picDir . $picName;

$src = file_get_contents($_POST["image"]);
$des = fopen($picUrl, "w");
fwrite($des, $src);

$saveBookSql = "INSERT INTO `book` (`book_id`, `isbn10`, `isbn13`, `title`, `subtitle`, `origin_title`, `pubdate`, `author`, `translator`, `publisher`, `image`, `summary`, `pages`, `tags`, `provider`, `count`, `status`) VALUES (NULL, '" . $_POST["isbn10"] . "', '" . $_POST["isbn13"] . "', '" . $_POST["title"] . "', '" . $_POST["subtitle"] . "', '" . $_POST["origin_title"] . "', '" . $_POST["pubdate"] . "', '" . $_POST["author"] . "', '" . $_POST["translator"] . "', '" . $_POST["publisher"] . "', '" . $picName . "', '" . $_POST["summary"] . "', '" . $_POST["pages"] . "', '" . $_POST["tags"] . "', '" . $_POST["provider"] . "', '" . $_POST["count"] . "', '1')";
$result = mysql_query($saveBookSql, $conn);

if(!$result){
    die('Error: ' . mysql_error());
} else{
    echo "<script language='javascript' type='text/javascript'>";
    echo "window.location.href='success.php'";
    echo "</script>";
}
