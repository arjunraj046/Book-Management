import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  summary: string;
  createdAt: Date;
}

const bookSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

const BookModel = mongoose.model<IBook>("Book", bookSchema);

export default BookModel;
