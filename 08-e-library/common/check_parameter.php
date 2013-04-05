<?php
/**
 * User: Baoxu
 * Date: 13-4-4
 * Time: 下午12:07
 * 在需要参数才可以访问的页面上检查时候带有参数
 */
if(!$_GET){
    echo '<div class = "container text-center bx-dialog-info">
    <p><i class = "icon-remove"></i>&nbsp;&nbsp;对不起，请求参数错误，<a href="../home">回主页...</a></p>
</div>';
    include "../common/foot.php";
    exit;
}