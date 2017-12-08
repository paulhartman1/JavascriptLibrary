
/*
Handle edge cases maybe

/*
/*
* addBook(book object)
* CONDITIONS:Book object does not exist in library
* EXPECTED RESULT: true
*/

	console.log(lib.addBook(new Book("TestTitle","TestAuthor",1000,new Date().now)));

/*
* addBook(book object)
* CONDITIONS:Book object DOES exist in library
* EXPECTED RESULT: false
*/

	console.log(lib.addBook(new Book("TestTitle","TestAuthor",1000,new Date().now)));

/*
* removeBookByTitle(title)
* CONDITIONS:Book object DOES exist in library
* EXPECTED RESULT: true
*/

	console.log(lib.removeBookByTitle("TestTitle"));

/*
* removeBookByTitle(title)
* CONDITIONS:Book object DOES NOT exist in library
* EXPECTED RESULT: false
*/

	console.log(lib.removeBookByTitle("FakeBook"));

/*
* removeBookByAuthor(author)
* CONDITIONS:Book(s) object DOES  exist in library
* EXPECTED RESULT: true
*/

	console.log(lib.removeBookByAuthor("Hunter S. Thompson"));

/*
* removeBookByAuthor(author)
* CONDITIONS:Book(s) object DOES NOT  exist in library
* EXPECTED RESULT: false
*/

	console.log(lib.removeBookByAuthor("Fakey McFakerton"));

/*
* getRandomBook()
* CONDITIONS:Book(s) objects DO  exist in library
* EXPECTED RESULT: A random book object
*/

	console.log(lib.getRandomBook());

/*
* getBookByTitle(title)
* CONDITIONS:Book objects DO exist in library
* EXPECTED RESULT: Array of books
*  if library has titles that include the search string, a array of 0 length if not
*/

	console.log(lib.getBookByTitle("TH"));
	console.log(lib.getBookByTitle("ZZZZZZZZZ"));

/*
* getBooksByAuthor(author)
* CONDITIONS:Book objects DO exist in library
* EXPECTED RESULT: Array of books
*  if library has titles that include the search string, a array of 0 length if not
*/

	console.log(lib.getBooksByAuthor("My"));
	console.log(lib.getBooksByAuthor("ZZZZZZZZZ"));

/*
* getAuthors()
* CONDITIONS:Book objects DO exist in library
* EXPECTED RESULT: Array of strings
*/

	console.log(lib.getAuthors());

/*
* getRandomAuthorName()
* CONDITIONS:Book objects DO exist in library
* EXPECTED RESULT: string == random author name
*/

	console.log(lib.getRandomAuthorName());

/*
* addBooks()
* CONDITIONS:none
* EXPECTED RESULT: number of added books
*/


	var z = [new Book("Fear and Loathing in Las Vegas","Hunter S. Thompson",204,"1998"),
	new Book("Hell's Angels: A Strange and Terrible Saga","Hunter S. Thompson",295,"2000"),
	new Book("The Rum Diary","Hunter S. Thompson",224,"Nov 01, 1999"),
	new Book("The Curse of Lono","Hunter S. Thompson",205,"October 01, 2005"),
	new Book("Fear and Loathing in Las Vegas","Hunter S. Thompson",204,"1998"),
	new Book("This is the only book not in the library","Paul Hartman",1,Date.now())
	];
	console.log(lib.addBooks(z));


/*
* search()
* CONDITIONS:Book objects DO exist in library
* search by one or more book property
* EXPECTED RESULT: array with 0 or more book objects
*/


	//search for books with 300 or less pages
	console.log(lib.search("","",300,""));

	//search for books by Hunter Thompson with < 300 pages
	console.log(lib.search("","Thompson",Infinity,""));

	//search for books published before 1982
	console.log(lib.search("","",Infinity,"1982"));

	//search for books published before 2010 by authors with 'hun' in thier name and < 220 numberOfPages
	console.log(lib.search("","",220,"2010"));

// test a few potential errors
console.log(lib.getBooksByAuthor("klkfdsajzkla"));
console.log(lib.getBooksByAuthor(undefined));
console.log(lib.getBooksByAuthor(null));
console.log(lib.getBooksByAuthor(456));

console.log(lib.getBookByTitle("klkfdsajzkla"));
console.log(lib.getBookByTitle(undefined));
console.log(lib.getBookByTitle(null));
console.log(lib.getBookByTitle(456));
lib.addBook(new Book("123456","Paul Hartman",123,"Dec 12, 1978"));
document.getElementById("test").innerHTML = lib.listAllBooks();
lib.saveState();
