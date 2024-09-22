const QuizExams  = (db, DataTypes) => {
    return db.define(
        "QuizExams",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            images_id: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            question_ids: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: false,
            },
            timer_per_question: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 30
            },
            author: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    isEmail: true,
                    isLowercase: true,
                },
            }
        },
        {
            freezeTableName: true,
            timestamps: true,
        }
    );
};

module.exports = QuizExams;
