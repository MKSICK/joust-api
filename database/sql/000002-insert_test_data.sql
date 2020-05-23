-- 2020-05-20T22:40:03+0300
LOCK TABLES `migrations` WRITE;
INSERT INTO `migrations` (`name`, `num`) VALUES ('000002-insert_test_data.sql', 2);
UNLOCK TABLES;

-- Joustes
INSERT INTO `joustes` (`type`, `name`, `description`, `created_by`,
`location`, `date_start`, `date_end`, `status`) 
VALUES ('0', 'Test Circle', 'Test Description', 1, 
'Test Location', '2020-08-01 19:00:00', '2020-08-03 19:00:00', 0);


INSERT INTO `joustes` (`type`, `name`, `description`, `created_by`,
`location`, `date_start`, `date_end`, `status`) 
VALUES ('1', 'Test Olympic', 'Test Description', 1, 
'Test Location', '2020-09-01 19:00:00', '2020-09-03 19:00:00', 0);

-- Users
INSERT INTO `users` (`type`, `name`, `password`) VALUES (0, 'root', 'root');

INSERT INTO `users` (`type`, `name`, `password`) VALUES (1, 'admin', 'admin');

INSERT INTO `users` (`type`, `name`, `password`) VALUES (2, 'attendee1', 'pass');
INSERT INTO `users` (`type`, `name`, `password`) VALUES (2, 'attendee2', 'pass');
INSERT INTO `users` (`type`, `name`, `password`) VALUES (2, 'attendee3', 'pass');
INSERT INTO `users` (`type`, `name`, `password`) VALUES (2, 'attendee4', 'pass');
INSERT INTO `users` (`type`, `name`, `password`) VALUES (2, 'attendee5', 'pass');
INSERT INTO `users` (`type`, `name`, `password`) VALUES (2, 'attendee6', 'pass');
INSERT INTO `users` (`type`, `name`, `password`) VALUES (2, 'attendee7', 'pass');
INSERT INTO `users` (`type`, `name`, `password`) VALUES (2, 'attendee8', 'pass');

-- Attendees
INSERT INTO `attendees` (`user_id`, `joust_id`) VALUES (3, 1);
INSERT INTO `attendees` (`user_id`, `joust_id`) VALUES (4, 1);
INSERT INTO `attendees` (`user_id`, `joust_id`) VALUES (5, 1);
INSERT INTO `attendees` (`user_id`, `joust_id`) VALUES (6, 1);
INSERT INTO `attendees` (`user_id`, `joust_id`) VALUES (7, 1);
INSERT INTO `attendees` (`user_id`, `joust_id`) VALUES (8, 1);
INSERT INTO `attendees` (`user_id`, `joust_id`) VALUES (9, 1);
INSERT INTO `attendees` (`user_id`, `joust_id`) VALUES (10, 1);

INSERT INTO `attendees` (`user_id`, `joust_id`) VALUES (3, 2);
INSERT INTO `attendees` (`user_id`, `joust_id`) VALUES (4, 2);
INSERT INTO `attendees` (`user_id`, `joust_id`) VALUES (5, 2);
INSERT INTO `attendees` (`user_id`, `joust_id`) VALUES (6, 2);

-- Competitions
INSERT INTO `competitions` (`joust_id`,`member1`, `member2`, `status`, `stage`) 
VALUES (1, 3, 4, 0, 0);
INSERT INTO `competitions` (`joust_id`,`member1`, `member2`, `status`, `stage`) 
VALUES (1, 5, 6, 0, 0);
INSERT INTO `competitions` (`joust_id`,`member1`, `member2`, `status`, `stage`) 
VALUES (1, 7, 8, 0, 0);
INSERT INTO `competitions` (`joust_id`,`member1`, `member2`, `status`, `stage`) 
VALUES (1, 9, 10, 0, 0);
