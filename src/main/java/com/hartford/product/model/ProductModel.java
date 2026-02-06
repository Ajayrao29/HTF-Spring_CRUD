package com.hartford.product.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Products")

public class ProductModel {
    @Id
    public int id;
    public String name;
    public String description;
    public double price;
    public int quantity;
}


