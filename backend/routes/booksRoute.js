import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for saving a New Book

router.post("/", async (req, res) => {
    try {
      if (
        !req.body.title ||
        !req.body.author ||
        !req.body.publishYear
      ) {
        return res.status(400).send({
          message: "Please provide all the required fields",
        });
      }
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear
      };
  
      const book = await Book.create(newBook);
  
      return res.status(201).send(book)
    } catch (err) {
      console.log(err.message);
      res.status(500).send({message: err.message});
    }
  });
  
  // Route to get all the books
  
  router.get("/", async (req, res) => {
    try {
      const books = await Book.find();
      return res.status(200).json({
        count: books.length,
        data: books
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({message: err.message});
    }
  });
  
  // Route to get a single book
  
  router.get("/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const book = await Book.findById(id);
      return res.status(200).json(book);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({message: err.message});
    }
  });
  
  // Route to update a book
  
  router.put("/:id", async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).send({
          message: "Book not found",
        });
      }
      const updatedBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const updatedBookData = await Book.findByIdAndUpdate(req.params.id, updatedBook, {
        new: true,
      });
      return res.status(200).send(updatedBookData);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({message: err.message});
    }
  });
  
  // Route to delete a book
  
  router.delete("/:id", async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).send({
          message: "Book not found",
        });
      }
      const deletedBook = await Book.findByIdAndDelete(req.params.id);
      return res.status(200).send(deletedBook);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({message: err.message});
    }
  });

export default router;