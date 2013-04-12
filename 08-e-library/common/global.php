<?php
/**
 * User: Baoxu
 * Date: 13-4-3
 * Time: 下午3:02
 * 这个文件用于定义常量
 */

//域名
define("HOST", "localhost");
//项目根目录
define("DOCROOT", "/baoxu-project/08-e-library/");


//数据库地址
define("DB_HOST", "baoxu-desktop");
//数据库用户名
define("DB_USER", "baoxu");
//数据库密码
define("DB_PASS", ",.");
//数据库名
define("DB_NAME", "library");


//PHP错误日志的目录
define("PHP_LOG_DIR", 'D:\\' . date('Y-m-d') . '_weblog.txt');
//define("PHP_LOG_DIR", date('Y-m-d') . '_weblog.txt');

//用户可借阅的天数
define("BORROW_DAY", 30);
//用户可续借的天数
define("RENEW_DAY", 10);


//PHP异常日志处理类
function exceptionHandler(){
    error_reporting(E_ALL ^ E_NOTICE);
    date_default_timezone_set('Etc/GMT-8'); //设置时区

    ini_set('display_errors', 0); //不在浏览器窗口显示日志
    ini_set('log_errors', 1); //开启错误日志记录
    ini_set('error_log', PHP_LOG_DIR); //日志记录的路径
    ini_set('ignore_repeated_errors', 1); //不重复记录出现在同一个文件中的同一行代码上的错误信息。

    $user_defined_err = error_get_last();
    if($user_defined_err['type'] > 0){
        switch($user_defined_err['type']){
            case 1:
                $user_defined_errType = '致命的运行时错误(E_ERROR)';
                break;
            case 2:
                $user_defined_errType = '非致命的运行时错误(E_WARNING)';
                break;
            case 4:
                $user_defined_errType = '编译时语法解析错误(E_PARSE)';
                break;
            case 8:
                $user_defined_errType = '运行时提示(E_NOTICE)';
                break;
            case 16:
                $user_defined_errType = 'PHP内部错误(E_CORE_ERROR)';
                break;
            case 32:
                $user_defined_errType = 'PHP内部警告(E_CORE_WARNING)';
                break;
            case 64:
                $user_defined_errType = 'Zend脚本引擎内部错误(E_COMPILE_ERROR)';
                break;
            case 128:
                $user_defined_errType = 'Zend脚本引擎内部警告(E_COMPILE_WARNING)';
                break;
            case 256:
                $user_defined_errType = '用户自定义错误(E_USER_ERROR)';
                break;
            case 512:
                $user_defined_errType = '用户自定义警告(E_USER_WARNING)';
                break;
            case 1024:
                $user_defined_errType = '用户自定义提示(E_USER_NOTICE)';
                break;
            case 2048:
                $user_defined_errType = '代码提示(E_STRICT)';
                break;
            case 4096:
                $user_defined_errType = '可以捕获的致命错误(E_RECOVERABLE_ERROR)';
                break;
            case 8191:
                $user_defined_errType = '所有错误警告(E_ALL)';
                break;
            default:
                $user_defined_errType = '未知类型';
                break;
        }
        $msg = sprintf('%s %s %s %s %s', '[' . date("Y-m-d H:i:s") . ']', $user_defined_errType, $user_defined_err['message'], $user_defined_err['file'], $user_defined_err['line']);
        error_log($msg . "\n", 3, PHP_LOG_DIR);
    }
}

//将日志处理程序注册到程序停止运行的触发函数上
register_shutdown_function('exceptionHandler');