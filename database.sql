create database oauth;

create user oauth@localhost;
grant all privileges on oauth.* to oauth@localhost;

use oauth;

CREATE TABLE `users` (
	`user_ident`	bigint	NOT NULL,
	`group_id`	varchar(255)	NOT NULL	DEFAULT 0,
	`student_id`	varchar(30)	NULL,
	`user_email`	varchar(50)	NOT NULL,
	`user_id`	varchar(12)	NOT NULL,
	`user_nickname`	varchar(10)	NULL,
	`user_realname`	varchar(4)	NOT NULL,
	`gender`	tinyint(1)	NOT NULL,
	`user_password`	char(128)	NOT NULL,
	`user_salt`	char(10)	NOT NULL,
	`user_createdAt`	timestamp	NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `social` (
	`user_ident`	bigint	NOT NULL,
	`group_id`	int	NOT NULL,
	`student_id`	varchar(30)	NOT NULL,
	`social_provider`	varchar(10)	NOT NULL,
	`social_subject`	varchar(255)	NOT NULL,
	`social_connected_date`	timestamp	NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `log` (
	`user_ident`	bigint	NOT NULL,
	`student_id`	varchar(30)	NOT NULL,
	`log_time`	timestamp	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
	`log_type`	int(1)	NOT NULL,
	`log_extra`	varchar(255)	NULL
);

CREATE TABLE `groups` (
	`group_id`	int	NOT NULL,
	`group_name`	varchar(10)	NOT NULL	DEFAULT '(이름없음)',
	`group_created_date`	timestamp	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
	`group_permission`	int	NOT NULL	DEFAULT 0
);

CREATE TABLE `students` (
	`student_id`	varchar(30)	NOT NULL,
	`student_name`	varchar(4)	NOT NULL,
	`student_grade`	int(1)	NOT NULL,
	`student_class`	int(2)	NOT NULL,
	`student_number`	int(2)	NOT NULL,
	`student_phone`	int(11)	NOT NULL,
	`student_room`	int(4)	NULL,
	`student_address`	text	NOT NULL
);

CREATE TABLE `applications` (
	`app_id`	varchar(30)	NOT NULL,
	`user_ident`	bigint	NOT NULL,
	`group_id`	varchar(255)	NOT NULL	DEFAULT 0,
	`student_id`	varchar(30)	NULL,
	`app_name`	varchar(20)	NOT NULL,
	`app_desc`	text	NULL,
	`app_secret`	varchar(30)	NOT NULL,
	`app_redirect`	text	NOT NULL,
	`app_used_count`	int(10)	NOT NULL	DEFAULT 0,
	`app_created_at`	datetime	NOT NULL,
	`app_updated_at`	datetime	NOT NULL,
	`app_deleted_at`	datetime	NULL,
	`app_website`	text	NULL,
	`app_icon`	text	NULL
);

ALTER TABLE `users` ADD CONSTRAINT `PK_USERS` PRIMARY KEY (
	`user_ident`,
	`group_id`,
	`student_id`
);

ALTER TABLE `social` ADD CONSTRAINT `PK_SOCIAL` PRIMARY KEY (
	`user_ident`,
	`group_id`,
	`student_id`
);

ALTER TABLE `log` ADD CONSTRAINT `PK_LOG` PRIMARY KEY (
	`user_ident`,
	`student_id`
);

ALTER TABLE `groups` ADD CONSTRAINT `PK_GROUPS` PRIMARY KEY (
	`group_id`
);

ALTER TABLE `students` ADD CONSTRAINT `PK_STUDENTS` PRIMARY KEY (
	`student_id`
);

ALTER TABLE `applications` ADD CONSTRAINT `PK_APPLICATIONS` PRIMARY KEY (
	`app_id`,
	`user_ident`,
	`group_id`,
	`student_id`
);

ALTER TABLE `users` ADD CONSTRAINT `FK_groups_TO_users_1` FOREIGN KEY (
	`group_id`
)
REFERENCES `groups` (
	`group_id`
);

ALTER TABLE `users` ADD CONSTRAINT `FK_students_TO_users_1` FOREIGN KEY (
	`student_id`
)
REFERENCES `students` (
	`student_id`
);

ALTER TABLE `social` ADD CONSTRAINT `FK_users_TO_social_1` FOREIGN KEY (
	`user_ident`
)
REFERENCES `users` (
	`user_ident`
);

ALTER TABLE `social` ADD CONSTRAINT `FK_users_TO_social_2` FOREIGN KEY (
	`group_id`
)
REFERENCES `users` (
	`group_id`
);

ALTER TABLE `social` ADD CONSTRAINT `FK_users_TO_social_3` FOREIGN KEY (
	`student_id`
)
REFERENCES `users` (
	`student_id`
);

ALTER TABLE `log` ADD CONSTRAINT `FK_users_TO_log_1` FOREIGN KEY (
	`user_ident`
)
REFERENCES `users` (
	`user_ident`
);

ALTER TABLE `log` ADD CONSTRAINT `FK_users_TO_log_2` FOREIGN KEY (
	`student_id`
)
REFERENCES `users` (
	`student_id`
);

ALTER TABLE `applications` ADD CONSTRAINT `FK_users_TO_applications_1` FOREIGN KEY (
	`user_ident`
)
REFERENCES `users` (
	`user_ident`
);

ALTER TABLE `applications` ADD CONSTRAINT `FK_users_TO_applications_2` FOREIGN KEY (
	`group_id`
)
REFERENCES `users` (
	`group_id`
);

ALTER TABLE `applications` ADD CONSTRAINT `FK_users_TO_applications_3` FOREIGN KEY (
	`student_id`
)
REFERENCES `users` (
	`student_id`
);

