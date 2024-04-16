class UI {
  static addBook() {
    let title = document.getElementById("addTitle").value;
    let author = document.getElementById("addAuthor").value;
    let year = document.getElementById("addYear").value;
    let category = document.getElementById("addCategory").value;
    let description = document.getElementById("addDescription").value;
    let imageUrl = document.getElementById("addImageUrl").value;

    if (!title || !author || !year || !category || !description || !imageUrl) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    let newBook = {
      title: title,
      author: author,
      year: year,
      category: category,
      description: description,
      imageUrl: imageUrl,
    };

    let books = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY)) || [];
    books.push(newBook);
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));

    UI.createBookCard(newBook);

    $("#addBookModal").modal("hide");

    document.getElementById("addBookForm").reset();
    location.reload();
  }

  static createBookCard(book) {
    let bookCard = document.createElement("div");

    bookCard.classList.add(
      "col-md-4",
      "col-lg-3",
      "col-xs-12",
      "col-sm-6",
      "mb-4"
    );
    bookCard.innerHTML = `
          <div class="card mb-4">
            <img src="${book.imageUrl}" class="card-img-top card_img" alt="${
      book.title
    }">
            <div class="card-body">
              <h5 class="card-title">
                <!-- Kitap adına bir bağlantı ekle -->
                <a class="text-decoration-none card_text" href="book_details.html?title=${encodeURIComponent(
                  book.title
                )}">${book.title}</a>
              </h5>
              <p class="card-text d-none">${book.description}</p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Yazar:</strong> ${
                  book.author
                }</li>
                <li class="list-group-item"><strong>Yıl:</strong> ${
                  book.year
                }</li>
                <li class="list-group-item"><strong>Kategori:</strong> ${
                  book.category
                }</li>
              </ul>
              <div class="btn-group mt-3">
                <button class="btn btn-danger" onclick="storage.deleteBook(this)">Sil</button>
                <button class="btn btn-primary" onclick="storage.editBook(this)">Düzenle</button>
              </div>
            </div>
          </div>
        `;

    let bookCardsContainer = document.getElementById("bookCards");
    bookCardsContainer.appendChild(bookCard);
  }
}

let hasLoadedFromJSON = false;

window.onload = function () {
  storage.loadStoredBooks();

  if (!hasLoadedFromJSON) {
    storage.loadBooksFromJSON();
  }
};
