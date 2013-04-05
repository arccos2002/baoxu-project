/*
Navicat MySQL Data Transfer

Source Server         : 192.168.1.14
Source Server Version : 50508
Source Host           : 192.168.1.14:3306
Source Database       : library

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2013-04-05 15:09:15
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
  `pubdate` int(4) DEFAULT NULL COMMENT '出版日期',
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
  `borrow_date` date DEFAULT NULL COMMENT '借出的日期',
  `borrow_count` int(4) DEFAULT '0',
  PRIMARY KEY (`book_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='书籍信息表';

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('3', '7121105772', '9787121105777', '人人都是产品经理', '', '', '2010', '苏杰', '', '电子工业出版社', '9787121105777.jpg', '这是写给“-1到3岁的产品经理”的书，适合刚入门的产品经理、产品规划师、需求分析师，以及对做产品感兴趣的学生，用户体验、市场运营、技术部门的朋友们，特别是互联网、软件行业。作为一名“4岁的产品经理”，作者讲述了过去3年的经历与体会，与前辈们的书不同，本书就像你走到作者身边，说“嗨哥们！晚上有空吃个饭么，随便聊聊做产品的事吧”，然后作者说“好啊”。\r\n书名叫“人人都是产品经理”，是因为作者觉得过去几年在做产品的过程中学到的思维方法与做事方式对自己很有帮助，而每个人也无时无刻在思考着同样的问题：“我们为了什么？在做什么事，解决什么人的什么问题？何时，和谁一起做？需要什么能力？”这些正对应了本书要说的几大话题：用户、需求、项目、团队、战略、修养。\r\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\r\n是谁？每次K歌都对着点歌面板评头论足。\r\n是谁？逛超市时总在想“这个商品能解决什么需求？”。\r\n是谁？会给自己的个人发展做战略规划。\r\n是谁？一定要在自己的婚礼中讲一个PPT。\r\n是谁？会拿用户调研的方法与亲朋好友交流。\r\n是谁？装修房子的时候抢着当项目经理。\r\n是谁？看电视广告总想在几十秒中提炼', '352', '产品经理,互联网,用户体验,产品,产品管理,交互设计,苏杰,管理', '边纯', '1', '1', null, '0');
INSERT INTO `book` VALUES ('4', '7115275793', '9787115275790', 'JavaScript高级程序设计（第3版）', '', 'Professional JavaScript for Web', '2012', '[美] Nicholas C. Zakas', '李松峰,曹　力', '人民邮电出版社', '9787115275790.jpg', '本书是JavaScript 超级畅销书的最新版。ECMAScript 5 和HTML5 在标准之争中双双胜出，使大量专有实现和客户端扩展正式进入规范，同时也为JavaScript 增添了很多适应未来发展的新特性。本书这一版除增加5 章全新内容外，其他章节也有较大幅度的增补和修订，新内容篇幅约占三分之一。全书从JavaScript 语言实现的各个组成部分——语言核心、DOM、BOM、事件模型讲起，深入浅出地探讨了面向对象编程、Ajax 与Comet 服务器端通信，HTML5 表单、媒体、Canvas（包括WebGL）及Web Workers、地理定位、跨文档传递消息、客户端存储（包括IndexedDB）等新API，还介绍了离线应用和与维护、性能、部署相关的最佳开发实践。本书附录展望了未来的API 和ECMAScript Harmony 规范。\r\n本书适合有一定编程经验的Web 应用开发人员阅读，也可作为高校及社会实用技术培训相关专业课程的教材。', '730', 'JavaScript,Web前端开发,javascript,前端开发,Web开发,js,web,前端', '', '1', '0', '2013-04-01', '0');
INSERT INTO `book` VALUES ('5', '7121141639', '9787121141638', '网站运维', '保持数据实时的秘技', '', '2011', '(美)阿尔斯帕瓦//罗宾斯|译者:杨建华', '杨建华', '电子工业出版社', '9787121141638.jpg', '《网站运维:保持数据实时的秘技》的各位合作者以自己的亲身经历，从不同的侧面讲述了一个正在发展中的新兴技术领域——网站运维：职业特点、技术架构、测量与监控、开发与部署、用户体验、后端存储，以及如何应对流量激增、如何优雅地失败，特别是如何将软件开发领域中的敏捷方法应用于网站运维。阅读《网站运维:保持数据实时的秘技》，读者不仅能够学到一些具体的技术，还能够开阔眼界，因为书中不仅有具体方法的讨论，更有基于十多年运维经验的哲理思考。\r\n《网站运维:保持数据实时的秘技》适合网站架构师、开发人员、运维人员（包括但不限于数据库管理员、系统管理员、网络管理员、发布管理员等）阅读，同时也适合项目经理等管理人员阅读。', '283', '运维,网站运维,Web,服务器,系统管理,计算机,技术,软件架构', '', '1', '1', null, '0');
INSERT INTO `book` VALUES ('6', '7121105772', '9787121105777', '人人都是产品经理', '', '', '2010', '苏杰', '', '电子工业出版社', '9787121105777.jpg', '这是写给“-1到3岁的产品经理”的书，适合刚入门的产品经理、产品规划师、需求分析师，以及对做产品感兴趣的学生，用户体验、市场运营、技术部门的朋友们，特别是互联网、软件行业。作为一名“4岁的产品经理”，作者讲述了过去3年的经历与体会，与前辈们的书不同，本书就像你走到作者身边，说“嗨哥们！晚上有空吃个饭么，随便聊聊做产品的事吧”，然后作者说“好啊”。\r\n书名叫“人人都是产品经理”，是因为作者觉得过去几年在做产品的过程中学到的思维方法与做事方式对自己很有帮助，而每个人也无时无刻在思考着同样的问题：“我们为了什么？在做什么事，解决什么人的什么问题？何时，和谁一起做？需要什么能力？”这些正对应了本书要说的几大话题：用户、需求、项目、团队、战略、修养。\r\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\r\n是谁？每次K歌都对着点歌面板评头论足。\r\n是谁？逛超市时总在想“这个商品能解决什么需求？”。\r\n是谁？会给自己的个人发展做战略规划。\r\n是谁？一定要在自己的婚礼中讲一个PPT。\r\n是谁？会拿用户调研的方法与亲朋好友交流。\r\n是谁？装修房子的时候抢着当项目经理。\r\n是谁？看电视广告总想在几十秒中提炼', '352', '产品经理,互联网,用户体验,产品,产品管理,交互设计,苏杰,管理', '', '1', '1', null, '0');
INSERT INTO `book` VALUES ('7', '7121141639', '9787121141638', '网站运维', '保持数据实时的秘技', '', '2011', '(美)阿尔斯帕瓦//罗宾斯|译者:杨建华', '杨建华', '电子工业出版社', '9787121141638.jpg', '《网站运维:保持数据实时的秘技》的各位合作者以自己的亲身经历，从不同的侧面讲述了一个正在发展中的新兴技术领域——网站运维：职业特点、技术架构、测量与监控、开发与部署、用户体验、后端存储，以及如何应对流量激增、如何优雅地失败，特别是如何将软件开发领域中的敏捷方法应用于网站运维。阅读《网站运维:保持数据实时的秘技》，读者不仅能够学到一些具体的技术，还能够开阔眼界，因为书中不仅有具体方法的讨论，更有基于十多年运维经验的哲理思考。\r\n《网站运维:保持数据实时的秘技》适合网站架构师、开发人员、运维人员（包括但不限于数据库管理员、系统管理员、网络管理员、发布管理员等）阅读，同时也适合项目经理等管理人员阅读。', '283', '运维,网站运维,Web,服务器,系统管理,计算机,技术,软件架构', '', '1', '1', null, '0');
INSERT INTO `book` VALUES ('8', '7115275793', '9787115275790', 'JavaScript高级程序设计（第3版）', '', 'Professional JavaScript for Web', '2012', '[美] Nicholas C. Zakas', '李松峰,曹　力', '人民邮电出版社', '9787115275790.jpg', '本书是JavaScript 超级畅销书的最新版。ECMAScript 5 和HTML5 在标准之争中双双胜出，使大量专有实现和客户端扩展正式进入规范，同时也为JavaScript 增添了很多适应未来发展的新特性。本书这一版除增加5 章全新内容外，其他章节也有较大幅度的增补和修订，新内容篇幅约占三分之一。全书从JavaScript 语言实现的各个组成部分——语言核心、DOM、BOM、事件模型讲起，深入浅出地探讨了面向对象编程、Ajax 与Comet 服务器端通信，HTML5 表单、媒体、Canvas（包括WebGL）及Web Workers、地理定位、跨文档传递消息、客户端存储（包括IndexedDB）等新API，还介绍了离线应用和与维护、性能、部署相关的最佳开发实践。本书附录展望了未来的API 和ECMAScript Harmony 规范。\r\n本书适合有一定编程经验的Web 应用开发人员阅读，也可作为高校及社会实用技术培训相关专业课程的教材。', '730', 'JavaScript,Web前端开发,javascript,前端开发,Web开发,js,web,前端', '', '1', '1', null, '0');

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
  `verify_code` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '注册改密码等的验证码',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=MyISAM AUTO_INCREMENT=1259 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户信息表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1258', '陈保需', 'bxchen@corp.netease.com', '202cb962ac59075b964b07152d234b70', '0', '12345678900', '1365145427.jpg', '好的，我来世一下啊', '0', '2013-04-05', '0000-00-00', '1', null);
