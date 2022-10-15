module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Board", // 테이블 명
        {
            b_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                comment: "board idx"
            },
            m_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: "member idx"
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "글 제목",
            },
            content: {
                type: DataTypes.STRING,
                comment: "글 내용"
            },
            regDate : {
                type : DataTypes.DATE,
                comment: "가입일"
            },
            views : {
                type : DataTypes.INTEGER,
                allowNull: false,
                default : 0,
                comment : "조회수"
            }
        },
        {
            timestamps: true,
        }
    );
};
