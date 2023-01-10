class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // Create TR element
    const row = document.createElement("tr");
    // Insert Cols
    row.innerHTML = `
        <td class="border-bottom">${book.title}</td>
        <td class="border-bottom">${book.author}</td>
        <td class="border-bottom">${book.isbn}</td>
        <td class="border-bottom"><a href = "#" class = "delete">X</a></td>
 `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    // create DIv
    const div = document.createElement("div");
    // Add className
    div.className = `alert ${className}`;
    //add Text
    div.appendChild(document.createTextNode(message));
    //GEt parent
    const container = document.querySelector(".container");
    // Get Form
    const form = document.querySelector("#book-form");
    // Insert Alert
    container.insertBefore(div, form);
    //Time out after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local Storage Class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books;
    }

    static dispalyBooks(){
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;
            // Add Book to list
            ui.addBookToList(book);
        });
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book)

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach(function (book ,index){
            if(book.isbn === isbn){
                books.splice(index,1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load Event 
document.addEventListener('DOMContentLoaded',Store.dispalyBooks)

// Event Listeners For ADD Book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form Values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate Book
  ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    //Error Alert
    ui.showAlert("PLease fill in all fields", "error");
  } else {
    // Add Book to list
    ui.addBookToList(book);

    // Store in LS
    Store.addBook(book);

    // Clear input fields
    ui.clearFields();
    // Show Success
    ui.showAlert("Book Added!", "success");
  }

  e.preventDefault();
});

//Event Listener For Delete Book
document.getElementById("book-list").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Remove From LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

  // Show alert
  ui.showAlert("Book Removed!", "success");
  e.preventDefault();
});
