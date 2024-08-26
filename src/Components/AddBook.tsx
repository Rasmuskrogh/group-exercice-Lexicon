import { useState } from "react";
import "./AddBook.css";
import Button from "./Button";

//To define the structure of a book object
interface BookInterface {
  title: string;
  author: string;
  isbn: number;
  genres?: Array<string>;
  rating: number;
  cover?: string;
}
export default function AddBook({
  addBookFunction, // Props from App.tsx. Importing the addBookToBookList function
  toggleAddView, // Props from App.tsx. Importing the function for the add book interface
}: {
  addBookFunction: (bookToAdd: BookInterface) => void;
  toggleAddView: () => void;
}) {
  //State for variables for adding a new book
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isbn, setIsbn] = useState<number>(0);
  const [genres, setGenres] = useState<string[]>([]);
  const [genreToAdd, setGenreToAdd] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [cover, setCover] = useState<string>("");
  //Function to create a new book object
  const addBook = () => {
    let newBook = {
      title: title,
      author: author,
      isbn: isbn,
      genres: genres,
      rating: rating,
      cover: cover,
    };
    //Pass the new book to the App.tsx to be displayed on the DOM
    addBookFunction(newBook);
  };
  return (
    <article className="addBook-container">
      <h3>ADD NEW BOOK</h3>
      <form className="addBook-form">
        <label className="cover-field">
          Cover:
          <input
            placeholder="Cover"
            onChange={(e) => setCover(e.target.value)} // Setting the new cover value in the add mode on the  new book
            id="cover"
          />
        </label>
        <label className="author-field">
          Author:
          <input
            required
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)} // Setting the new author value in the add mode on the  new book
            id="author"
          />
        </label>
        <label className="title-field">
          Title:
          <input
            required
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)} // Setting the new title value in the add mode on the  new book
            id="title"
          />
        </label>
        {genres.length > 0 ? (
          <ul className="genres">
            {genres.map((genre, i) => (
              <li key={i}>{genre}</li>
            ))}
          </ul>
        ) : null}
        <section className="genre-field">
          <label>
            Genres:
            <input
              placeholder="Genre"
              onChange={(e) => setGenreToAdd(e.target.value)} // Setting the new genre value in the add mode on the  new book
              id="genre"
            />
          </label>
          <Button
            label="Add"
            className="add"
            onClick={() => setGenres([...genres, genreToAdd])} // Adding an additional genre
          />
        </section>
        <label className="isbn-field">
          ISBN:
          <input
            required
            placeholder="00000000"
            onChange={(e) => setIsbn(parseInt(e.target.value))} // Setting the new isbn value in the add mode on the new book
            id="isbn"
          />
        </label>
        <label className="rating-field">
          Rating:
          <input
            required
            max="5"
            min="1"
            type="number"
            defaultValue={rating}
            onChange={(e) => setRating(parseInt(e.target.value))} // Setting the new rating value in the add mode on the  new book
            id="rating"
          />
        </label>
        <section className="buttons-field">
          <Button className="cancel" onClick={toggleAddView} label="Cancel" />
          {/* Exits the add new book interface window */}
          <Button className="add" onClick={addBook} label="Add" />
          {/* Addes the new book to the Book list */}
        </section>
      </form>
    </article>
  );
}
