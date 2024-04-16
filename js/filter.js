let categories = [];
let authors = [];

class Filter {
  static main() {
    this.categories = [];
    this.authors = [];

    storage.loadStoredBooks();

    window.onload = () => {
      storage.loadStoredBooks();

      if (!hasLoadedFromJSON) {
        storage.loadBooksFromJSON();
      }
    };
  }

  static categoryFilter() {
    let selectedCategories = Array.from(
      document.querySelectorAll(".category-checkbox:checked")
    ).map(function (checkbox) {
      return checkbox.value;
    });

    let bookCards = document.querySelectorAll(".col-md-4");

    bookCards.forEach((card) => {
      let category = card
        .querySelector(".list-group-item:nth-child(3)")
        .innerText.replace("Kategori:", "")
        .trim();
      if (
        selectedCategories.length === 0 ||
        selectedCategories.includes(category)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  static updateCategoryCheckbox() {
    let categoryCheckboxArea = document.getElementById("categoryFilterArea");
    categoryCheckboxArea.innerHTML = "";

    let selectedCategories = Array.from(
      document.querySelectorAll(".category-checkbox:checked")
    ).map(function (checkbox) {
      return checkbox.value;
    });

    let categoriesToUse =
      selectedCategories.length === 0 ? categories : selectedCategories;

    categoriesToUse.forEach(function (category) {
      if (category.trim() !== "") {
        let checkboxLabel = document.createElement("label");
        checkboxLabel.innerHTML = `
              <input type="checkbox" class="category-checkbox" value="${category}" onchange="Filter.categoryFilter()">
              ${category}
            `;
        categoryCheckboxArea.appendChild(checkboxLabel);
      }
    });
  }

  static updateAuthorCheckbox() {
    let authorCheckboxArea = document.getElementById("writerFilterArea");
    authorCheckboxArea.innerHTML = "";

    let selectedAuthors = Array.from(
      document.querySelectorAll(".author-checkbox:checked")
    ).map(function (checkbox) {
      return checkbox.value;
    });

    let authorsToUse = selectedAuthors.length === 0 ? authors : selectedAuthors;

    authorsToUse.forEach(function (author) {
      if (author.trim() !== "") {
        let checkboxLabel = document.createElement("label");
        checkboxLabel.innerHTML = `
              <input type="checkbox" class="author-checkbox" value="${author}" onchange="Filter.writerFilter()">
              ${author}
            `;
        authorCheckboxArea.appendChild(checkboxLabel);
      }
    });
  }

  static writerFilter() {
    let selectedAuthors = Array.from(
      document.querySelectorAll(".author-checkbox:checked")
    ).map(function (checkbox) {
      return checkbox.value;
    });

    if (selectedAuthors.length === 0) {
      selectedAuthors = authors.concat("All");
    }

    let bookCards = document.querySelectorAll(".col-md-4");

    bookCards.forEach((card) => {
      let author = card
        .querySelector(".list-group-item:nth-child(1)")
        .innerText.replace("Yazar:", "")
        .trim();
      if (selectedAuthors.includes("All") || selectedAuthors.includes(author)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
}
