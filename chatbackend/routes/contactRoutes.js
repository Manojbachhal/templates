const express = require('express');
const Router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { addContact,getContact }= require('../controllers/contactController')


// create contact
Router.post('/',protect,addContact);
Router.get('/',protect,getContact);

module.exports=Router;