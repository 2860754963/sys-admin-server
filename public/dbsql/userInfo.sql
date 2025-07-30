/*
 Navicat Premium Dump SQL

 Source Server         : db01
 Source Server Type    : MySQL
 Source Server Version : 80042 (8.0.42)
 Source Host           : localhost:3306
 Source Schema         : node_sys_admin

 Target Server Type    : MySQL
 Target Server Version : 80042 (8.0.42)
 File Encoding         : 65001

 Date: 08/07/2025 13:51:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for userInfo
-- ----------------------------
DROP TABLE IF EXISTS `userInfo`;
CREATE TABLE `userInfo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
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
  `employee_id` bigint DEFAULT NULL COMMENT '员工id',
  `login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `device_id` varchar(100) DEFAULT NULL COMMENT '设备id',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `openid` varchar(100) DEFAULT NULL COMMENT '小程序id',
  `union_id` varchar(100) DEFAULT NULL COMMENT 'unionid',
  `is_inner` int DEFAULT NULL COMMENT '是否内部员工',
  `employee_dep_id` varchar(50) DEFAULT NULL COMMENT '部门id',
  `employee_dep_name` varchar(50) DEFAULT NULL COMMENT '部门名称',
  `login_ip` varchar(20) DEFAULT NULL COMMENT '登录IP',
  `is_complete_info` int DEFAULT '0' COMMENT '信息完善',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `is_login` tinyint DEFAULT NULL COMMENT '登录状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='用户信息表';

-- ----------------------------
-- Records of userInfo
-- ----------------------------
BEGIN;
INSERT INTO `userInfo` (`id`, `user_code`, `user_name`, `user_pwd`, `real_name`, `nick_name`, `sex`, `phone`, `avt_url`, `birthday`, `email`, `state`, `employee_id`, `login_time`, `device_id`, `remark`, `openid`, `union_id`, `is_inner`, `employee_dep_id`, `employee_dep_name`, `login_ip`, `is_complete_info`, `create_time`, `update_time`, `is_login`) VALUES (1, NULL, 'xiaomei', '123456', '小美', '小美昵称', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `userInfo` (`id`, `user_code`, `user_name`, `user_pwd`, `real_name`, `nick_name`, `sex`, `phone`, `avt_url`, `birthday`, `email`, `state`, `employee_id`, `login_time`, `device_id`, `remark`, `openid`, `union_id`, `is_inner`, `employee_dep_id`, `employee_dep_name`, `login_ip`, `is_complete_info`, `create_time`, `update_time`, `is_login`) VALUES (2, NULL, 'xiaoshuai', '123456', '小帅', '小帅昵称', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO `userInfo` (`id`, `user_code`, `user_name`, `user_pwd`, `real_name`, `nick_name`, `sex`, `phone`, `avt_url`, `birthday`, `email`, `state`, `employee_id`, `login_time`, `device_id`, `remark`, `openid`, `union_id`, `is_inner`, `employee_dep_id`, `employee_dep_name`, `login_ip`, `is_complete_info`, `create_time`, `update_time`, `is_login`) VALUES (3, NULL, 'nigulasi', '123456', '尼古拉斯', '麻辣炒仁', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
