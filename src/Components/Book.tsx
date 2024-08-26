import { useState } from "react";
import "./Book.css";
import Button from "./Button";

//To define the structutre of a book object
interface BookInterface {
  title: string;
  author: string;
  isbn: number;
  genres?: Array<string>;
  rating: number;
  cover?: string;
}
//
function Book({
  book, // Prop from App.tsx. The specific book to edit
  updateBook,
  removeBook, // Prop for App.tsx. Function for finding the specific book to edit
}: {
  book: BookInterface;
  updateBook: (updatedBook: BookInterface) => void;
  removeBook: (isbn: number) => void;
}) {
  //State to manage whether the book is in edit mode or not
  const [edit, setEdit] = useState<boolean>(false);
  // State variables for editing the book details
  const [title, setTitle] = useState<string>(book.title);
  const [author, setAuthor] = useState<string>(book.author);
  const [isbn] = useState<number>(book.isbn);
  const [rating, setRating] = useState<number>(book.rating);
  //Generate star icons based on the rating
  let stars = [];
  for (let i = 0; i < book.rating; i++) {
    stars.push(<span key={i}>⭐</span>);
  }
  //Function to handle the edit of the book data
  const handleEdit = () => {
    const updatedBook: BookInterface = {
      title: title,
      author: author,
      isbn: isbn,
      genres: book.genres,
      rating: rating,
      cover: book.cover,
    };
    //Function to display the edited book
    updateBook(updatedBook);
    //Exit the edit mode after updating
    setEdit(false);
  };

  return (
    <article className="book-container">
      {edit ? (
        // If edit is true show :
        <>
          <section className="book-info">
            <figure style={{ backgroundImage: `url(${book.cover})` }}></figure>
            <input
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)} // Setting the new title value in the edit mode on the book
              id="newTitle"
            />
            <input
              defaultValue={author}
              onChange={(e) => setAuthor(e.target.value)} // Setting the new author value in the edit mode on the book
              id="newAuthor"
            />
            <p>{book.isbn}</p>
            <p>
              Genres: {book.genres ? book.genres.join(", ") : "Not defined"}{" "}
              {/*Showing genres if they're defined otherwise showing not defined  */}
            </p>
            <input
              max="5"
              min="1"
              type="number"
              defaultValue={rating}
              onChange={(e) => setRating(parseInt(e.target.value))} // Setting the new rating value in the edit mode on the book
              id="newRating"
            />
          </section>
          <Button onClick={() => removeBook(book.isbn)} label="Remove" />
          {/* Removes book */}
          <Button onClick={handleEdit} label="Confirm" />
          {/* Confirms changes */}
        </>
      ) : (
        //If edit is false show:
        <>
          <section className="book-info">
            <figure style={{ backgroundImage: `url(${book.cover})` }}></figure>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.isbn}</p>
            <p>
              Genres: {book.genres ? book.genres.join(", ") : "Not defined"}
            </p>
            <p>{stars}</p>
          </section>
          <Button
            label="Edit"
            onClick={() => {
              setEdit(true); //Set the edit mode to true
            }}
          />
        </>
      )}
    </article>
  );
}
export default Book;
