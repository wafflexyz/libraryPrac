let library = [];

class Book {
    constructor(author, title, pages, isRead) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.isRead = isRead;
    }
}

function addBookToLibrary(book) {
    if(!library.includes(book)) {
        library.push(book);
    }
    displayBooks();
}


function displayBooks() {
    let booksContainer = document.querySelector("#books");
    //remove all previously displayed divs
    while(booksContainer.lastElementChild) {
        booksContainer.removeChild(booksContainer.lastElementChild);
    }

    library.forEach((book) => {
        booksContainer.appendChild(createBookCard(book, booksContainer));
    });
}



function createBookCard(book, booksContainer) {
    let div = document.createElement("div");
    div.dataset.indexNumber = library.indexOf(book);

    //populate text info
    for(const[key, value] of Object.entries(book)) {
        if(key !== "isRead") {
            let info = document.createElement("span");
            let name =  key.charAt(0).toUpperCase() + key.slice(1);
            info.textContent = name+": "+value;
            div.appendChild(info);
        }
    }

    //make read button
    let readContent = document.createElement("div");
    
    let readText = document.createElement("span");
    readText.textContent = "Read?";

    let readBtn = document.createElement("input");
    readBtn.setAttribute("id", "readBtn");
    readBtn.setAttribute("type", "checkbox");


    //initial status of read from book
    //why is checked either true or ""? dumbest thing in the world
    if(book.isRead) {
        readBtn.setAttribute('checked', 'true');
    }

    readBtn.addEventListener("click", (e) => {
        let book = library[Number(e.target.parentNode.parentNode.dataset.indexNumber)];
        if(e.target.checked) {
            book.isRead = true;
        } else {
            book.isRead = false;
        }
        console.log(book.isRead ? "Checked" : "Unchecked");
    });

    readContent.appendChild(readText);
    readContent.appendChild(readBtn);



    //make delete button
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Book";
    deleteButton.classList.add("deleteBtn");

    deleteButton.addEventListener("click", (e) => {
        library.splice(e.target.parentNode.dataset.indexNumber, 1);
        booksContainer.removeChild(e.target.parentNode);
        displayBooks();
    });


    div.appendChild(readContent);
    div.appendChild(deleteButton);

    return div;
}

/*
Form Stuff
*/
const form = document.getElementById("formPopup");

function readBookInfo() {
    let authorVal = document.getElementById("author").value;
    let titleVal = document.getElementById("title").value;
    let pagesVal = document.getElementById("numPages").value;
    let readVal = document.getElementById("hasBeenRead").value;

    authorVal = validateInput(authorVal);
    titleVal = validateInput(titleVal);
    if(pagesVal === "") {
        pagesVal = 0;
    }
    readVal = readVal === "on" ? true : false;

    addBookToLibrary(new Book(authorVal, titleVal, pagesVal, readVal));
    closeForm();
}

function validateInput(input) {
    if(input.trim() === "") {
        return "Unknown"
    } else {
        return input;
    }
}

function clearFormValues() {
    document.getElementById("author").value = "";
    document.getElementById("title").value = "";
    document.getElementById("numPages").value = "";
    document.getElementById("hasBeenRead").value = "";
}

function toggleForm() {
    if(form.style.display === "block") {
        closeForm();
    } else {
        openForm();
    }
}

function openForm() {
    form.style.display = "block";
    /* console.log("Opened Form: "+form.id) */
}

function closeForm() {
    clearFormValues();
    form.style.display = "none";
    /* console.log("Closed Form: "+form.id) */
}

/* Example / Test
*/

let b1 = new Book("me", "Adventures of me", 69, true);
let b2 = new Book("you", "Adventures of you", 420, false);

addBookToLibrary(b1);
addBookToLibrary(b2);