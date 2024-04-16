window.onload = function () {
  let urlParams = new URLSearchParams(window.location.search);
  let bookTitle = urlParams.get("title");

  let storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  let selectedBook = storedBooks.find(function (book) {
    return book.title === bookTitle;
  });

  if (!selectedBook) {
    fetch("books.json")
      .then((response) => response.json())
      .then((data) => {
        selectedBook = data.find(function (book) {
          return book.title === bookTitle;
        });

        let bookDetailsContainer = document.getElementById("bookDetails");
        if (selectedBook) {
          let bookDetailsContainer = document.getElementById("bookDetails");
          bookDetailsContainer.innerHTML = `
                    <h2>${selectedBook.title}</h2>
                    <p><strong>Yazar:</strong> ${selectedBook.author}</p>
                    <p><strong>Yıl:</strong> ${selectedBook.year}</p>
                    <p><strong>Kategori:</strong> ${selectedBook.category}</p>
                    <p><strong class="description">Açıklaması</strong> <br> ${selectedBook.description}</p>
                    <img src="${selectedBook.imageUrl}" alt="${selectedBook.title}">
                    `;
        } else {
          bookDetailsContainer.innerHTML = `<p>Kitap bulunamadı.</p>`;
        }
      })
      .catch((error) => {
        console.error("Veri yüklenirken hata oluştu:", error);
      });
  } else {
    let bookDetailsContainer = document.getElementById("bookDetails");
    bookDetailsContainer.innerHTML = `
        <h2>${selectedBook.title}</h2>
        <p><strong>Yazar:</strong> ${selectedBook.author}</p>
        <p><strong>Yıl:</strong> ${selectedBook.year}</p>
        <p><strong>Kategori:</strong> ${selectedBook.category}</p>
        <p class="description"><strong>Açıklaması</strong> <br> ${selectedBook.description}</p>
        <img src="${selectedBook.imageUrl}" alt="${selectedBook.title}">
        `;
  }
};
