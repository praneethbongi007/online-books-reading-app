import React from 'react'
import BookShow from './BookShow'
import { useContext } from 'react'
import BooksContext from '../context/books'
function BookList({books,onDelete,onEdit}) {
  const value  = useContext(BooksContext)
  const renderbooks = books.map((book)=>{
    return <BookShow onEdit={onEdit} onDelete={onDelete} key={book.id} book={book}/>
  })  
  return (
    <div className='book-list'>
      {value}
      {renderbooks}
      </div>
  )
}

export default BookList