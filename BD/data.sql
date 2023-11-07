create database if not exists Eleicao;
use Eleicao;

show tables;

create table if not exists candidatos (
	Id int auto_increment primary key,
	nome_candidato varchar(100) not null,
	num_candidato int not null unique,
	votos int not null
);

create table if not exists estudantes (
	Id int auto_increment primary key,
    nome_estudante varchar(100) not null,
	email varchar(100) not null unique,
    senha varchar(40) not null
);

create table if not exists votantes (
	Id int auto_increment primary key,
    email varchar(100) not null unique,
    num_candidato int not null unique,
    foreign key (email) references estudantes(email),
    foreign key (num_candidato) references candidatos(num_candidato)
);

#insert into candidatos (nome_candidato, num_candidato, votos) values 
#("Ana Maria Torres", 1, 0),
#("Pedro Farias", 2, 0),
#("Joana Fon", 3, 0);

DELIMITER //
CREATE TRIGGER after_insert_votantes
AFTER INSERT ON votantes
FOR EACH ROW
BEGIN
    UPDATE candidatos
    SET votos = votos + 1
    WHERE num_candidato = NEW.num_candidato;
END;
//
DELIMITER ;

select * from candidatos;
select * from estudantes;
select * from votantes;