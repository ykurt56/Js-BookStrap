const BOOKS_STORAGE_KEY = "books";

class storage {
  static loadBooksFromJSON() {
    fetch("..//js/books.json")
      .then((response) => response.json())
      .then((data) => {
        let storedBooks =
          JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY)) || [];
        if (storedBooks.length === 0) {
          storedBooks.push(...data);
          localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(storedBooks));
        }

        data.forEach((book) => {
          if (!categories.includes(book.category)) {
            categories.push(book.category);
          }
          if (!authors.includes(book.author)) {
            authors.push(book.author);
          }
        });

        Filter.updateCategoryCheckbox();
        Filter.updateAuthorCheckbox();

        hasLoadedFromJSON = true;
      })
      .catch((error) => {
        console.error("Veri yüklenirken hata oluştu:", error);
      });
  }
  static loadStoredBooks() {
    let storedBooks = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY)) || [];
    storedBooks.forEach(function (book) {
      UI.createBookCard(book);

      if (!categories.includes(book.category)) {
        categories.push(book.category);
      }
      if (!authors.includes(book.author)) {
        authors.push(book.author);
      }
    });

    Filter.updateCategoryCheckbox();
    Filter.updateAuthorCheckbox();
  }

  static deleteBook(button) {
    let bookCard = button.closest(".col-md-4");

    let title = bookCard.querySelector(".card-title").innerText;

    bookCard.remove();

    let storedBooks = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY)) || [];
    let updatedBooks = storedBooks.filter(function (book) {
      return book.title !== title;
    });
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(updatedBooks));
    location.reload();
  }

  static editBook(button) {
    let cardBody = button.closest(".card-body");
    let editedBookCard = cardBody.closest(".col-md-4");

    let title = cardBody.querySelector(".card-title").innerText;
    let description = cardBody.querySelector(".card-text").innerText;
    let author = cardBody
      .querySelector(".list-group-item:nth-child(1)")
      .innerText.replace("Yazar:", "")
      .trim();
    let year = cardBody
      .querySelector(".list-group-item:nth-child(2)")
      .innerText.replace("Yıl:", "")
      .trim();
    let category = cardBody
      .querySelector(".list-group-item:nth-child(3)")
      .innerText.replace("Kategori:", "")
      .trim();
    let imageUrl = editedBookCard
      .querySelector(".card-img-top")
      .getAttribute("src");

    let storedBooks = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY)) || [];
    const editedBookIndex = storedBooks.findIndex(
      (book) => book.title === title
    );

    if (editedBookIndex === -1) {
      console.error("Düzenlenen kitap localStorage'da bulunamadı.");
      return;
    }

    document.getElementById("editTitle").value = title;
    document.getElementById("editAuthor").value = author;
    document.getElementById("editYear").value = year;
    document.getElementById("editCategory").value = category;
    document.getElementById("editDescription").value = description;
    document.getElementById("editImageUrl").value = imageUrl;

    $("#editBookModal").modal("show").data("editedBookIndex", editedBookIndex);
  }

  static confirmEdit() {
    let title = document.getElementById("editTitle").value;
    let author = document.getElementById("editAuthor").value;
    let year = document.getElementById("editYear").value;
    let category = document.getElementById("editCategory").value;
    let description = document.getElementById("editDescription").value;
    let imageUrl = document.getElementById("editImageUrl").value;

    const editedBookIndex = $("#editBookModal").data("editedBookIndex");

    let storedBooks = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY)) || [];

    storedBooks[editedBookIndex] = {
      title: title,
      author: author,
      year: year,
      category: category,
      description: description,
      imageUrl: imageUrl,
    };

    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(storedBooks));

    $("#editBookModal").modal("hide");
    location.reload();
  }
}
