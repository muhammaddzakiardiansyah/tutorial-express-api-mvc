const express = require('express');
const router = express.Router();
const validator = require('fastest-validator');
const bcrypt = require('bcrypt');
    
const {User} = require('../models');

const v = new validator;

/* GET users listing. */
router.get('/', async function(req, res) {
  const users = await User.findAll();
  res.status(200).json({message: 'success', data: users});
});

router.get('/sapa', (req, res, next) => {
  res.json({message: 'success', data: 'nama saya dzaki'});
});

router.post('/', async (req, res) => {

   const schema = {
     nama: 'string',
     email: 'string',
     password: 'string'
   }

   const validate = v.validate(req.body, schema);

   if(validate.length) {
    return res.status(500).json({message: 'error', error: validate});
   } else {
     const user = await User.create(req.body)
    return res.status(201).json({message: 'success create new user!', data: user});
   }

});

module.exports = router;
