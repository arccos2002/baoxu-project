<?php
//定义从服务器抓取数据地址的常量
//在google搜索一个歌曲的ID
$GET_BAIDU_MUSIC_ID = "http://ting.baidu.com/search?key=";
//查看google歌词，找到在top100上的下载地址
$GET_BAIDU_MUSIC_LRC = "http://ting.baidu.com/song/";


//获取传递过来的查询类型与查询字符串
$requestType = $_REQUEST['type'];
$queryArtist = $_REQUEST['artist'];
$queryTitle = $_REQUEST['title'];

//去掉查询字符串里面的空格
$queryString = $queryArtist." ".$queryTitle;
$queryString = str_replace("(","",$queryString);
$queryString = str_replace(")","",$queryString);

$queryString = urlencode($queryString);


if($requestType == "gma"){
    $gmi_url = $GET_BAIDU_MUSIC_ID.$queryString;
    //打印百度搜索地址
    //echo $gmi_url."<br>";
    $gmi_content = htmlentities(file_get_contents( $gmi_url ),ENT_NOQUOTES ,"utf-8");
    //打印获取到的搜索结果页面
    //echo $gmi_content."<BR>";
	if(!$gmi_content){
		echo("SEARCH_SONG_ERROR");
		echo("<br>");
	}else{
		echo("SEARCH_SONG_SUCCESS");
		echo("<br>");
	}

    $gmi_headStr = "sid";
    $gmi_endStr = "first_song_li";
    $gmi_pos_head=stripos($gmi_content,$gmi_headStr) + 14;
    //打印搜索头位置
    //echo $gmi_pos_head."<br>";
    $gmi_pos_end = stripos($gmi_content,$gmi_endStr) - 10;
    //打印搜索尾位置
    //echo $gmi_pos_end."<br>";
    $gmi_strlen = $gmi_pos_end - $gmi_pos_head;
    //打印截取长度值
    //echo $gmi_strlen."<br>";
	if(!$gmi_pos_head){
		echo("GET_SONG_GOOGLE_ID_ERROR");
		echo("<br>");
	}else{
		echo("GET_SONG_GOOGLE_ID_SUCCESS");
		echo("<br>");
	}
    $gmi_result = substr($gmi_content,$gmi_pos_head,$gmi_strlen);
    //打印截取结果，也就是歌曲ID
    //echo $gmi_result."<br>";

	
	$gml_url = $GET_BAIDU_MUSIC_LRC.$gmi_result."/lyric";
    //echo $gml_url."<br>";
    //exit;
	$gml_content = htmlentities(file_get_contents( $gml_url ));
	//echo $gml_content;
	if(!$gmi_content){
		echo("GET_SONG_GOOGLE_LRC_ERROR");
		echo("<br>");
	}else{
		echo("GET_SONG_GOOGLE_LRC_SUCCESS");
		echo("<br>");
	}
	
	$gml_headStr = "down-lrc-btn";
	$gml_endStr = ".lrc";
	$gml_head_pos=stripos($gml_content,$gml_headStr)+30;
	$gml_end_pos=stripos($gml_content,$gml_endStr)+4;
	if(!$gml_end_pos && !$gml_head_pos){
		echo("GET_SONG_DOWNLOAD_URL_ERROR");
		echo("<br>");
	}else{
		echo("GET_SONG_DOWNLOAD_URL_SUCCESS");
		echo("<br>");
	}
	$gml_result = substr($gml_content,$gml_head_pos,$gml_end_pos-$gml_head_pos);
	//打印歌词的下载地址
    //echo $gml_result;
	
	$fread = file_get_contents( $gml_result );	
	//$fread = file_get_contents( "111.lrc" );
	if(!$fread){
		echo("GET_LRC_CONTENT_ERROR");
		echo("<br>");
		echo("<br>");
		exit;
	}else{
		echo("GET_LRC_CONTENT_SUCCESS");
		echo("<br>");
	}
	
	$fileName = $queryArtist." - ".$queryTitle.".lrc";
	$fileName = iconv("UTF-8", "GBK", $fileName);
	
	$fwrite = fopen($fileName, "w");		
	$fwriteFlag = fwrite($fwrite,$fread);
	if(!$fwriteFlag){
		echo("WRITE_FILE_ERROR");
		echo("<br>");
	}else{
		echo("WRITE_FILE_SUCCESS");
		echo("<br>");
	}
}

?>