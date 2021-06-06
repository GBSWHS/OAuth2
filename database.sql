create database oauth;
create table oauth.clients (
  id int unsigned not null primary key,
  `secret` varchar(30) not null,
  redirect_uri text not null,
  used_count int unsigned default 0 not null,
  owner_id varchar(20) not null,
  created_at datetime not null,
  updated_at datetime not null,
  deleted_at datetime
);

create table oauth.users (
  id varchar(20) not null primary key,
  grade int unsigned not null,
  class int unsigned not null,
  class_number int unsigned not null,
  room_number int unsigned not null,
  `name` varchar(20) not null, 
  nickname varchar(9), 
  passwd char(64) not null,
  salt char(8) not null,
  permission int unsigned not null default 0,
  created_at datetime not null,
  updated_at datetime not null,
  deleted_at datetime
);

create user oauth@localhost;
grant all privileges on oauth.* to oauth@localhost;
