package com.library;

public class BookService {
	private BookRepository bookRepository;

    // Setter method for dependency injection
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Example method to demonstrate functionality
    public void addBook(String bookTitle) {
        bookRepository.save(bookTitle);
        System.out.println("Book saved: " + bookTitle);
    }

}
