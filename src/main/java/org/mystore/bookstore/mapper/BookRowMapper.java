package org.mystore.bookstore.mapper;

import org.mystore.bookstore.entity.Book;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BookRowMapper implements RowMapper<Book> {
    @Override
    public Book mapRow(ResultSet rs, int rowNum) throws SQLException {
        Book book = new Book();
        book.setId(rs.getLong("id"));
        book.setTitle(rs.getString("title"));
        book.setAuthor(rs.getString("author"));
        book.setIsbn(rs.getString("isbn"));
        book.setPrice(rs.getDouble("price"));
        book.setStockQuantity(rs.getInt("stock_quantity"));
        book.setImageUrl(rs.getString("image_url"));
        book.setDescription(rs.getString("description"));
        return book;
    }
}
