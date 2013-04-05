<?php
/**
 * User: Baoxu
 * Date: 13-4-4
 * Time: 下午12:07
 * 从COOKIE中检查用户是否有管理员权限
 */
if(@getDataFromCookie("admin", $_COOKIE["userCode"]) == 0){
    echo '<div class = "container text-center bx-dialog-info">
    <p><i class = "icon-remove"></i>&nbsp;&nbsp;你无权访问该页面，请以管理员帐号登录！</p>
</div>';
    include "../common/foot.php";
    exit;
}