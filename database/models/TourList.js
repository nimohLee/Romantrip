module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "TourList", // 테이블 명
        {
            tl_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                comment: "board idx",
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "tour 이름"
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "tour 설명",
            },
            image: {
                type: DataTypes.STRING,
                comment: "사진 주소"
            },
            price : {
                type : DataTypes.STRING,
                comment: "가격"
            }
        },
        {
            timestamps: false,
        }
    );
};
