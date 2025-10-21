const express = require('express');
const app = express();
const morgan = require('morgan');
const { default: helmet} = require('helmet');
const compression = require('compression');

//init middlewares

//morgan để đọc logs.
app.use(morgan("dev")); //Phù hợp với môi trường dev.
// app.use(morgan("combined")) //Phù hợp với product.
// app.use(morgan("common"))
// app.use(morgan("short"))
// app.use(morgan("tiny"))

//helmet để bảo vệ header cho ứng dụng express.
app.use(helmet()); 
//compress dùng để nén dữ liệu trả về cho client.
app.use(compression());

//init db
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
checkOverload();

//init routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: "Welcome"
    });
});

//handling error

module.exports = app;

