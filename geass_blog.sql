/*
 Source Server Type    : MySQL
 Date: 18/01/2018 15:10:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` bigint(16) NOT NULL AUTO_INCREMENT,
  `author` varchar(50) DEFAULT 'Geass',
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `title` text,
  `content` text,
  `abstraction` text,
  `image_url` text COMMENT '标题图片地址',
  `status` int(1) DEFAULT NULL COMMENT '文章状态，0草稿，1发布',
  `visited_count` int(8) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `author` varchar(100) DEFAULT NULL,
  `message` text,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `article_id` bigint(8) DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `article_foreign` (`article_id`),
  CONSTRAINT `article_foreign` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for errors
-- ----------------------------
DROP TABLE IF EXISTS `errors`;
CREATE TABLE `errors` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `ua` varchar(256) DEFAULT NULL,
  `errInfo` text,
  `stack` text,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tag2article
-- ----------------------------
DROP TABLE IF EXISTS `tag2article`;
CREATE TABLE `tag2article` (
  `article_id` bigint(16) DEFAULT NULL,
  `tag_id` int(8) DEFAULT NULL,
  KEY `article_foreign` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `name` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`name`,`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
