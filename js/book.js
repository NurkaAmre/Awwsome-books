// BOOK CLASS represents book
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

// UI CLASS handle UI tasks
class UI {
    static displayBooks() {

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book)); 
}

static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');
     row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td><button class="delete">Delete</button></td>
     <hr>
     `;

     list.appendChild(row);
  }
  
  static deleteBook(el) {
    if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
  }
}
static clearField() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
}
}

// STORE CLASS: Handles storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(index) {
        const books = Store.getBooks();

        books.forEach((book, i) => {
        if (i === index) {
            books.splice(index, 1);
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
}
}
// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;

    // Instatiate book
    const book = new Book(title, author);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Clear fields
    UI.clearField();
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        console.log("I want sex")
        const index = [...document.querySelectorAll('.delete')].indexOf(e.target);
        console.log(index)
        Store.removeBook(index);
        UI.deleteBook(e.target);
    }
});
