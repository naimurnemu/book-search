/*------ seleted by id --------*/
const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const spiner = document.getElementById("load-spain");
const totalResult = document.getElementById("total-results");
const showError = document.getElementById("errors");

/*------- Spinner ------*/
 

/* -------handle search event------- */
searchSubmit.addEventListener("click", () => {
    /* ---- get value from search field---- */
    const searchValue = searchInput.value;
    const search = searchValue.toLowerCase();
    searchInput.value = "";

    /* ----clear value when loading--- */
    bookContainer.innerText = "";
    totalResult.innerText = "";
    showError.innerText = "";

     

    /* --- Load data From api---- */
    const url = `https://openlibrary.org/search.json?q=${search}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => showData(data));
});

/* ------- display search results ------- */
const showData = (infos) => {
    const { docs } = infos;
    /* --- show total result --- */
    totalResult.innerText = `Total search result: ${docs.length} `;

    /* Handle error */
    if (docs.length === 0) {
        showError.innerText = "Please write correct book name and try again!";
    } else {
        showError.innerText = "";

        /* ---- show loaded data ----- */
        docs.forEach((docItem) => {
            const {
                cover_i,
                title,
                author_name,
                publisher_facet,
                first_publish_year,
            } = docItem;
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                    <h4 class="card-title text-center">${title}</h4>
                    <h6 class="card-text text-center text-danger">Author: ${author_name}  </h6>
                </div>
                <div class="card-footer text-center">
                    <p class="card-text">First publish: ${first_publish_year}</p> 
                </div>
            </div>`;
            bookContainer.appendChild(div);
        });
    }
};

/* === undefined || 10909258 */
{
    /* <h6 class="text-center card-text text-secondary" ><small>Publisher: ${publisher_facet}</small> </h6> */
}
