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

 Date: 08/07/2025 14:59:56
*/

SET NAMES utf8mb4; 
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` BIGINT(20) NOT NULL COMMENT '菜单ID',
  `parent_id` BIGINT(20) DEFAULT 0 COMMENT '父菜单ID',
  `path` VARCHAR(255) DEFAULT NULL COMMENT '路由路径',
  `name` VARCHAR(100) DEFAULT NULL COMMENT '路由名称',
  `component` VARCHAR(255) DEFAULT NULL COMMENT '组件路径',
  `redirect` VARCHAR(255) DEFAULT NULL COMMENT '重定向地址',
  `meta_title` VARCHAR(100) DEFAULT NULL COMMENT '标题',
  `meta_icon` VARCHAR(100) DEFAULT NULL COMMENT '图标',
  `meta_breadcrumb` BOOLEAN DEFAULT TRUE COMMENT '是否显示面包屑',
  `hidden` BOOLEAN DEFAULT FALSE COMMENT '是否隐藏',
  `always_show` BOOLEAN DEFAULT FALSE COMMENT '是否总是显示根菜单',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='菜单信息表';

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` (`id`, `parent_id`, `path`, `name`, `component`, `redirect`, `meta_title`, `meta_icon`, `meta_breadcrumb`, `hidden`, `always_show`) VALUES
('996012789342433537', 0, '/dashboard', '工作台', '/dashboard/index', NULL, '工作台', 'el-icon-eleme', TRUE, FALSE, FALSE),
('996013586302137537', 0, '/transit', '基础数据管理', 'Layout', NULL, '基础数据管理', 'el-icon-medal', TRUE, FALSE, TRUE),
('996014097885592353', '996013586302137537', '/branches/organization-manage', '机构管理', '/branches/organization-manage/index', NULL, '机构管理', '', TRUE, FALSE, FALSE),
('996014173659888673', '996013586302137537', '/branches/institutions-jobs-area', '机构作业范围', '/branches/institutions-jobs-area/index', NULL, '机构作业范围', '', TRUE, FALSE, FALSE),
('996013891701995649', '996013586302137537', '/transit/freight-manage', '运费管理', '/transit/freight-manage/index', NULL, '运费管理', '', TRUE, FALSE, FALSE),
('1013825825621851521', 0, '/transit1', '车辆管理', 'Layout', NULL, '车辆管理', 'el-icon-eleme', TRUE, FALSE, TRUE),
('996013688966116737', '1013825825621851521', '/transit/car-models', '车型管理', '/transit/car-models/index', NULL, '车型管理', '', TRUE, FALSE, FALSE),
('996013733509625409', '1013825825621851521', '/transit/vehicle', '车辆列表', '/transit/vehicle/index', NULL, '车辆列表', '', TRUE, FALSE, FALSE),
('996014803833095265', '1013825825621851521', '/transit/car-register', '回车登记', '/transit/car-register/index', NULL, '回车登记', '', TRUE, FALSE, FALSE),
('1013826500665722913', 0, '/transit2', '员工管理', 'Layout', NULL, '员工管理', 'el-icon-user', TRUE, FALSE, TRUE),
('996014324117962145', '1013826500665722913', '/branches/operational-range', '快递员管理', '/branches/operational-range/index', NULL, '快递员管理', '', TRUE, FALSE, FALSE),
('996013790027872001', '1013826500665722913', '/transit/driver', '司机管理', '/transit/driver/index', NULL, '司机管理', '', TRUE, FALSE, FALSE),
('996013832419702721', '1013826500665722913', '/transit/workArrange-manage', '排班管理', '/transit/workArrange-manage/index', NULL, '排班管理', '', TRUE, FALSE, FALSE),
('996014431324372769', 0, '/business', '业务管理', 'Layout', NULL, '业务管理', 'el-icon-set-up', TRUE, FALSE, TRUE),
('996014478124416993', '996014431324372769', '/business/order-manage', '订单管理', '/business/order-manage/index', NULL, '订单管理', '', TRUE, FALSE, FALSE),
('996014533355012257', '996014431324372769', '/business/waybill', '运单管理', '/business/waybill/index', NULL, '运单管理', '', TRUE, FALSE, FALSE),
('996014596043080033', 0, '/transport', '调度管理', 'Layout', NULL, '调度管理', 'el-icon-service', TRUE, FALSE, TRUE),
('996014640003580449', '996014596043080033', '/transport/transport-task', '运输任务管理', '/transport/transport-task/index', NULL, '运输任务管理', '', TRUE, FALSE, FALSE),
('996014685012656865', '996014596043080033', '/transport/line-manage', '线路管理', '/transport/line-manage/index', NULL, '线路管理', '', TRUE, FALSE, FALSE),
('1016645172630893697', '996014596043080033', '/branches/pickUptask', '取件作业管理', '/branches/pickUptask/index', NULL, '取件作业管理', '', TRUE, FALSE, FALSE),
('1016645380668372641', '996014596043080033', '/branches/dispatchTask', '派件作业管理', '/branches/dispatchTask/index', NULL, '派件作业管理', '', TRUE, FALSE, FALSE);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
