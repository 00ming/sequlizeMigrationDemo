const { Sequelize,DataTypes } = require('sequelize');
const {sqlite3} = require('sqlite3')
const {join} = require("path");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: join(__dirname, 'sqlite3database.db'),
    dialectModule: sqlite3,
    logging: console.log
});




const User = sequelize.define('User', {
    // 在这里定义模型属性
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull 默认为 true
    }
}, {
    // 这是其他模型参数
});

try {
    sequelize.authenticate().then(()=>{
        console.log('Connection has been established successfully.');

        // User.init({
        //     firstName: {
        //         type: DataTypes.STRING,
        //         allowNull: false
        //     },
        //     lastName: {
        //         type: DataTypes.STRING
        //         // allowNull 默认为 true
        //     }},{
        //     sequelize, // We need to pass the connection instance
        //     modelName: 'User', // We need to choose the model name
        //     tableName:'User',
        //     timestamps: false
        // }).sync({force:true}).then(res=>{
        //     console.log('User',res)
        // })
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize
