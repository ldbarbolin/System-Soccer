const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require('mysql')
require('dotenv').config();

module.exports = (app) => {
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "presentacion/views"));
  app.use(express.static(path.join(__dirname, "presentacion/static")));
  app.use(bodyParser.urlencoded({ extended: true}));
  app.use(express.json());
  app.use(cookieParser());
};

/*module.exports ={
    mysql:{
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'david',
        password: process.env.MYSQL_PASSWORD || '9780946',
        database: process.env.MYSQL_DB || 'futbol_sis'
    }   
}*/
