class search {
  static searchBooks() {
    let searchText = document
      .getElementById("inputSearch")
      .value.trim()
      .toLowerCase();

    let bookCards = document.querySelectorAll(".col-md-4");

    bookCards.forEach(function (card) {
      let title = card
        .querySelector(".card-title")
        .innerText.trim()
        .toLowerCase();
      let author = card
        .querySelector(".list-group-item:nth-child(2)")
        .innerText.replace("Yazar:", "")
        .trim()
        .toLowerCase();

      if (
        !searchText ||
        title.includes(searchText) ||
        author.includes(searchText)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
}
