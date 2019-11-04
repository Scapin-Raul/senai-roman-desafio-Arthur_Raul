create database M_Roman

use m_roman

create table Professores(
	IdProfessor int identity primary key,
	Nome Varchar(255) not null unique,
	Senha Varchar(255) not null,
);
	
create table Temas(
	IdTema int identity primary key
	,Nome varchar(255) not null unique
);

CREATE TABLE Projetos(
	IdProjeto int identity primary key,
	Nome varchar(255) not null,
	Descricao varchar(255),
	IdTema INT FOREIGN KEY REFERENCES Temas(IdTema),
	IdProfessor INT FOREIGN KEY REFERENCES Professores(IdProfessor)
);

insert professores(Nome,Senha)
	values('Cleiton','12345')

insert temas(Nome)
	values('Gestão')

insert projetos(Nome,IdTema,IdProfessor)
	values('Fazer barquinho',1,1)

delete Projetos where IdProjeto = 6

select * from Projetos
select * from temas
select * from professores