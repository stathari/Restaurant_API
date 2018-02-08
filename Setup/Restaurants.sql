drop schema zappos_restapi;
create schema zappos_restapi;
use zappos_restapi;


/*deleting tables that are already created as part of environment setup*/
drop table if exists restaurants;
drop table if exists menus;
drop table if exists menu_items;

/* required tables */
CREATE TABLE IF NOT EXISTS `restaurants` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `rname` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`rid`)
);

						 
CREATE TABLE IF NOT EXISTS `menus` (
  `menu` varchar(50) COLLATE utf8_czech_ci NOT NULL,
  `description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `rid` int(11) NOT NULL,
  PRIMARY KEY (`rid`,`menu`),
  CONSTRAINT `restaurants_fk` FOREIGN KEY (`rid`) REFERENCES `restaurants` (`rid`) ON DELETE CASCADE
);

				   
CREATE TABLE IF NOT EXISTS `menu_items` (
  `item_name` varchar(50) NOT NULL,
  `item_description` varchar(150) DEFAULT NULL,
  `price` decimal(5,2) NOT NULL,
  `rid` int(11) NOT NULL,
  `menu` varchar(50) NOT NULL,
  PRIMARY KEY (`menu`,`rid`,`item_name`),
  KEY `restaurants_fk1_idx` (`rid`,`menu`,`item_id`),
  CONSTRAINT `foreignkey` FOREIGN KEY (`rid`) REFERENCES `restaurants` (`rid`) ON DELETE CASCADE
);

				  
					   
