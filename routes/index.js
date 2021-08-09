var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
/* GET home page. */
router.get('/', async function(req, res, next) {
  // //res.render('index', { title: 'Express' });
  // const books = await Book.findAll();
  // console.log(books);
  // res.json(books); 
    res.render('index');

});
router.get('/books', async function(req, res, next) {

    res.render('form-error');

});
router.get('/books/new', async function(req, res, next) {

  res.render('new-book');

});
router.post('/books/new', async function(req, res, next) {

  res.render('layout');

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
