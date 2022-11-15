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

INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (1,'sightseeing','감천문화마을','감천문화마을은 1950년대 6.25 피난민의 힘겨운 삶의 터전으로 시작되어 현재에 이르기까지 민족현대사의 한 단면과 흔적인 부산의 역사를 그대로 간직하고 있는 곳입니다. 산자락을 따라 질서정연하게 늘어선 계단식 집단 주거형태와 모든 길이 통하는 미로미로(美路迷路) 골목길의 경관은 감천만의 독특함을 보여줍니다. 감천의 이런 특색과 역사적 가치를 살리기 위해 지역 예술인들과 마을 주민들이 모여 시작한 『마을미술 프로젝트』는 감천문화마을 만들기 사업의 디딤돌이 되었으며 이 사업을 시작으로 각종 공모사업을 유치하여 2015년에는 140만여명이 방문하는 명소가 되었습니다.','부산 사하구 감내2로 203','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/sightseeing%2Fgamcheon.jpg?alt=media&token=fbaaa870-5fa8-48db-afda-164f6f825e36');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (2,'sightseeing','해운대','해운대해수욕장은 해운대 중심에 있는 대한민국의 대표적인 해수욕장이다. 고운 모래로 이루어진 해변의 총 면적은 58,400m2이며 길이는 1.5km, 폭은 30m ~ 50m이다.','부산 해운대구 우1동 ~ 중1동 일대','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/sightseeing%2Fhaeundae.jpg?alt=media&token=74f583a2-12eb-4249-a7cb-ddb050374385');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (3,'sightseeing','태종대','이름의 유래는 신라 태종 무열왕이 들러서 활쏘기를 하고 연회를 개최했던 것이다.선시대 안정복의 동사강목에서는 태종 무열왕이 일본 대마도를 공격해 토벌했을 때 주필(駐蹕)한 곳이라는 기록도 있는데, 무열왕의 대마도 공격은 고려 이전의 기록에서 교차검증되는 부분이 아니라 큰 주목을 받진 못하고 있고 아무튼 조선시대에 그런 전승이 전해지고 있었다는 근거는 된다.','부산광역시 영도구 동삼동','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/sightseeing%2Ftaejongdae.jpg?alt=media&token=9de82585-0ede-43c1-a838-f51afdaf3c65');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (4,'sightseeing','범어사','부산 금정산에 위치한 범어사는 신라 제30대 문무왕 18년(678년)에 의상대사가 화엄십찰 가운데 하나로 창건했다. <신증동국여지승람>에는 금빛나는 물고기가 하늘에서 내려와 우물에서 놀았다고 해서 산 이름이 금정산(金井山)이고 그곳에 사찰을 지어 범어사(梵魚寺)를 건립했다고 기록하고 있다.','부산광역시 금정구 청룡동 금정산에 있는 사찰','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/sightseeing%2Fbeomeosa.jpg?alt=media&token=d0a3827e-01ec-41e3-a45b-2b255e0f247e');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (5,'sightseeing','광안리해수욕장','젊은이들이 즐겨 찾는 명소이다. 광안리에서는 해수욕뿐 아니라 독특한 분위기를 자아내는 레스토랑, 카페 등과 시내 중심가 못지않은 유명 패션상가들이 즐비하며, 다양한 먹을거리, 볼거리가 있어서 피서의 즐거움을 더해준다. 특히 밤이 되면 광안대교의 아름다운 야경이 장관이다.','부산광역시 수영구 광안2동','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/sightseeing%2Fgwanalli.jpg?alt=media&token=efc5a8b9-c112-459b-851e-b4c833fada55');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (6,'sightseeing','UN기념공원','한국전쟁에 참전한 유엔군 전사자가 안장된 곳으로, 유엔에서 직접 관리했던 세계 유일의 유엔기념묘지이며 성지이다. 미국, 영국, 터키 등의 전사자 2,300명이 잠들어 있으며, 건축가 김중업이 설계한 정문과 추모관이 있다.','부산 남구 유엔평화로 93','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/sightseeing%2Fun_park.jpeg?alt=media&token=20055ffb-7e8c-4c74-8149-5180db01a549');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (7,'amusement','롯데월드 어드벤쳐 부산','오시리아관광단지 테마파크존 내에 조성된 핵심시설로, 서울에 있는 롯데월드 어드벤처와 부산 롯데월드 스카이프라자에 이은 롯데월드의 3번째 테마파크이다.콘셉트는 \'아시아 최초 유럽형 테마파크\'이다. 놀이기구들이 모두 하나의 이야기로 연결되어 있는것으로 보인다.파크 부제의 매직 포레스트라는 명칭에 걸맞게 동물과 농장이 연상되는 디자인의 테마구역들이 조성되어 있고, 이에 맞춰 어트랙션들도 동물과 농장을 주제로 설계된 모습을 확인할 수 있다.','부산광역시 기장군 기장읍 시랑리','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/amusement%2Flotteworld.jpeg?alt=media&token=4af7ac6a-d7f8-418d-b8d4-6d58557091c8');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (8,'amusement','런닝맨 부산점','런닝맨 체험관은 인기 예능 프로그램 <런닝맨> 포맷을 그대로 오프라인에 옮겨 직접 런닝맨 멤버가 되어 다양한 미션을 완수하는 체험형 어트랙션이다.','부산광역시 부산진구 부전동 227-2 삼정타워 10층','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/amusement%2Frunning.jpeg?alt=media&token=6866660f-0802-4efb-b4ed-5a6dc3dd9e13');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (9,'amusement','김해 롯데워터파크','롯데월드에서 운영하며, 대한민국에서 가장 큰 규모의 워터파크이다. 대한민국에 있는 워터파크 중에서 두번째로 높은 파도가 치는 곳이다.(최대 2.7m). 2012년 8월 9일에 개장하였다.','경상남도 김해시 신문동','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/amusement%2Fwaterpark.jpeg?alt=media&token=6e2308aa-719f-4fb9-979f-92ca060eefd5');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (10,'amusement','스카이라인 루지 부산','1984년, 뉴질랜드 로토투아에서 처음 개발된 남녀노소 누구나 즐길 수 있는 중력을 이용한 놀이기구이다. 다운힐을 위해 특수하게 제작된 루지카트를 타고 약 1.5km(통영 트랙 기준)정도 되는 트랙을 달리는 놀이기구이며 최고지점부터 최저지점까지의 높이 차이는 약 100m이다.',' 부산광역시 기장군 기장해안로 205','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/amusement%2Fruge.jpeg?alt=media&token=c68a593a-1644-4b49-8ffd-61e4a05b3ebc');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (11,'leisure','스쿠버다이빙','태종대에서 즐기는 스쿠버 다이빙','부산광역시 영도구 동삼동','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/leisure%2Fdiving.jpeg?alt=media&token=48210488-fff5-4c3b-a77b-0613358ae8b4');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (12,'leisure','해운대 리버크루즈','APEC 나루공원을 출발하여 마린시티, 광안대교를 볼 수 있는 코스로 강과 바다를 모두 볼 수 있는 부산 최초의 도심형 유람선. 데이크루즈, 나이트크루즈 및 디너크루즈로 정규 운항이 편성되어 있어 수영강과 해운대, 광안리 바다의 낮과 밤을 한 번에 즐길 수 있다.','부산광역시 해운대구 수영강변대로 85','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/leisure%2Frivercruise.jpeg?alt=media&token=a1334755-b9c6-4cd4-a9e2-5ef16d01ff0a');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (13,'leisure','수영강 카약체험','부산의 복판에서 수영강을 따라 유유자적 카약을 즐겨자보자','부산광역시 수영구 수영로741번길 20 102동 앞 수영강','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/leisure%2Fkayak.jpeg?alt=media&token=b45e8b2a-b0d5-4c70-8c1a-66a8404ba3ca');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (14,'leisure','요트 투어','누구나 가지고 있는 낭만 그 자체! 부산 앞바다에서 요트를 타고 여유를 만끽해보자','부산광역시 해운대구 해운대해변로 84','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/leisure%2Fyacht.jpeg?alt=media&token=66eb3546-dde8-4d6d-8396-68a035149403');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (15,'leisure','서핑','요즘 인기가 급상승하여 국민 수상레저가 된 서핑! 나도 해보고는 싶은데 시작이 어렵다면? 부산에서 시작해보자! ','송정해수욕장, 다대포해수욕장, 광안리해수욕장 등','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/leisure%2Fsurfing.jpeg?alt=media&token=e48901c0-eb7a-4021-b026-be1315bce20f');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (16,'leisure','패들보드','수상 레저를 즐기고 싶은데 서핑은 자신이 없다면? 좀 더 여유롭고 쉬운 패들보드로 시작해보자! ','부산광역시 광안리 해수욕장','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/leisure%2Fboard.jpeg?alt=media&token=0b00ee7b-79c7-43ee-85d5-830d9f392ede');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (17,'restaurant','쌍둥이돼지국밥','부산하믄 돼지구빱 아이가! 부산사람들도 인정하는 찐 돼지국밥집','부산광역시 남구 유엔평화로 35-1','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/restaurant%2FtwinPig.jpeg?alt=media&token=87f163f3-81e3-4352-835c-528fdb6557b2');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (18,'restaurant','초량밀면','부산역 앞에 위치한 밀면 맛집! 기차에서 내리자마자 느껴보는 부산의 찐맛집','부산광역시 동구 중앙대로 225','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/restaurant%2Fchoryang.jpeg?alt=media&token=752c1766-cc35-444d-9227-8e3a25f458a4');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (19,'restaurant','해운대암소갈비','셀럽들의 단골고깃집! 소 생갈비부터 양념갈비까지 뭐하나 빠지는 곳 없는 맛집','부산광역시 해운대구 중동2로10번길 32-10','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/restaurant%2Famso.jpeg?alt=media&token=1dfd31c0-cc94-460d-8393-df5310a3f754');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (20,'restaurant','상국이네','해운대 시장에 있는 맛있는 분식집! 한 입 먹어보면 왜 줄 서는 지 알 수 있는 그 맛!','부산광역시 해운대구 구남로41번길 40-1','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/restaurant%2Fsangkuk.jpeg?alt=media&token=bb441883-df8a-4054-a3f3-db909123b03f');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (21,'restaurant','톤쇼우','제주도에 연돈이 있다면 부산에는 톤쇼우가 있다! 버크셔 K 돼지고기를 사용한 최상급 돈카츠를 맛볼 수 있는 식당','부산광역시 수영구 광안해변로279번길 13','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/restaurant%2Ftonshou.jpeg?alt=media&token=023ee473-a784-4188-8544-689cdfe4f8ac');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (22,'restaurant','신발원','만두 싫어하는 사람도 가면 두판 먹고 온다는 전설의 부산 만두집!','부산광역시 동구 대영로 243번길 62','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/restaurant%2Fsinbal.jpeg?alt=media&token=08cebe6c-fb95-46bd-b2d2-24e94ce017ec');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (23,'cafe','제이엠 커피 로스터스','이것은 카페인가 공장인가.. 로스팅 공장을 소유하여 매일 로스팅하는 신선하고 신기한 카페','부산광역시 기장군 기장읍 대변리 265','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/cafe%2Fjm.jpeg?alt=media&token=5dae8dec-7f6e-4446-af79-d87b1fcc7972');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (24,'cafe','젬스톤','이것은 카페인가 수영장인가.. 수영장을 테마로 한 독특한 인테리어! 그렇다고 진짜 수영하면 안됩니다...!','부산 영도구 대교로6번길 33','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/cafe%2Fgemstone.jpeg?alt=media&token=bc57f10c-1776-474a-a894-8f406930f5dc');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (25,'cafe','칠암사계','이흥용 제과 명장님의 빵이 맛있는 카페! 특히 소금빵이 워낙 유명해서 소금빵 먹으려면 지금 당장 뛰어가야해요!','부산광역시 기장군 일광읍 칠암1길 7-10','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/cafe%2Fchilam.jpeg?alt=media&token=708c557b-22b6-4a96-a912-3993d4229fd0');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (26,'cafe','디원카페','천국의 계단이 있는 오션뷰 브런치 카페! 산토리니 느낌을 느끼고 싶다면 추천!','부산광역시 기장군 일광읍 일광로 326','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/cafe%2Fthewin.jpeg?alt=media&token=9353dfaa-6729-4f72-9472-bcda73e21e5e');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (27,'cafe','웨이브온','그저 오션뷰.. 뷰 찐 맛집! 드넓은 바다위에 있는 듯한 느낌의 감성카페','부산광역시 기장군 장안읍 해맞이로 286','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/cafe%2Fwaveon.jpeg?alt=media&token=e4049925-56da-498c-9619-06e294341ebd');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (28,'cafe','에테르','푸른 영도앞바다를 볼 수 있는 루프탑 카페! 흰여울 문화마을의 정취를 느껴보자','부산광역시 영도구 절영로 234','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/cafe%2Feter.jpeg?alt=media&token=19c38115-d59e-461b-b2a3-57c066d1259c');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (29,'market','부평깡통시장','오랜 전통을 지니고 있는 시장으로 사거리시장이란 이름으로 시작했다. 국내 첫 상설 야시장이 있어 맛있는 다문화 길거리 음식을 맛볼 수 있다.','부산광역시 중구 부평1길 48','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/market%2Fbupyeong.jpeg?alt=media&token=d0937b73-e801-4f5d-b1df-06604b59c655');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (30,'market','부산 자갈치시장','오이소, 보이소, 사이소! 부산을 대표하는 국내 최대의 수산시장. 아쿠아리움보다 더 많고 신기한 생선을 볼 수 있다. 망개떡, 돼지국밥 등 맛있는 먹거리도 다양하다.','부산 중구 자갈치해안로 52','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/market%2Fjagalchi.jpeg?alt=media&token=22e41cf1-c665-48ee-9298-5df1e01f4019');
INSERT INTO TourLists (`tl_id`,`category`,`name`,`description`,`location`,`image`) VALUES (31,'market','국제시장','동명의 천만관객 영화 \'국제시장\'의 배경지. 1945년 광복이 되자 일본인들이 철수하면서 전시 물자를 팔아 돈을 챙기기위해 국제시장 자리를 장터로 삼으면서 시장이 형성되었다.','부산광역시 중구 신창동4가','https://firebasestorage.googleapis.com/v0/b/romantrip-f6c4d.appspot.com/o/market%2Fgukje.jpeg?alt=media&token=9e17ad48-30d6-46e6-9b04-6d8aa3321a78');

