module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "User", // 테이블 명
        {
            m_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                comment: "idx",
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "사용자 이름",
            },
            id: {
                type: DataTypes.STRING,
                comment: "사용자 아이디"
            },
            pw : {
                type: DataTypes.STRING,
                comment: "사용자 비밀번호"
            },
            email: {
                type: DataTypes.STRING,
                comment: "사용자 이메일",
            },
            sns_id: {
                type: DataTypes.STRING,
                comment : "SNS id"    
            },
            provider: {
                type: DataTypes.STRING,
                comment : "SNS 제공자"
            },
            regDate : {
                type : DataTypes.DATE,
                comment: "가입일"
            }
        },
        {
            timestamps: false,
        }
    );
};
