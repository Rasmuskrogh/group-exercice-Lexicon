import { useState } from "react";
import "./App.css";
import Book from "./Components/Book";
import AddBook from "./Components/AddBook";

//To define the structutre of a book object
interface BookInterface {
  title: string;
  author: string;
  isbn: number;
  genres?: Array<string>;
  rating: number;
  cover?: string;
}

function App() {
  // A state for showing the the interface for adding a new book
  const [showAddBook, setshowAddBook] = useState<boolean>(false);
  // A state for managing and displaying the list of books
  const [bookList, setBookList] = useState<BookInterface[]>([
    {
      title: "Ulysses",
      author: "James Joyce",
      isbn: 9872345,
      rating: 4,
      cover:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/JoyceUlysses2.jpg/440px-JoyceUlysses2.jpg",
    },
    {
      title: "The World of Robert Jordan's The Wheel of Time",
      author: "Robert Jordan & Teresa Patterson",
      isbn: 9872995,
      genres: ["Fact"],
      rating: 3,
      cover:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.3lw6kI6NA_0C8YvSNS7MdgHaJb%26pid%3DApi&f=1&ipt=d33259435c45a6f9c52a769200997105f5f5ca82007743421924a9b292b5f696&ipo=images",
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      isbn: 8982995,
      genres: ["Science Fiction", "Drama"],
      rating: 5,
      cover:
        "https://upload.wikimedia.org/wikipedia/en/d/de/Dune-Frank_Herbert_%281965%29_First_edition.jpg",
    },
    {
      title: "The Wheel of Time Companion",
      author: "Robert Jordan, Harriet McDougal, Alan Romanczuk, Maria Simons",
      isbn: 9781250256409,
      genres: ["Reference", "Fantasy"],
      rating: 4,
      cover:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KPRM86IcPfB9SE9x05FbkAHaLQ%26pid%3DApi%26h%3D160&f=1&ipt=6dd9ba7458cb891b43949f140d8943b8fb014d8421afbf7d8bfccd0222d1801d&ipo=images",
    },
    {
      title:
        "The World of Ice & Fire: The Untold History of Westeros and the Game of Thrones",
      author: "George R.R. Martin, Elio M. García Jr., Linda Antonsson",
      isbn: 9780553805444,
      genres: ["Fantasy", "History"],
      rating: 4,
      cover: "https://duckduckgo.com/i/6425e8ba.jpg",
    },
    {
      title: "The Two Towers",
      author: "J.R.R Tolkien",
      isbn: 395082552,
      genres: ["Fantasy", "Adventure"],
      rating: 5,
      cover:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.HV23MbbmLX7axXM9VXnKGQAAAA%26pid%3DApi%26h%3D160&f=1&ipt=191df0158ce75e8d73fb81c34077cb82f50263fc019163a4f4234a89b2df8c63&ipo=images",
    },
  ]);

  //A function for updating the books in the booklist
  function updateBookList(updatedBook: BookInterface) {
    //Finding the targeted books index
    let index = bookList.findIndex((book) => book.isbn === updatedBook.isbn);
    // creates a copy of the current book list with the spread operator

    let updatedBookList = [...bookList];
    //Takes the specific index and replaces it with the new information
    updatedBookList.splice(index, 1, updatedBook);
    //Setting the new list with the new book list
    setBookList(updatedBookList);
  }

  //A function for adding additional books to the book list
  function addBookToBookList(bookToAdd: BookInterface) {
    setBookList([...bookList, bookToAdd]); //Adding a new book to the book list by using the spread operator on the kookList and adding a new book.
    setshowAddBook(false); //Setting the showAddBook to false removing the add book interface
  }

  return (
    <>
      <header>
        <h1>My book collection</h1>
        <button
          className="round-add-btn"
          onClick={() => {
            setshowAddBook(true); // setting the showAddBook to true, showing the add book interface
          }}
        >
          +
        </button>
      </header>

      <main>
        <section className="bookList-container">
          {bookList.map(
            //Mapping throuh the list of books adding them to the DOM.
            (book, i) => (
              <Book key={i} book={book} updateBook={updateBookList} /> //Passing the book property and the updateBookList function to the Book component
            )
          )}
        </section>
      </main>
      {showAddBook ? ( //If showAdBook is true, open the addBook interface and set showAddBook to true
        <AddBook
          addBookFunction={addBookToBookList} // Passing the AddBookToBookList to the AddBook component
          toggleAddView={() => {
            // Passing the setShowBook state property to the AddBook component
            setshowAddBook(false);
          }}
        />
      ) : null}
    </>
  );
}
export default App;
