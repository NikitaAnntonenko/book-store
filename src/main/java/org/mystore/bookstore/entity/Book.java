package org.mystore.bookstore.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@Table("books")
public class Book {
    @Id
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private Double price;
    private Integer stockQuantity;
    private String imageUrl;
    private String description;
}
