module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "TourCart", // 테이블 명
        {
            tc_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                comment: "tourCart idx",
            },
            m_id: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: "member idx"
            },
            tl_id: {
                type: DataTypes.INTEGER,
                comment: "tourList idx",
            }
        },
        {
            timestamps: false,
        }
    );
};
