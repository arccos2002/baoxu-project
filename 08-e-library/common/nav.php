<?php
header("Content-Type:text/html; charset=utf-8");
include "conn.php";
include "function.php";
?>

<!--顶部导航-->
<div class = "navbar navbar-inverse navbar-fixed-top">
    <div class = "navbar-inner">
        <div class = "container">
            <button data-target = ".nav-collapse" data-toggle = "collapse" class = "btn btn-navbar collapsed"
                    type = "button">
                <span class = "icon-bar"></span>
                <span class = "icon-bar"></span>
                <span class = "icon-bar"></span>
            </button>
            <a href = "../home" class = "brand bx-logo">Just Read</a>

            <div class = "nav-collapse collapse" style = "height: 0;">
                <ul class = "nav">
                    <li><a href = "../home/">首页</a></li>
                    <li><a href = "../book/">书目列表</a></li>
                    <li><a href = "../user/">个人中心</a></li>
                    <li class = "dropdown">
                        <a data-toggle = "dropdown" class = "dropdown-toggle" href = "#">管理后台 <b
                                class = "caret"></b></a>
                        <ul class = "dropdown-menu">
                            <li class = "nav-header">书籍管理</li>
                            <li><a href = "../admin/book_add.php">添加书籍</a></li>
                            <li><a href = "../admin/book_list.php">书籍列表</a></li>
                            <li class = "divider"></li>
                            <li class = "nav-header">用户管理</li>
                            <li><a href = "../admin/user_add.php">添加用户</a></li>
                            <li><a href = "../admin/user_list.php">用户列表</a></li>
                        </ul>
                    </li>
                    <li><a href = "../about/">关于</a></li>
                </ul>
                <!--判断cookie-->
                <?php
                if(isset($_COOKIE["userCode"])){
                    if($_COOKIE["userName"]){
                        $displayName = $_COOKIE["userName"];
                    } else{
                        $displayName = substr($_COOKIE["userMail"], 0, strpos($_COOKIE["userMail"], "@"));
                    }
                    echo '<form class = "navbar-form pull-right f-dn" id = "loginForm" name = "loginForm" action = "" onsubmit = "return false;">
                    <input type = "text" placeholder = "邮箱前缀" class = "span2" name = "nav_email" required="required"  id = "nav_email">
                    <input type = "password" placeholder = "密码" class = "span2" name = "nav_password" required="required"  id = "nav_password">
                    <button class = "btn" id = "bx-login-btn" data-event-tag = "et_login_btn">登录</button>
                    </form>';
                    echo '<div id="loginSuccess" class = "navbar-form pull-right bx-nav-login-success">' . $displayName . ' <a href="#" onclick="doLogout()"><span>注销</span></a></div>';
                } else{
                    echo '<form class = "navbar-form pull-right" id = "loginForm" name = "loginForm" action = "" onsubmit = "return false;">
                    <input type = "text" placeholder = "邮箱前缀" class = "span2" name = "nav_email" required="required"  id = "nav_email">
                    <input type = "password" placeholder = "密码" class = "span2" name = "nav_password" required="required"  id = "nav_password">
                    <button class = "btn" id = "bx-login-btn" data-event-tag = "et_login_btn">登录</button>
                    </form>';
                    echo '<div id = "loginSuccess" class = "navbar-form pull-right bx-nav-login-success f-dn"><span id="displayUserName"></span>&nbsp;<a href = "#" data-event-tag = "et_logout_btn"><span>注销</span></a></div>';
                }
                ?>

            </div>
        </div>
    </div>
</div>