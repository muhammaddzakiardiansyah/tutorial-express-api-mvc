const express = require('express');
const router = express.Router();
const validator = require('fastest-validator');

const {Product} = require('../models');

const v = new validator();

router.get('/', async (req, res) => {
    const product = await Product.findAll();
    console.log(product);

    res.status(200).json({message: 'berhasil menampilkan data', data: product });
});

router.get('/:id', async (req, res) => {
   const {id} = req.params;
   const product = await Product.findByPk(id);

   if(!product) {
    return res.status(500).json({message: 'gagal menemukan data'});
   } else {
    return res.status(200).json({message: 'berhasil menemukan data', data: product});
   }
});

router.post('/', async (req, res) => {
   const schema = {
    nama_prodak: 'string',
    jenis: 'string',
    deskripsi: 'string|optional'
   }

   const validate = v.validate(req.body, schema);

   if(validate.length) {
     return res.status(500).json({message: 'gagal menambahkan data', error: validate});
   } else {
     const product = await Product.create(req.body);
     return res.status(201).json({message: 'berhasil tambah data', data: product});
   }
});

router.put('/:id', async (req, res) => {
  const {id} = req.params;
  let product = await Product.findByPk(id);

  if(!product) {
     return res.status(500).json({message: 'data belum pernah dibuat!'});
  } else {

    const schema = {
      nama_prodak: 'string|optional',
      jenis: 'string|optional',
      deskripsi: 'string|optional'
     }
  
     const validate = v.validate(req.body, schema);
  
     if(validate.length) {
       return res.status(500).json({message: 'gagal menambahkan data', error: validate});
     } else {
       product = await product.update(req.body)
       return res.status(201).json({message: 'berhasil tambah data', data: product});
     }
  }
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const product = await Product.findByPk(id);

   if(!product) {
    return res.status(500).json({message: 'gagal menemukan data'});
   } else {
    await product.destroy();
    return res.status(200).json({message: 'berhasil menghapus data'});
   }
});

module.exports = router;