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
    this.init();
    // if Library data is available
    // create new [] books, if localStorage === null
  }
}());

Library.prototype.init = function(){
  this.retrieveLibrary();
  this.createBooks();
  // if (this.books.length === 0) {
  //   this.books = [];
  // };
};

/**
* Public retrieveLibrary
* @param none
* gets array of book objects from local storage if available
* initializes the array books[], filled with objects from local storage if applicable, empty if not
*/
Library.prototype.retrieveLibrary = function () {
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

/**
* Public saveState
* @param none
* @return true if storage was successful, false if not
* saves the array books[] to local storage
*/
Library.prototype.saveState = function () {
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
    if (authors.indexOf(this.books[i].author) === -1) {
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
  var authors = this.getAuthors(),
  rndmAuthor = null,
  len = authors.length;
  if (len > 0) {
    var index = Math.floor((Math.random() * len))
    rndmAuthor = authors[index];
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

  //prepare data for search
  title !== undefined ? title = title.toLowerCase() : title = " ";
  author !== undefined ? author = author.toLowerCase() :   author = " ";
  var tDate = new Date(pubDate).getTime();

  for (i; i < max; i++) {
    var d = new Date(this.books[i].publishDate).getTime();
    if (this.books[i].title.toLowerCase().indexOf(title) !== -1 && this.books[i].author.toLowerCase().indexOf(author) !== -1 && this.books[i].numberOfPages < pageCount && tDate > d) {
      returnArr.push(this.books[i]);
    }
  }

  return returnArr;
};

Library.prototype.createBooks = function () {
  this.addBook(new Book("A","A person",25,"Jan 1, 2001"));
	this.addBook(new Book("B","B person",96,"2002/02/12"));
	this.addBook(new Book("What?","My Kids",10000,"12/03/2013"));
	this.addBook(new Book("How to Cook for Forty Humans and then Eat Them","Serak the Preparer",275,"Jan 1, 2586"));
	this.addBook(new Book("Godel, Escher, Bach","Douglas Hofstadter",777,"Jan 2, 1979"));
	this.addBook(new Book("The DaVinci Code","Dan Brown",454,"April 01, 2003"));
	this.addBook(new Book("Angels and Demons","Dan Brown",514,"October 3, 2000"));
	this.addBook(new Book("A Clockwork Orange","Anthony Burgess",192,"1962"));
	this.addBook(new Book("Orign","Dan Brown",514,"October 3, 2017"));

	var z = [new Book("Fear and Loathing in Las Vegas","Hunter S. Thompson",204,"1998"),
	new Book("Hell's Angels: A Strange and Terrible Saga","Hunter S. Thompson",295,"2000"),
	new Book("The Rum Diary","Hunter S. Thompson",224,"Nov 01, 1999"),
	new Book("The Curse of Lono","Hunter S. Thompson",205,"October 01, 2005"),
	new Book("Fear and Loathing in Las Vegas","Hunter S. Thompson",204,"1998"),
	new Book("This is the only book not in the library","Paul Hartman",1,Date.now())
];
this.addBooks(z);
};
