/*  COMP229-013 F2021
    Midterm
    File Name:      routes/books.js
    Author's Name:  Marcus Ngooi
    Student #:      301147411
    Web App Name:   Midterm Project - the Favourite Book List App
 */

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let book = require("../models/books");

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // Find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

  res.render("books/details", {
    title: "Add Book",
    books: "",
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newBook = book({
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  // Create new book and add it to the books collection
  book.create(newBook, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the favourite books list
      res.redirect("/books");
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  // Find book in books collection using id
  book.findById(id, (err, bookToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // show the details view
      res.render("books/details", {
        title: "Edit Book",
        books: bookToEdit,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  let editedBook = book({
    _id: id,
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  // Update book in books collection identified by _id
  book.updateOne({ _id: id }, editedBook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/books");
    }
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  // Remove book from books collection based on _id
  book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/books");
    }
  });
});

module.exports = router;
