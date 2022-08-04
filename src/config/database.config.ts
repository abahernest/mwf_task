require("dotenv").config();
import {Sequelize} from "@sequelize/core";

const {NODE_ENV} = process.env;
let DB_NAME: string;
if (NODE_ENV === "test"){
    DB_NAME = process.env.TEST_DB_NAME;
}else if (NODE_ENV == "production"){
    DB_NAME = process.env.PROD_DB_NAME;
}else{
    DB_NAME = process.env.DEV_DB_NAME;
}

const sequelize = new Sequelize(DB_NAME||"mwf_task", 'postgres', 'postgres', {
    dialect:'postgres',
    host: process.env.DB_HOST || 'localhost',
    logging:false,
}
);

export default sequelize; 


