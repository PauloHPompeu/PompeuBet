CREATE TABLE pompeu_bet.usuario (
    id serial4 PRIMARY KEY,
    nome varchar(255) NULL,
    senha varchar(255) NULL,
    saldo double precision NULL
);

CREATE TABLE pompeu_bet.evento (
   id serial4 PRIMARY KEY,
   nome varchar(255) NULL,
   data TIMESTAMP,
   categoria VARCHAR(30)
);

CREATE TABLE pompeu_bet.bet (
    id serial4 PRIMARY KEY,
    tipo_bet VARCHAR(30),
    valor double precision NULL,
    id_usuario int4 NOT NULL,
    id_evento int4 NOT NULL,

    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES pompeu_bet.usuario(id),
    CONSTRAINT fk_evento FOREIGN KEY (id_evento) REFERENCES pompeu_bet.evento(id)
);
