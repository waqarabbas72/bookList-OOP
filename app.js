// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

//Add Book Tp LISt
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  // Create TR element
  const row = document.createElement("tr");
  // Insert Cols
  row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href = "#" class = "delete">X</a></td>
 `;
  list.appendChild(row);
};

// Show ALert
UI.prototype.showAlert = function (message, className) {
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
};
// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

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

  ui.deleteBook(e.target);

  // Show alert
  ui.showAlert("Book Removed!", "success");
  e.preventDefault();
});
