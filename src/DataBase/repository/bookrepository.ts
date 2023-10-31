import BookModel from "../models/bookSchema";

export const retrieveBooksList_DB = async (pageNumber: number) => {
  try {
    const itemsPerPage = 5;
    const skipCount = (pageNumber - 1) * itemsPerPage;
    const bookList = await BookModel.find().skip(skipCount).limit(itemsPerPage).exec();
    return bookList;
  } catch (error) {
    throw error;
  }
};

export const retrieveSpecificBooks_DB = async (booksId: string) => {
  try {
    const book = await BookModel.findById(booksId).exec();
    return book;
  } catch (error) {
    throw error;
  }
};

export const creatNewBooks_DB = async (title: string, author: string, summary: string) => {
  try {
    const newBook = new BookModel({ title, author, summary });
    const savedBook = await newBook.save();
    return savedBook;
  } catch (error) {
    throw error;
  }
};

export const updatebooksWithID_DB = async (bookId: string, title: string, author: string, summary: string) => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(bookId, { title, author, summary }, { new: true }).exec();
    return updatedBook;
  } catch (error) {
    throw error;
  }
};

export const deleteBooksWithID_DB = async (booksId: string) => {
  try {
    const deletedBook = await BookModel.findByIdAndDelete(booksId).exec();
    return deletedBook;
  } catch (error) {
    throw error;
  }
};
