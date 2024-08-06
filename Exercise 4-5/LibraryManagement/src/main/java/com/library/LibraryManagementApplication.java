package com.library;

import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class LibraryManagementApplication {
    public static void main(String[] args) {
        // Load the Spring context
        ConfigurableApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        try {
            // Get the BookService bean
            BookService bookService = (BookService) context.getBean("bookService");

            // Test the configuration
            bookService.addBook("Spring in Action");
        } finally {
            // Close the Spring context to release resources
            context.close();
        }
    }
}
