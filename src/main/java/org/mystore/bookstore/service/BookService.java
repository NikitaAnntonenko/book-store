package org.mystore.bookstore.service;

import lombok.RequiredArgsConstructor;
import org.mystore.bookstore.dto.PagedResponse;
import org.mystore.bookstore.entity.Book;
import org.mystore.bookstore.mapper.BookRowMapper;
import org.mystore.bookstore.repository.BookRepository;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final NamedParameterJdbcTemplate jdbcTemplate;

    public PagedResponse<Book> getBooks(String search, String sort, String direction, int page, int size) {
        // Whitelist для безпеки
        List<String> allowedSortFields = List.of("id", "title", "author", "price", "stock_quantity");
        if (!allowedSortFields.contains(sort)) {
            sort = "id";
        }

        if (!direction.equalsIgnoreCase("asc") && !direction.equalsIgnoreCase("desc")) {
            direction = "asc";
        }

        int offset = page * size;

        String sql = """
            SELECT * FROM books
            WHERE LOWER(title) LIKE LOWER(CONCAT('%', :search, '%'))
               OR LOWER(author) LIKE LOWER(CONCAT('%', :search, '%'))
            ORDER BY
            """ + sort + " " + direction + """
            LIMIT :size OFFSET :offset
        """;

        Map<String, Object> params = new HashMap<>();
        params.put("search", search);
        params.put("size", size);
        params.put("offset", offset);

        List<Book> books = jdbcTemplate.query(sql, params, new BookRowMapper());

        // Підрахунок загальної кількості
        String countSql = """
            SELECT COUNT(*) FROM books
            WHERE LOWER(title) LIKE LOWER(CONCAT('%', :search, '%'))
               OR LOWER(author) LIKE LOWER(CONCAT('%', :search, '%'))
        """;

        long total = jdbcTemplate.queryForObject(countSql, params, Long.class);

        return new PagedResponse<>(books, total);
    }

    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book updatedBook) {
        Optional<Book> optionalBook = bookRepository.findById(id);

        if (optionalBook.isEmpty()) {
            throw new RuntimeException("Book with ID " + id + " not found");
        }

        Book existingBook = optionalBook.get();

        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setIsbn(updatedBook.getIsbn());
        existingBook.setPrice(updatedBook.getPrice());
        existingBook.setStockQuantity(updatedBook.getStockQuantity());
        existingBook.setImageUrl(updatedBook.getImageUrl());
        existingBook.setDescription(updatedBook.getDescription());

        return bookRepository.save(existingBook);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
