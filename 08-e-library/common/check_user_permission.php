<?php
if(!@getDataFromCookie("id", $_COOKIE["userCode"])){
    echo '<div class = "container text-center bx-dialog-info">
    <p><i class = "icon-remove"></i>&nbsp;&nbsp;你无权访问该页面，请先登录！</p>
</div>';
    include "../common/foot.php";
    exit;
}