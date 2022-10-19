-- user : root
CREATE USER 'roman'@'localhost' IDENTIFIED WITH mysql_native_password BY 'roman';
GRANT all privileges on roman.* to roman@'%' with grant option;
-- user : romantrip
CREATE database romantrip;

USE romantrip;

CREATE TABLE member(
    m_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    id VARCHAR(20) NOT NULL,
    pw VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    regDate date NOT NULL
);

CREATE TABLE board(
    b_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	m_id int NOT NULL,
    title VARCHAR(10) NOT NULL,
    content VARCHAR(1000),
    regDate date,
    views int NOT NULL DEFAULT 0
);

CREATE TABLE tourList(
	tl_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
	description VARCHAR(500) NOT NULL,
    image VARCHAR(100),
    price VARCHAR(10) NOT NULL
);

CREATE TABLE tourCart(
	tc_id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	m_id int NOT NULL,
    tl_id int NOT NULL,
    price VARCHAR(10) NOT NULL
);

