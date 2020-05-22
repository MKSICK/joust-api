CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `num` int(10) unsigned NOT NULL,
  `name` varchar(256) NOT NULL,
  `applied_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `migrations_UN` (`name`),
  UNIQUE KEY `migrations_num_UN` (`num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `joustes` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `type` tinyint(3) NOT NULL,
    `name` varchar(256) NOT NULL,
    `description` text,
    `created_by` int(10) unsigned NOT NULL,
    `winner` int(10) unsigned,
    `location` varchar(256),
    `date_start` datetime,
    `date_end` datetime,
    `status` tinyint(3) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `competitions` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `joust_id` int(10) unsigned NOT NULL,
    `description` text,
    `date_start` datetime,
    `date_end` datetime,
    `member1` int(10) unsigned,
    `member2` int(10) unsigned,
    `winner` int(10) unsigned,
    `status` tinyint(3) NOT NULL,
    `stage` int(10) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`joust_id`) REFERENCES `joustes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `users` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `type` int(10) unsigned,
    `name` varchar(256) NOT NULL,
    `password` varchar(256) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `attendees` (
    `user_id` int(10) unsigned NOT NULL,
    `joust_id` int(10) unsigned NOT NULL,
    `score` int(10),
    PRIMARY KEY (`user_id`, `joust_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`joust_id`) REFERENCES `joustes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
