package org.mystore.bookstore.repository;

import org.mystore.bookstore.entity.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Long> {
    // Можна додати кастомні методи, наприклад:
    Iterable<Book> findByAuthor(String author);
}
