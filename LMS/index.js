//console.log("Checkpoint A");
class Library {
    constructor(name, author, branch, publisher, type) {
        this.name = name;
        this.author = author;
        this.branch = branch;
        this.publisher = publisher;
        this.type = type;
    }
}

class Display {
    add(bookoflibrary) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${bookoflibrary.name}</td>
                            <td>${bookoflibrary.author}</td>
                            <td>${bookoflibrary.branch}</td>
                            <td>${bookoflibrary.publisher}</td>
                            <td>${bookoflibrary.type}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(bookoflibrary) {
        if (bookoflibrary.name.length < 2 || bookoflibrary.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}
console.log('just before event listenenr')
// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let branch = document.getElementById('branch').value;
    let publisher = document.getElementById('publisher').value;
    let type;
    let ukHistory = document.getElementById('ukHistory');
    let programming = document.getElementById('programming');
    let science = document.getElementById('science');
    let classics = document.getElementById('classics');
    let reference = document.getElementById('reference');

    if (ukHistory.checked) {
        type = ukHistory.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (science.checked) {
        type = science.value;
    }
    else if (classics.checked) {
        type = classics.value;
    }
    else if (reference.checked) {
        type = reference.value;
    }

    let bookoflibrary = new Library(name, author, branch, publisher, type);
    console.log(bookoflibrary);

    let display = new Display();

    if (display.validate(bookoflibrary)) {

        display.add(bookoflibrary);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Unable to add your book');
    }

    e.preventDefault();
}
