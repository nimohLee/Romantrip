CREATE user Grpware@'%' identified by 'Grpware'; // 1234는 비밀번호
GRANT all privileges on travel.* to Grpware@'%' with grant option;

use travel;

CREATE TABLE board(
    idx int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(10) NOT NULL,
    writer VARCHAR(10) NOT NULL,
    content VARCHAR(1000),
    views int NOT NULL DEFAULT 0
);

CREATE TABLE member(
    idx int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    id VARCHAR(20) NOT NULL,
    pw VARCHAR(20) NOT NULL,
    email VARCHAR(20) NOT NULL,
    regDate date NOT NULL
);