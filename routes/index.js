var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
const { Op } = require("sequelize");

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.redirect('/books/page/1');
});

//Show the home page containing all the books
router.get('/books/page/:id', async function(req, res, next) {
  //Retrieve array with all books from the database, then on the template
  //iterate over the array to create a link to every book
  const books= await Book.findAll();
  let numberOfPages=Math.ceil(books.length/10);
  const page=req.params.id;
  res.render('index',{books,numberOfPages,page});
});

//search function using pagination
router.get('/search/page/:id', async function(req, res, next) {
  var query = req.query.search
  const books = await Book.findAll({
    attributes:['id','title','author','genre','year'],
    where:{
      [Op.or]:[{
        title:{
          [Op.like]:`%${query}%`}},
        {
        author:{
          [Op.like]:`%${query}%`}},
        {
        genre:{
          [Op.like]:`%${query}%`}},
        {
        year:{
          [Op.like]:`%${query}%`}}
      ]
      }
  })
  //calculation to find the necessary number of pages
  let numberOfPages=Math.ceil(books.length/10);
  const page=req.params.id;
  res.render('index',{books,numberOfPages,page,query});
});





//Shows the page for the creation of new books
router.get('/books/new', async function(req, res, next) {
  res.render('new-book');
});
router.post('/books/new', async function(req, res, next) {
  try{
    //creates a new book using the data from a form
    await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre:req.body.genre,
      year:req.body.year
    })
    res.redirect('/');
  }catch(error){
    //if the user dont fill the mandatory form fields a message will be shown
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      res.render('form-error',{errors});
    } else {
      throw error;
    }
  }
});

//Will display a page containing the information of the selected book
router.get('/books/:id', async function(req, res, next) {
  const book = await Book.findByPk(req.params.id);
   res.render('update-book',{book});

 });
//Updates the book information using the user's input
router.post('/books/:id', async function(req, res, next) {
  const book = await Book.findByPk(req.params.id);
  try{
    await book.update(req.body);
    res.redirect('/');
  //When the user tries to update a book he must fill the mandatory fields otherwise
  //a error message will be shown
  }catch(error){
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      const oldBook= await Book.findByPk(req.params.id);
      const bookValues =oldBook.dataValues;
      res.render('form-error',{errors,bookValues});
    } else {
      throw error;
    }
  }
 });

 //Deletes a book from the database
router.post('/books/:id/delete', async function(req, res, next) {
  const book = await Book.findByPk(req.params.id);
  await book.destroy();
  res.redirect('/');
});


module.exports = router;
