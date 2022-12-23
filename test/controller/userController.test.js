const userController = require("../../controllers/userController");

jest.mock('../../services/userService');
const userService = require('../../services/userService');

describe('getLogin', ()=>{
    const res = {
        render: jest.fn(),
        status: jest.fn(()=>res),
        send: jest.fn(),
    }

    test("세션이 없을 경우 상태코드 200 로그인 페이지 렌더링",()=>{
        //given
        const req = {
            session : {
                _id : undefined
            }
        }
        //when
        userController.getLogin(req, res);
        //then
        expect(res.status).toBeCalledWith(200);
    });

    test("세션이 있는 경우(로그인한 상태) 상태코드 409",()=>{
        //given
        const req = {
            session : {
                _id : 1
            }
        }
        //when
        userController.getLogin(req, res);
        //then
        expect(res.status).toBeCalledWith(409);
    });
})

describe('postLogout',()=>{
    const res = {
        sendStatus: jest.fn()
    }
    
    test('카카오 세션 없음 + 세션 파괴 실패',()=>{
        const req = {
            session : {
                _kakao: undefined,
                destroy : jest.fn((callback)=>{
                    const err = new Error("testing error");
                    return callback(err);
                })
            }
        }
        userController.postLogout(req, res);
        expect(res.sendStatus).toBeCalledWith(500);
    })

    test('카카오 세션 없음 + 세션 파괴 성공',()=>{
        const req = {
            session : {
                _kakao: undefined,
                destroy : jest.fn((callback)=>{
                    return callback();
                })
            }
        }
        userController.postLogout(req, res);
        expect(res.sendStatus).toBeCalledWith(201);
    })
})

describe('postRegister',()=>{
    const res = {
        sendStatus: jest.fn(()=>res),
        send: jest.fn(),
        redirect: jest.fn()
    }

    test('회원가입 성공 시 상태코드 201',async ()=>{  
        //given
        const req=  {
            body : {
                id: "spaker",
                pw: "123123123a",
                name: "nimoh",
                email: "email@mail.com",
            }
        }
        //when
        await userController.postRegister(req,res);
        //then
        expect(res.sendStatus).toBeCalledWith(201);
    })

    test('회원가입 정보 누락 시 상태코드 400',async ()=>{  
        //given
        const req=  {
            body : {
                id: "spaker",
                pw: "123123123a",
                name: "nimoh",
                // email key 제거함
            }
        }
        //when
        await userController.postRegister(req,res);
        //then
        expect(res.sendStatus).toBeCalledWith(400);
    })

    test('회원가입 서비스 실패 시 상태코드 500',async ()=>{  
        //given
        const req=  {
            body : {
                id: "spaker",
                pw: "123123123a",
                name: "nimoh",
                email: "email@mail.com"
            }
        }
        userService.register.mockReturnValue(Promise.reject("테스트 에러"));
        //when
        await userController.postRegister(req,res);
        //then
        expect(res.sendStatus).toBeCalledWith(500);
    });
})