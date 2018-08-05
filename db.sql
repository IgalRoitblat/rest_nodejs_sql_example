create DATABASE furniture;
use furniture;

create table colors (
	id int unsigned AUTO_INCREMENT PRIMARY key,
    name varchar(60)
);

create table chairs (
	id int AUTO_INCREMENT PRIMARY key,
    name varchar(60),
    color_id int unsigned,
    index color_id_idx (color_id),
    foreign key fk_color_id (color_id) REFERENCES colors (id) on DELETE CASCADE
);

create table tables (
	id int AUTO_INCREMENT PRIMARY key,
    name varchar(60),
    color_id int unsigned,
    index color_id_idx (color_id),
    foreign key fk_color_id (color_id) REFERENCES colors (id) on DELETE CASCADE
);

insert into colors (name)
values ('white'), ('brown'), ('black');

insert into chairs (name, color_id)
values ('Acapulco chair', 1), ('Adirondack chair', 2), ('Ball chair', 2);

insert into tables (name, color_id)
values ('dinning table', 1), ('coffee table', 2);
