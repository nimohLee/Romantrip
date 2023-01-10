const bcrypt = require("bcrypt");

module.exports = {
    hashingPassword: (password) => {
        return bcrypt.hashSync(password, 10);
    },
    comparePassword: (encryptedPassword, password) => {
        return bcrypt.compareSync(password, encryptedPassword);
    },
};
