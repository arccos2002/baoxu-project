<?php
if(@getDataFromCookie("admin", $_COOKIE["userCode"]) == 0){
    echo '<div class = "container text-center bx-dialog-info">
    <p><i class = "icon-remove"></i>&nbsp;&nbsp;你无权访问该页面，请以管理员帐号登录！</p>
</div>';
    include "../common/foot.php";
    exit;
}