var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
/* GET home page. */
router.get('/', async function(req, res, next) {

    res.redirect('/books');

});
router.get('/books', async function(req, res, next) {
  const books= await Book.findAll();
  res.render('index',{books});

});
router.get('/books/new', async function(req, res, next) {

  res.render('new-book');

});
router.post('/books/new', async function(req, res, next) {
  try{
    await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre:req.body.genre,
      year:req.body.year
    })
  }catch(error){
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      res.render('form-error',{errors});
    } else {
      throw error;
    }
  }
 
  
});
router.get('/books/:id', async function(req, res, next) {

   res.render('update-book');

 });
 router.post('/books/:id', async function(req, res, next) {

   res.render('layout');

 });
router.post('/books/:id/delete', async function(req, res, next) {

  res.render('layout');

});


module.exports = router;
