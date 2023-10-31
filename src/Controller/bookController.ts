import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { creatNewBooks_DB, deleteBooksWithID_DB, retrieveSpecificBooks_DB, retrieveBooksList_DB, updatebooksWithID_DB } from "../DataBase/repository/bookrepository";

//  Retrieve a list of all books.
export const retrieveBooksList = asyncHandler(async (req: Request, res: Response) => {
  try {
    const pageNumber: number = Number(req.params.page);
    const bookList = await retrieveBooksList_DB(pageNumber);
    if (bookList.length === 0) {
      res.status(404).json({ message: "No tasks found for this page" });
    } else {
      res.status(200).json(bookList);
    }
    res.status(200).json(bookList);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    } else {
      res.status(500).json({ error: "Internal Server Error: An error occurred while deleting the Book" });
    }
  }
});

//  Retrieve a specific book by its ID
export const retrieveSpecificBooks = asyncHandler(async (req: Request, res: Response) => {
  try {
    const booksId: string = req.params.id;
    if (!booksId) {
      res.status(400).json({ error: "Invalid Book ID" });
      return;
    }
    const books = await retrieveSpecificBooks_DB(booksId);
    if (!books) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(books);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    } else {
      res.status(500).json({ error: "Internal Server Error: An error occurred while deleting the Book" });
    }
  }
});

//  Create a new book
export const creatNewBooks = asyncHandler(async (req: Request, res: Response) => {
  console.log("creatNewBooks");
  try {
    const { title, author, summary } = req.body;
    if (!title || !author || !summary) {
      res.status(400).json({ error: "Please check data again" });
    } else {
      const newBooks = await creatNewBooks_DB(title, author, summary);
      if (newBooks) {
        res.status(201).json(newBooks);
      } else {
        res.status(500).json({ error: "Internal Server Error: Failed to create the Books" });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    } else {
      res.status(500).json({ error: "Internal Server Error: An error occurred while deleting the Book" });
    }
  }
});

//  Update a book by its ID
export const updateBooksWithID = asyncHandler(async (req: Request, res: Response) => {
  try {
    const bookId: string = req.params.id;
    if (!bookId) {
      res.status(400).json({ error: "Invalid Book ID" });
      return;
    }
    const { title, author, summary } = req.body;
    const updatedBooks = await updatebooksWithID_DB(bookId, title, author, summary);
    if (!updatedBooks) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(updatedBooks);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    } else {
      res.status(500).json({ error: "Internal Server Error: An error occurred while deleting the Book" });
    }
  }
});

// Delete a book by its ID
export const deleteBooksWithID = asyncHandler(async (req: Request, res: Response) => {
  try {
    const booksId: string = req.params.id;
    if (!booksId) {
      res.status(400).json({ error: "Invalid Book ID" });
      return;
    }
    const deletedBooks = await deleteBooksWithID_DB(booksId);
    if (!deletedBooks) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json({ message: "Book deleted successfully" });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);

      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    } else {
      res.status(500).json({ error: "Internal Server Error: An error occurred while deleting the Book" });
    }
  }
});
