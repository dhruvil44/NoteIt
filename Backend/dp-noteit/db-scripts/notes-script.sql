use `database_noteit`;

create table `notebook`(
`id` bigint not null auto_increment,
`name` varchar(20),
primary key(`id`)
);

create table `note`(
`id` bigint not null auto_increment,
`title` varchar(30),
`text` varchar(200),
`notebook_id` bigint default null, 
`last_modified_on` datetime(6) DEFAULT NULL,
primary key(`id`),
CONSTRAINT `FK_notebook_id` FOREIGN KEY (`notebook_id`) REFERENCES `notebook` (`id`)
);


