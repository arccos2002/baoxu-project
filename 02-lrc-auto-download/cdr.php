<?php
//定义从服务器抓取数据地址的常量
//在google搜索一个歌曲的ID
$GET_GOOGLE_MUSIC_ID = "http://www.google.cn/music/search?q=";
//查看google歌词，找到在top100上的下载地址
$GET_GOOGLE_MUSIC_LRC = "http://www.google.cn/music/top100/lyrics?id=";


//获取传递过来的查询类型与查询字符串
$requestType = $_REQUEST['type'];
$queryArtist = $_REQUEST['artist'];
$queryTitle = $_REQUEST['title'];

//去掉查询字符串里面的空格
$queryString = $queryArtist." ".$queryTitle;
$queryString = str_replace("(","",$queryString);
$queryString = str_replace(")","",$queryString);

$queryString = urlencode($queryString);


if($requestType == "gmi"){
	$gmi_url = $GET_GOOGLE_MUSIC_ID.$queryString;
	$gmi_content = file_get_contents( $gmi_url );
	$gmi_headStr = "tr id=";
	$gmi_pos=stripos($gmi_content,$gmi_headStr);
	$gmi_result = substr($gmi_content,$gmi_pos+10,17);
	echo $gmi_result;
}
	
if($requestType == "gml"){
	$gml_url = $GET_GOOGLE_MUSIC_LRC.$queryString;
	$gml_content = file_get_contents( $gml_url );
	//echo $gml_content;
	$gml_headStr = "x3dhttp://lyric.top100.cn/";
	$gml_endStr = ".lrc";
	$gml_head_pos=stripos($gml_content,$gml_headStr);
	$gml_end_pos=stripos($gml_content,$gml_endStr);
	$gml_result = substr($gml_content,$gml_head_pos+3,$gml_end_pos-$gml_head_pos+1);
	echo $gml_result;
}

if($requestType == "gma"){
	$gmi_url = $GET_GOOGLE_MUSIC_ID.$queryString;
	$gmi_content = file_get_contents( $gmi_url );
	if(!$gmi_content){
		echo("SEARCH_SONG_ERROR");
		echo("<br>");
	}else{
		echo("SEARCH_SONG_SUCCESS");
		echo("<br>");
	}
	
	$gmi_headStr = "tr id=";
	$gmi_pos=stripos($gmi_content,$gmi_headStr);
	if(!$gmi_pos){
		echo("GET_SONG_GOOGLE_ID_ERROR");
		echo("<br>");
	}else{
		echo("GET_SONG_GOOGLE_ID_SUCCESS");
		echo("<br>");
	}
	$gmi_result = substr($gmi_content,$gmi_pos+10,17);
	//echo $gmi_result;
	
	
	$gml_url = $GET_GOOGLE_MUSIC_LRC.$gmi_result;
	$gml_content = file_get_contents( $gml_url );
	//echo $gml_content;
	if(!$gmi_content){
		echo("GET_SONG_GOOGLE_LRC_ERROR");
		echo("<br>");
	}else{
		echo("GET_SONG_GOOGLE_LRC_SUCCESS");
		echo("<br>");
	}
	
	$gml_headStr = "x3dhttp://lyric.top100.cn/";
	$gml_endStr = ".lrc";
	$gml_head_pos=stripos($gml_content,$gml_headStr);
	$gml_end_pos=stripos($gml_content,$gml_endStr);
	if(!$gml_end_pos && !$gml_head_pos){
		echo("GET_SONG_DOWNLOAD_URL_ERROR");
		echo("<br>");
	}else{
		echo("GET_SONG_DOWNLOAD_URL_SUCCESS");
		echo("<br>");
	}
	$gml_result = substr($gml_content,$gml_head_pos+3,$gml_end_pos-$gml_head_pos+1);
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