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
            category : {
                type: DataTypes.STRING,
                allowNull: false,
                comment : "tour category"
            }
            ,
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
            location :{
                type: DataTypes.STRING,
                allowNull : false,
                comment : "tour location"
            },
            image: {
                type: DataTypes.STRING,
                comment: "사진 주소"
            }
         
        },
        {
            timestamps: false,
        }
    );
};
