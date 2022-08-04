require("dotenv").config;
import {DataTypes} from "@sequelize/core"
import sequelize from "../config/database.config"

const User : any = sequelize.define('users',{
    fullname: {type:DataTypes.STRING,allowNull:false},
    email: {
        type:DataTypes.STRING,
        allowNull:false, 
        unique:true,
    },
    password: {type:DataTypes.STRING,allowNull:false},
},{
    timestamps:true
});


export default User;