<?php
session_start();
include_once( 'lib/config.php' );
include_once( 'lib/saetv2.ex.class.php' );
//从POST过来的signed_request中提取oauth2信息
if(!empty($_REQUEST["signed_request"])){
	$o = new SaeTOAuthV2( WB_AKEY , WB_SKEY  );
	$data=$o->parseSignedRequest($_REQUEST["signed_request"]);
	if($data=='-2'){
		die('签名错误!');
	}else{
		$_SESSION['oauth2']=$data;
	}
}
//判断用户是否授权
if (empty($_SESSION['oauth2']["user_id"])) {
	include "lib/auth.php";
	exit;
} else {
	$c = new SaeTClientV2( WB_AKEY , WB_SKEY ,$_SESSION['oauth2']['oauth_token'] ,'' );
}
?>
<!--=============================== AUTH之后的页面内容，AUTH之前的内容是/lib/auth.php ============================================-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!----------------------我自己的CSS------------------------------>
<link href="css/style.css" type="text/css" rel="stylesheet" />
<!---------------------个人CSS库结束----------------------------->
<!----------------------我自己的JS库----------------------------->
<script	src="js/jquery.js" type="text/javascript"></script>
<script	src="js/my_fun.js" type="text/javascript"></script>
<script	src="js/effect.js" type="text/javascript"></script>
<!---------------------个人JS库结束----------------------------->
<!---------------------Jquery引导----------------------------->
<script language="javascript">
$(document).ready(function() {
// do stuff when DOM is ready//当文档载入后从此处开始执行代码
//alert("Jquery!")
});
</script>
<!---------------------Jquery引导结束----------------------------->
<title>好友连连看</title>
</head>
<body>
<!--倒计时区域-->
<div id="daojishi_con">
  <!--显示总时间与剩余时间的div-->
  <div id="timeleft"></div>
  <!--总时间外框div-->
  <div id="timebar_con">
    <!--随时间缩短的div-->
    <div id="timebar"></div>
  </div>
  <!--游戏开始按钮div-->
  <div id="daojishi_bot">
    <input name="start_button" type="button" id="start_button" value="开始！" onclick="baoxu_start();" />
  </div>
</div>
<!--用于显示真正进行连连看的图片的TABLE-->
<table id="llk_table" cellspacing="0" cellpadding="0" border="1">
</table>
<!-------------------------连连看模块结束------------------------------->
<!--------------------------用户信息处理-------------------------------->
<?php
//当前用户的UID
$pre_user_id = $_SESSION['oauth2']["user_id"];
//echo "登记的用户名为：".$pre_user_id;
//获得用户的关注者数组
$friends_info  = $c->friends_by_id( $uid = $pre_user_id, $cursor = 0, $count = 200 ); // done
?>
<div id="user_llk">
  <!--用于显示用户用户的关注者的TABLE-->
  <table id="user_table">
  </table>
  <!--用户控制区，用户选择连连看头像和确定-->
  <div id="user_control">
    <input type="button" value="确定" onclick="chooseUser();" />
    <input type="button" value="换一批" onclick="user_Load(userPhotoArray,userIdArray,userNameArray, userRow, userCol); selectUserRandom(userRow, userCol);" />
  </div>
</div>
<!--获取好友头像，显示以供选取-->
<script language="javascript" type="text/javascript">
var userPhotoArray = [];
var userIdArray = [];
var userNameArray = [];
var userRow = 4;
var userCol = 7;

<?php if( is_array( $friends_info['users'] ) ): ?>
<?php foreach( $friends_info['users'] as $friends_info_item ): ?>
var userArrayUnit = "<?php echo $friends_info_item['profile_image_url'];?>";
var userIdUnit = "<?php echo $friends_info_item['id'];?>";
var userNameUnit = "<?php echo $friends_info_item['name'];?>";
userPhotoArray.push(userArrayUnit);
userIdArray.push(userIdUnit);
userNameArray.push(userNameUnit);
<?php endforeach; ?>
<?php endif; ?>

init();
//user_Enough(userPhotoArray);
user_Load(userPhotoArray, userIdArray, userNameArray, userRow, userCol);
selectUserRandom(userRow, userCol);
</script>
</body>
</html>
