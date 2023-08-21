import { useEffect, useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/booklist";
import axios from "axios";
function App() {
  const [books, setBooks] = useState([]);
  const fetchbooks = async ()=>{
    const response = await axios.get("http://localhost:3001/books")
    setBooks(response.data);

  }
  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });
    const updateBooks = [...books, response.data];
    setBooks(updateBooks);
  };

  const editBookById = async(id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title:newTitle,
    });
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...books,...response.data};
      }
      return books;
    }); 
    setBooks(updatedBooks);
  };

  const deleteBookbyID = async(id) => {
    await axios.put(`http://localhost:3001/books/${id}`)
    const updateBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updateBooks);
  };

  useEffect(()=>{
    fetchbooks();
  },[])
  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList onEdit={editBookById} books={books} onDelete={deleteBookbyID} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
