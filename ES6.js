class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class
class UI {
  // addBookToList
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // Create Tr Element
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="border-bottom">${book.title}</td>
            <td class="border-bottom">${book.author}</td>
            <td class="border-bottom">${book.isbn}</td>
            <td class="border-bottom"><a href = "#" class = "delete">X</a></td>  
        `;
    list.appendChild(row);
  }

  // Show Alerts ======
  showAlert(message, className) {
    // Create  Div
    const div = document.createElement("div");
    // add ClassName
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector(".container");
    // get form
    const form = document.getElementById("book-form");
    // Insert Element
    container.insertBefore(div, form);
    //Time out after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  // Clear All Input Fields
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
  
  // Delete Book
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
      const ui = new UI
      ui.showAlert("Book Removed!", "error"); // Show Alert For Book Deletion
    }
  }
}

//  Store In LS
class Store {
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static dispalyBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();
      // Add Book to list
      ui.addBookToList(book);
    });
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Window Onload Get Books From LS
document.addEventListener("DOMContentLoaded", Store.dispalyBooks());

// add Event For Book Submition
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);
  // console.log(book);

  // Instantiate UI
  const ui = new UI();

  // Validate Book
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please Fill in All Fields", "error");
  } else {
    ui.addBookToList(book); // Add Book
    ui.showAlert("Book Added!", "success"); // Show Alert For Book Addition
    ui.clearFields(); // Clear All the input Fields
    Store.addBook(book); // Store In LS
  }

  e.preventDefault();
});

// Add Event For delete Book
document.getElementById("book-list").addEventListener("click", function (e) {
  // instantiate new UI
  const ui = new UI();
  ui.deleteBook(e.target); // Delete Book

  // Remove Book From LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
  //   e.stopPropagation()
});
