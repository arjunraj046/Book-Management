import express from "express";
import { creatNewBooks, retrieveBooksList, retrieveSpecificBooks, updateBooksWithID, deleteBooksWithID } from "../Controller/bookController";

const BookRoute = () => {
  const bookRouter = express.Router();

  bookRouter.get("/books/:page", retrieveBooksList);
  bookRouter.get("/book/:id", retrieveSpecificBooks);
  bookRouter.post("/book", creatNewBooks);
  bookRouter.put("/book/:id", updateBooksWithID);
  bookRouter.delete("/book/:id", deleteBooksWithID);

  return bookRouter;
};
export default BookRoute;
