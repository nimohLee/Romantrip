# Romantrip
부산에서 가고 싶은 식당, 카페, 놀거리 등을 개인 바구니에 저장시킬 수 있는 사이트

## 팀 구성
1인

## 기술스택 
- HTML ( EJS 템플릿엔진 ), CSS, JavaScript
- Node.js

## 데이터 베이스

### ERD
<img width="406" alt="image" src="https://user-images.githubusercontent.com/106662308/211467180-16e68b8b-b67c-443d-a50a-0233ba65c7ff.png">

연관관계를 코드로 구현하여 MySQL 상 연관관계는 지정해주지 않았습니다.

### 테이블 명세서

***Users 테이블***

|테이블명|필드명|데이터타입|필드설명|
|---|---|---|---|
|Users|m_id|int|유저 테이블 기본키|
||name|varchar|유저 이름|
||id|varchar|유저 로그인 ID|
||pw|varchar|유저 패스워드|
||email|varchar|유저 이메일|
||regDate|datetime|유저 가입 날짜 및 시간|


***Boards 테이블***

|테이블명|필드명|데이터타입|필드설명|
|---|---|---|---|
|Boards|b_id|int|게시판 테이블 기본키|
||m_id|int|게시글 작성자 (유저 id)|
||m_name|varchar|작성자 이름|
||title|varchar|게시글 제목|
||content|varchar|게시글 내용|
||regDate|datetime|게시글 작성 날짜 및 시간|
||views|int|게시글 조회 수|
||createdAt|datetime|게시글 레코드 생성 시간|
||updatedAt|datetime|게시글 레코드 수정 시간|

***TourLists 테이블***

|테이블명|필드명|데이터타입|필드설명|
|---|---|---|---|
|TourLists|tl_id|int|여행목록 테이블 기본키|
||category|varchar|여행 분류|
||name|varchar|여행 이름|
||description|varchar|여행 설명|
||location|varchar|여행 주소|
||image|varchar|여행 이미지|

***ToursCarts 테이블***

|테이블명|필드명|데이터타입|필드설명|
|---|---|---|---|
|TourCarts|tc_id|int|여행바구니 테이블 기본키|
||m_id|int|바구니 유저 id|
||tl_id|int|담은 여행 id|
||price|varchar|총 여행 가격|



## 실행 화면
### 홈 화면
<img width="800" alt="image" src="https://user-images.githubusercontent.com/106662308/211467348-9cdcd6fe-286b-43d3-8347-14f98e0f1d80.png">
