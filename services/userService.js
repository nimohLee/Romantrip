const { User } = require("../database/models/index");
const bcryptService = require("../services/bcryptService");
module.exports = {
    register: async (params) => {
        const encodedPw = bcryptService.hashingPassword(params.pw);
        try {
            await User.create({
                name: params.name,
                id: params.id,
                pw: encodedPw,
                email: params.email,
                regDate: new Date(),
            });
        } catch (err) {
            throw err;
        }
    },
    validator: (params) => {
        return new Promise(async (resolve, reject) => {
            const result = await User.findAll({
                where: {
                    id: params.id,
                },
                raw: true,
            });
            if (result[0]) {
                resolve("No");
            } else resolve("Yes");
        });
    },
    validation: (info) => {
        return new Promise(async (resolve, reject) => {
            try {
                const selectUser = await User.findOne({
                    where: {
                        id: info.id,
                    },
                    raw: true,
                });
                const pwCompareResult = bcryptService.comparePassword(
                    selectUser.pw,
                    info.pw
                );
                if (selectUser && pwCompareResult) {
                    resolve(selectUser);
                } else reject("fail");
            } catch (err) {
                reject("fail");
            }
        });
    },
};
