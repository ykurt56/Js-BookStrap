class sorting {
  static sortAZ() {
    let bookCards = document.querySelectorAll(".col-md-4");

    let bookArray = Array.from(bookCards);

    bookArray.sort((a, b) => {
      let titleA = a.querySelector(".card-title").innerText.toUpperCase(); // Büyük/küçük harf duyarlı sıralama için büyük harfe dönüştür
      let titleB = b.querySelector(".card-title").innerText.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });

    let bookCardsContainer = document.getElementById("bookCards");
    bookCardsContainer.innerHTML = "";
    bookArray.forEach((bookCard) => {
      bookCardsContainer.appendChild(bookCard);
    });
  }

  static sortZA() {
    let bookCards = document.querySelectorAll(".col-md-4");

    let bookArray = Array.from(bookCards);

    bookArray.sort((a, b) => {
      let titleA = a.querySelector(".card-title").innerText.toUpperCase(); // Büyük/küçük harf duyarlı sıralama için büyük harfe dönüştür
      let titleB = b.querySelector(".card-title").innerText.toUpperCase();
      if (titleA > titleB) {
        return -1;
      }
      if (titleA < titleB) {
        return 1;
      }
      return 0;
    });

    let bookCardsContainer = document.getElementById("bookCards");
    bookCardsContainer.innerHTML = "";
    bookArray.forEach((bookCard) => {
      bookCardsContainer.appendChild(bookCard);
    });
  }
}
