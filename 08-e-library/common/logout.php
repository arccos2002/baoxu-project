<?php
/**
 * User: Baoxu
 * Date: 13-4-2
 * Time: 上午11:22
 */

echo '{"status":1}';
/*写Cookie*/
setcookie("userId", "", time() - 3600, "/");
setcookie("userMail", "", time() - 3600, "/");
setcookie("userName", "", time() - 3600, "/");