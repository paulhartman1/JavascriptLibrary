var Library;
/*
* Library constructor
* @param none
* book is a book object as defined by its constructor
* books is an array of book Objects that populates the Library
*
*/
(function(){
	var instance;
	Library = function Library(){
		if(instance){
			console.log("Library exists");
			return instance;
		}
		instance = this;

		// if Library data is available
		// NOTE: what happpens if var t is not there
		this.retrieveLibrary = function(){

			if (typeof(Storage) !== undefined) {
				var t = localStorage.getItem("LibraryOfBooks");
				var tParsed = JSON.parse(t);
				if(tParsed === null || tParsed.length === 0){
					this.books = [];
					return false; // there was nothing in the library
				} else {
					this.books = [];
					for(var i = 0; i < tParsed.length; i++){
						var  b = new Book(tParsed[i].title, tParsed[i].author, tParsed[i].numberOfPages, new Date(tParsed[i].publishDate));
						this.addBook(b);
					}
				}
				return true;
			}
		};
		// create new [] books, if localStorage === null
		this.retrieveLibrary();
		if(this.books.length === 0){
			this.books = [];
		};
		this.saveState = function(){

			//convert dates to strings first
			// for(var i = 0; i < this.books.length; i++){
			// 	this.books[i].publishDate = this.books[i].publishDate;
			// }
			if (typeof(Storage) !== "undefined") {
				var strJSON = JSON.stringify(this.books);
				localStorage.setItem("LibraryOfBooks",strJSON);
				return true;
			} else {
				return false;
			}
		};
	}
}());

/*
* Public addBook
* @params A Book Object
* @ return true if the Book Object was added to this.books, false if the Book Object was already in the array
* NOTE Book Objects are considered equal if their title and author match
*/
Library.prototype.addBook = function(book){
	var bool = false;
	if(this.books.length === 0){
		this.books.push(book);
	} else { // check books[] for existing title
		for(var i = 0; i < this.books.length; i++){
			if (this.books[i].title == book.title && this.books[i].author === book.author){
				//matching book found. Return false and do not add book to Library
				return bool;
			}
		}
		// no match found - add the book to the Library and return true
		this.books.push(book);
		bool = true;
	}
	return bool;
};

/*
* Public addBooks
* @params array of book objects
* @ return  true if any Book Object was added to this.books, false if all Book Objects were already in the array
*
*/
Library.prototype.addBooks = function(books) {
	var count = 0,
	i = 0,
	max = books.length;

	for(i; i < max; i++){
		if(this.addBook(books[i])){
			count += 1;
		}
	}
	return count;
}

/*
* Public getAuthors
* @params none
* @ return array of authors without duplicates, even if the Library has multiple books by the same author
*/
Library.prototype.getAuthors = function(){
	var authors = [],
	i = 0,
	max = this.books.length;

	for(i; i < max; i++){
		if(!authors.includes(this.books[i].author)){
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
Library.prototype.listAllBooks = function(){
	var str = "",
	i = 0,
	max = this.books.length;
	for(i; i < max; i++){
		str += "<p>" + this.books[i].toString()+"</p>";
	}
	return str;
};

/*
* Public getBooksByTitle
* @params title. Partial or complete title of book (string)
* @ return array of book objects with titles that include all or part of the argument
* NOTE: will return multiple books even with complete title e.g. args("A") will return "A Christmas Carol" and "Naked Lunch", and "A"
*/
Library.prototype.getBookByTitle = function(title){
	var i = 0,
	max = this.books.length,
	returnArr = [];

	for(i; i < max; i++){
		if(this.books[i].title.toLowerCase().includes(title.toLowerCase())){
			returnArr.push(this.books[i]);
		}
	}
	return returnArr;
};
/*
* Public getBooksByAuthor
* @params
* @ return
* this needs some work
*/
Library.prototype.getBooksByAuthor = function(author){
	var i = 0,
	max = this.books.length,
	returnArr = [];
	for(i; i < max; i++){
		if(this.books[i].author.toLowerCase().includes(author.toLowerCase())) {
			returnArr.push(this.books[i]);
		}
	}
	return returnArr;
}

/*
* Public getRandomAuthorName
* @params none
* @ return null if no books in the Library, otherwise returns a random author name
*/
Library.prototype.getRandomAuthorName = function(){
	var rndmAuthor = null,
	len = this.books.length;
	if(len > 0){
		rndmAuthor = this.books[Math.floor((Math.random() * len))].author;
	}
	return rndmAuthor;
};

/*
* Public getRandomBook
* @params none
* @ returns a book object if at least one exists, otherwise returns null
*/
Library.prototype.getRandomBook = function(){
	var len = this.books.length;
	if(len === 0){
		return null;
	}
	return this.books[Math.floor((Math.random() * len))];
};

/*
* Public removeBookByTitle
* @params title of book to be removed
* @ return true if book has been removed, false if no book matched
*/
Library.prototype.removeBookByTitle = function(title){

	var removed = false,
	i = 0,
	max = this.books.length;

	for(i; i < max; i++){
		if(this.books[i].title === title){
			this.books.splice(i,1);
			removed = true;
			return removed;
		}
	}
	return removed;
};
/*
* Public removeBookByAuthor
* @params title of book to be removed
* @ return true if book has been removed, false if no book matched
* NOTE assumes author is unique or removes all books by author?
*/
Library.prototype.removeBookByAuthor = function(author){
	i = 0,
	max = this.books.length,
	booksToRemove = [];

	for(i; i < max; i++){
		if(this.books[i].author === author){
			booksToRemove.push(i); // push the index of the book to remove to booksToRemove
		}
	}

	if(booksToRemove.length === 0){
		return false; // no books were removed: author not found
	} else if (booksToRemove.length === 1){
		this.books.splice(booksToRemove[0],1);
		return true; //at least one book has been removed
	} else { // recursivly remove books, otherwise .splice changes the length and can result in 'undefined' error
	this.books.splice(booksToRemove[0],1); // remove book from this.books
	return this.removeBookByAuthor(author);
}
};

/*
* Public search
* @params four strings --> title, author, numberOfPages, publishDate, (optional) year range in +/- number of years
* titles and authors will return a match if the argument is a substring of the book property
* numberOfPages will return a match if the argument is <= the book property
* publishDate will return a match if the argument is exact -> NOTE FIX THIS
* @return return an array of book
* NOTE --> caller is responsible for ensuring all arguments are passed
*/
Library.prototype.search = function (title,author,pageCount,pubDate){
	var i = 0,
	max = this.books.length,
	returnArr = [];
	var d = new Date(pubDate);
	// if pubDate is not valid, set it to today's date - in milliseconds
	if(isNaN(d)){
		d = Date.now();
	}

	for(i; i < max; i++){
		if(this.books[i].title.includes(title) && this.books[i].author.includes(author) && this.books[i].numberOfPages <= pageCount && this.books[i].publishDate.getTime() <= d){
			returnArr.push(this.books[i]);
		}
	}
	return returnArr;
};



var lib = new Library();
lib.saveState();
