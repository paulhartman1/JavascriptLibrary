//book class
var Book = function (title,author,numberOfPages,publishDate){
	var time = Date.now();
	this.id = time*Math.random();
	this.title = title;
	this.author = author;
	this.numberOfPages = numberOfPages;
	this.publishDate = new Date(publishDate);
	this.toString = function(){
		return "Title: " + this.title + "<br/>Author: " + this.author + "<br/>Page Count: " + this.numberOfPages + "<br/>Published: " + publishDate;
	};
};
