USE node_sys_admin;

-- 删除原有表
DROP TABLE IF EXISTS `user_info1`;

-- 创建表结构
CREATE TABLE `user_info1` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`user_code` varchar(36) DEFAULT NULL COMMENT '用户编号',
	`user_name` varchar(100) DEFAULT NULL COMMENT '用户名',
	`user_pwd` varchar(255) DEFAULT NULL COMMENT '密码',
	`real_name` varchar(50) DEFAULT NULL COMMENT '姓名',
	`nick_name` varchar(50) DEFAULT NULL COMMENT '昵称',
	`sex` char(1) DEFAULT NULL COMMENT '性别',
	`phone` varchar(11) DEFAULT NULL COMMENT '手机号',
	`avt_url` varchar(255) DEFAULT NULL COMMENT '头像',
	`birthday` datetime DEFAULT NULL COMMENT '生日',
	`email` varchar(50) DEFAULT NULL COMMENT '邮箱',
	`state` char(1) DEFAULT NULL COMMENT '状态',
	`employee_id` bigint(20) DEFAULT NULL COMMENT '员工id',
	`login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
	`device_id` varchar(100) DEFAULT NULL COMMENT '设备id',
	`remark` varchar(255) DEFAULT NULL COMMENT '备注',
	`openid` varchar(100) DEFAULT NULL COMMENT '小程序id',
	`union_id` varchar(100) DEFAULT NULL COMMENT 'unionid',
	`is_inner` int(11) DEFAULT NULL COMMENT '是否内部员工',
	`employee_dep_id` varchar(50) DEFAULT NULL COMMENT '部门id',
	`employee_dep_name` varchar(50) DEFAULT NULL COMMENT '部门名称',
	`login_ip` varchar(20) DEFAULT NULL COMMENT '登录IP',
	`is_complete_info` int(11) DEFAULT '0' COMMENT '信息完善',
	`create_time` datetime DEFAULT NULL,
	`update_time` datetime DEFAULT NULL,
	`is_login` tinyint(4) DEFAULT NULL COMMENT '登录状态',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信息表';

-- 插入只保留用户名和密码
INSERT INTO `user_info1` (`user_name`, `user_pwd`)
VALUES
('18751834575', NULL),
('分销测试', '2222'),
('15998271860', NULL),
('17719210052', NULL);