<?php
if(!$_GET){
    echo '<div class = "container text-center bx-dialog-info">
    <p><i class = "icon-remove"></i>&nbsp;&nbsp;对不起，请求参数错误，<a href="../home">回主页...</a></p>
</div>';
    include "../common/foot.php";
    exit;
}