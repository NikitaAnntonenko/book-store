package org.mystore.bookstore.repository;

import org.mystore.bookstore.entity.Book;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends CrudRepository<Book, Long> {

    Iterable<Book> findByAuthor(String author);
}
