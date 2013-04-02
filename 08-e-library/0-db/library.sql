/*
Navicat MySQL Data Transfer

Source Server         : 192.168.1.14
Source Server Version : 50508
Source Host           : 192.168.1.14:3306
Source Database       : library

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2013-04-02 23:52:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `book`
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `book_id` int(5) NOT NULL AUTO_INCREMENT COMMENT '书籍ID',
  `isbn10` bigint(10) DEFAULT NULL COMMENT 'ISBN号10位',
  `isbn13` bigint(13) DEFAULT NULL COMMENT 'ISBN号13位',
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '书名',
  `subtitle` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '书名副标题',
  `origin_title` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '原著标题',
  `pubdate` date DEFAULT NULL COMMENT '出版日期',
  `author` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '作者',
  `translator` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '译者',
  `publisher` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '出版社',
  `image` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '封面图',
  `summary` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '书籍摘要',
  `pages` int(4) DEFAULT NULL COMMENT '页数',
  `tags` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '标签',
  `provider` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '提供者',
  `count` int(3) NOT NULL COMMENT '数量',
  `status` int(1) NOT NULL COMMENT '书籍状态',
  PRIMARY KEY (`book_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='书籍信息表';

-- ----------------------------
-- Records of book
-- ----------------------------

-- ----------------------------
-- Table structure for `borrow`
-- ----------------------------
DROP TABLE IF EXISTS `borrow`;
CREATE TABLE `borrow` (
  `borrow_id` int(6) NOT NULL AUTO_INCREMENT COMMENT '借阅ID',
  `user_id` int(5) NOT NULL COMMENT '用户ID',
  `book_id` int(5) NOT NULL COMMENT '书籍ID',
  `borrow_time` date NOT NULL COMMENT '借书时间',
  `renew` int(1) NOT NULL DEFAULT '0' COMMENT '续借状态',
  `return_time` date DEFAULT NULL COMMENT '还书日期',
  PRIMARY KEY (`borrow_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='借阅信息表';

-- ----------------------------
-- Records of borrow
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(5) NOT NULL AUTO_INCREMENT COMMENT '用户ID-主键',
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL COMMENT '姓名',
  `mail` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '邮箱地址-登录名',
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `admin` int(1) NOT NULL DEFAULT '0' COMMENT '是否是管理员',
  `phone` bigint(11) DEFAULT NULL COMMENT '手机号',
  `head` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户头像URI',
  `sign` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '签名档',
  `level` int(1) NOT NULL DEFAULT '0' COMMENT '等级',
  `regist_time` date NOT NULL COMMENT '注册时间',
  `last_login` date DEFAULT NULL COMMENT '最后登录时间',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '帐号状态',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1235 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户信息表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '陈保需', 'bxchen@corp.netease.com', 'c4ca4238a0b923820dcc509a6f75849b', '0', '15117909906', null, null, '0', '0000-00-00', null, '1');
