var Library;

/**
 * Library constructor
 * @param none
 * book is a book object as defined by its constructor
 * books is an array of book Objects that populates the Library
 *
 */
(function () {
    var instance;
    Library = function Library() {
        if (instance) {
            console.log("Library exists");
            return instance;
        }
        instance = this;

        // if Library data is available
        this.retrieveLibrary = function () {

            if (typeof (Storage) !== undefined) {
                try {
                    var t = localStorage.getItem("LibraryOfBooks");
                    var tParsed = JSON.parse(t);
                    if (tParsed === null || tParsed.length === 0) {
                        this.books = [];
                        return false; // there was nothing in the library
                    } else {
                        this.books = [];
                        for (var i = 0; i < tParsed.length; i++) {
                            var b = new Book(tParsed[i].title, tParsed[i].author, tParsed[i].numberOfPages, new Date(tParsed[i].publishDate));
                            this.addBook(b);
                        }
                    }
                    return true;
                } catch (e) {
                    this.books = [];
                    // do nothing
                }
            }
        };
        // create new [] books, if localStorage === null
        this.retrieveLibrary();
        if (this.books.length === 0) {
            this.books = [];
        };
        this.saveState = function () {

            //convert dates to strings first
            for (var i = 0; i < this.books.length; i++) {
                this.books[i].publishDate = this.books[i].publishDate.toString();
            }
            try {
                if (typeof (Storage) !== "undefined") {
                    var strJSON = JSON.stringify(this.books);
                    localStorage.setItem("LibraryOfBooks", strJSON);
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                // do not store
            }
        };
    }
}());


/**
 * Public verify
 * @param val -  the data to verify
 * @param type - A string representing the type of object val is supposed to be, in relationship to a book object.
 * supported types are title, author, numbmerOfPages, Date, and Book
 * @return  - true if the Book Objectis a valid book object, false if the Book Object has errors in it's parameters
 */
Library.prototype.verify = function (val, type) {
    var str = type.toLowerCase();
    switch (str) {
        case 'book':
            if (typeof (val.title) === 'string' && typeof (val.author) === 'string' && typeof (val.numberOfPages) === 'number' && typeof (val.publishDate === 'Object')) {
                return true;
            } else {
                return false;
            }
            break;
        case 'title':
        case 'author':
            return typeof (val) === 'string' ? true : false;
            break;
        case 'numberofpages':
            return typeof (val) === 'number' ? true : false;
        default:
            return false;
    }
};

/**
 * Public addBook
 * @param book -  A Book Object
 * @return  - true if the Book Object was added to this.books, false if the Book Object was already in the array
 * NOTE Book Objects are considered equal if their title and author match
 */

Library.prototype.addBook = function (book) {
    if (this.verify(book, "book")) {
        if (this.books.length === 0) {
            this.books.push(book);
        } else { // check books[] for existing title
            for (var i = 0; i < this.books.length; i++) {
                if (this.books[i].title == book.title && this.books[i].author === book.author) {
                    //matching book found. Return false and do not add book to Library
                    return false;
                }
            }
            // no match found - add the book to the Library and return true
            this.books.push(book);
            return true;
        }
    } else {
        console.log(book + " can not be added. Check parameters");
        return false;
    }
};

/**
 * Public addBooks
 *@param array of book objects
 *@return  true if any Book Object was added to this.books, false if all Book Objects were already in the array
 *
 */
Library.prototype.addBooks = function (books) {
    var count = 0,
        i = 0,
        max = books.length;

    for (i; i < max; i++) {
        if (this.addBook(books[i])) {
            count += 1;
        }
    }
    return count;
};

/*
 * Public getAuthors
 * @params none
 * @ return array of authors without duplicates, even if the Library has multiple books by the same author
 */
Library.prototype.getAuthors = function () {
    var authors = [],
        i = 0,
        max = this.books.length;

    for (i; i < max; i++) {
        if (!authors.indexOf(this.books[i].author) === -1) {
            authors.push(this.books[i].author);
        }
    }
    return authors;
};

/*
 * Public listAllBooks
 * @params none
 * @ return a HTML formatted string representation of all books in the library
 */
Library.prototype.listAllBooks = function () {
    var str = "",
        i = 0,
        max = this.books.length;
    for (i; i < max; i++) {
        str += "<p>" + this.books[i].toString() + "</p>";
    }
    return str;
};

/*
 * Public getBooksByTitle
 * @params title. Partial or complete title of book (string)
 * @ return array of book objects with titles that include all or part of the argument
 * NOTE: will return multiple books even with complete title e.g. args("A") will return "A Christmas Carol" and "Naked Lunch", and "A"
 */
Library.prototype.getBookByTitle = function (title) {
    if (this.verify(title, "title")) {
        var i = 0,
            max = this.books.length,
            returnArr = [];

        for (i; i < max; i++) {
            if (this.books[i].title.toLowerCase().indexOf(title.toLowerCase()) !== -1) {
                returnArr.push(this.books[i]);
            }
        }
        return returnArr;
    } else {
        console.log("Title error. Check parameters");
        return false;
    }
};
/**
 * Public getBooksByAuthor
 * @param author - the Author name being searched for
 * @return an array of authors names
 * this needs some work
 */
Library.prototype.getBooksByAuthor = function (author) {
    if (this.verify(author, "author")) {
        var i = 0,
            max = this.books.length,
            returnArr = [];
        for (i; i < max; i++) {
            if (this.books[i].author.toLowerCase().indexOf(author.toLowerCase()) !== -1) {
                returnArr.push(this.books[i]);
            }
        } // end for
    } else {
        console.log("Author error. Check parameters");
    }
    return returnArr;
};

/**
 * Public getRandomAuthorName
 * @param none
 * @return null if no books in the Library, otherwise returns a random author name
 */
Library.prototype.getRandomAuthorName = function () {
    var rndmAuthor = null,
        len = this.books.length;
    if (len > 0) {
        rndmAuthor = this.books[Math.floor((Math.random() * len))].author;
    }
    return rndmAuthor;
};

/**
 * Public getRandomBook
 * @param none
 * @return a book object if at least one exists, otherwise returns null
 */
Library.prototype.getRandomBook = function () {
    var len = this.books.length;
    if (len === 0) {
        return null;
    }
    return this.books[Math.floor((Math.random() * len))];
};

/**
 * Public removeBookByTitle
 * @param title of book to be removed
 * @return true if book has been removed, false if no book matched
 */
Library.prototype.removeBookByTitle = function (title) {

    var removed = false,
        i = 0,
        max = this.books.length;

    for (i; i < max; i++) {
        if (this.books[i].title === title) {
            this.books.splice(i, 1);
            removed = true;
            return removed;
        }
    }
    return removed;
};

/**
 * Public removeBookByAuthor
 * @param author - The name of the author of book() to be removed
 * @ return true if book has been removed, false if no book matched
 * NOTE assumes author is unique or removes all books by author?
 */
Library.prototype.removeBookByAuthor = function (author) {
    i = 0,
        max = this.books.length,
        booksToRemove = [];

    for (i; i < max; i++) {
        if (this.books[i].author === author) {
            booksToRemove.push(i); // push the index of the book to remove to booksToRemove
        }
    }

    if (booksToRemove.length === 0) {
        return false; // no books were removed: author not found
    } else if (booksToRemove.length === 1) {
        this.books.splice(booksToRemove[0], 1);
        return true; //at least one book has been removed
    } else { // recursivly remove books, otherwise .splice changes the length and can result in 'undefined' error
        this.books.splice(booksToRemove[0], 1); // remove book from this.books
        return this.removeBookByAuthor(author);
    }
};

/**
 * Public search
 * @param four strings --> title, author, numberOfPages, publishDate, (optional) year range in +/- number of years
 * titles and authors will return a match if the argument is a substring of the book property
 * numberOfPages will return a match if the argument is <= the book property
 * @return return an array of book
 * NOTE --> caller is responsible for ensuring all arguments are passed
 */
Library.prototype.search = function (title, author, pageCount, pubDate) {
    var i = 0,
        max = this.books.length,
        returnArr = [];
    var d = new Date(pubDate);
    // if pubDate is not valid, set it to today's date - in milliseconds
    if (isNaN(d)) {
        d = Date.now();
    }

    for (i; i < max; i++) {
        if (this.books[i].title.indexOf(title) !== -1 && this.books[i].author.indexOf(author) !== -1 && this.books[i].numberOfPages <= pageCount && this.books[i].publishDate.getTime() <= d) {
            returnArr.push(this.books[i]);
        }
    }
    return returnArr;
};

var lib = new Library();
