const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const bcrypt = require('bcrypt');


class Users extends Model {
    
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}


Users.init(
  { 
    id: {        
        type: DataTypes.INTEGER,        
        allowNull: false,       
        primaryKey: true,        
        autoIncrement: true
        },        
    username: {       
        type: DataTypes.STRING,        
        allowNull: false,
        validate: {
          notEmpty: true,
        }
        },       
    email: {      
        type: DataTypes.STRING,        
        allowNull: false,        
        unique: true,        
        validate: {            
            isEmail: true
            }
        },        
    password: {        
        type: DataTypes.STRING,        
        allowNull: false,
        validate: {
            len: [4]
            }
        }
  },
  {    
    hooks: {        
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
    },
    
    sequelize,   
    timestamps: false,    
    freezeTableName: true,    
    underscored: true,    
    modelName: 'user'
  }
);

module.exports = Users;