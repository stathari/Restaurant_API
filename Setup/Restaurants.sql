drop schema zappos_restapi;
create schema zappos_restapi;
use zappos_restapi;


/*deleting tables that are already created as part of environment setup*/
drop table if exists restaurants;
drop table if exists menus;
drop table if exists menu_items;

/* required tables */

/*rid created for each restaurant will be unique and it is the primary key of restaurants table*/
CREATE TABLE IF NOT EXISTS `restaurants` (
  `rid` int(11) NOT NULL AUTO_INCREMENT,
  `rname` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`rid`)
);

/*To avoid duplication I have added a composite primary key with rid, menu: simultaing that a restaurant can have single menu for breakfast, dinner, lunch, drinks*/						 
CREATE TABLE IF NOT EXISTS `menus` (
  `menu` varchar(50) COLLATE utf8_czech_ci NOT NULL,
  `description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `rid` int(11) NOT NULL,
  PRIMARY KEY (`rid`,`menu`),
  CONSTRAINT `restaurants_fk` FOREIGN KEY (`rid`) REFERENCES `restaurants` (`rid`) ON DELETE CASCADE
);

/*Items tables can have multiple items within a menu so to simulate this i have added the composite key (item_name, menu,rid) and they point to the rid and menu of menus table*/				   
CREATE TABLE `menu_items` (
  `item_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `item_description` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `price` decimal(5,2) NOT NULL,
  `rid` int(11) NOT NULL,
  `menu` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`menu`,`rid`,`item_name`),
  KEY `restaurants_fk1_idx` (`rid`,`menu`),
  CONSTRAINT `foreignkey` FOREIGN KEY (`rid`) REFERENCES `restaurants` (`rid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
