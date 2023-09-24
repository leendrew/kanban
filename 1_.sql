create table if not exists users (
  id serial not null constraint user_id_pk primary key,
);

create table if not exists boards (
  id serial not null constraint board_id_pk primary key,
);

create table if not exists user_boards (
  id serial not null constraint user_board_id_pk primary key,
  user_id int not null constraint user_id_fk references users(id) on update cascade on delete cascade,
  board_id int not null constraint board_id_fk references boards(id) on update cascade on delete cascade
);

create table if not exists cards (
  id serial not null constraint card_id_pk primary key,
);

create table if not exists board_cards (
  id serial not null constraint board_card_id_pk primary key,
  board_id int not null constraint board_id_fk references boards(id) on update cascade on delete cascade,
  card_id int not null constraint card_id_fk references cards(id) on update cascade on delete cascade
);
